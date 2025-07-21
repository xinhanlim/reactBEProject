const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

function createLineItems(orderItems){
    const lineItems = [];
    for(let item of orderItems){
        const lineItem = {
            'price_data':{
                'currency':'sgd',
                'product_data':{
                    name: item.product_name,
                    images:[item.image_url || "https://placehold.co/400"],
                    metadata: {
                        product_id: item.product_id
                    }
                },
                'unit_amount':Math.round(item.price*100),
            },
                'quantity': item.quantity
        }
        lineItems.push(lineItem)
    }
    return lineItems;
}

async function createCheckoutSession(userId, orderItems, orderId){
    const lineItems = createLineItems(orderItems);
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            line_items:lineItems,
            mode:"payment",
            success_url: "https://www.google.com",
            cancel_url:"https://www.yahoo.com",
            metadata:{
                'userId': userId,
                'orderId': orderId
            }
        })

        return session;
}

module.exports = {
    createCheckoutSession
}