const pool = require('../database');


async function getCartContents(userId){
    const [rows] = await pool.query(`SELECT cart_items.id,
                                            cart_items.product_id,
                                            products.image AS image_url,
                                            products.name AS product_name,
                                            CAST(price AS DOUBLE) AS price,
                                            cart_items.quantity
                                            FROM cart_items 
                                            JOIN products
                                            ON cart_items.product_id = products.id
                                            WHERE cart_items.user_id = ?`
                                            , [userId])
    return rows;
}

/*
        Contract" 
            {
                product_id: Integer, primary key of the product being added to the product 
                quantity: Integer, number
            }
*/
async function updateCart(userId, cartItems){
    const connection = await pool.getConnection();
    try{
        await connection.query("DELETE FROM cart_items WHERE user_id = ? ", [userId]);
        for(let c of cartItems){
            await connection.query("INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?,?,?)",
            [userId, c.product_id, c.quantity]
            )
        }
        await connection.commit();
    } catch(e){
        await connection.rollback();
    } finally {
        await connection.release();
    }
}

module.exports = {
    getCartContents,
     updateCart
}