const express = require("express");
const router = express.Router();
const cartService = require("../services/cartService");
const AuthenticateWithJwt = require('../middleswares/AuthenticateWithJWT');

router.get('/', AuthenticateWithJwt, async (req, res)=>{
    try{
        const cart = await cartService.getCartContents(req.userId);
        res.json(cart)
        console.log(cart);
    } catch(e){
        res.status(500).json({
            message:e.message
        })
    }
})

/*
    cartItems: 
    [
        {
        product_id: integer,
        quantity: integer
        }
    ]
*/

router.put('/',AuthenticateWithJwt, async (req,res)=>{
    try{
        await cartService.updateCart(req.userId, req.body.cartItems)
        res.json({
            "message":"cart items has been updated"
        });
    }catch(e){
        res.status(500).json({
            "message":e.message
        })
    }
})

module.exports = router;