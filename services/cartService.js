const cartDataLayer = require('../data/cartData');

async function getCartContents(userId){
    return await cartDataLayer.getCartContents(userId);
}

async function updateCart(userId, cartItems) {
    if (!Array.isArray(cartItems)){
        throw new Error("Cart Items must be an array")
    }
    await cartDataLayer.updateCart(userId, cartItems);
}

module.exports ={
    getCartContents, updateCart
}