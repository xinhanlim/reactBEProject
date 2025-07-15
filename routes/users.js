const express = require('express');
const router = express.Router();
const userServiceLayer = require('../services/userService')
const jwt = require('jsonwebtoken');
const AuthenticateWithJwt = require('../middleswares/AuthenticateWithJWT');

router.post('/register', async (req,res) =>{
    try{
        const newUserId = await userServiceLayer.registerUser(req.body);
        res.json({
            "message": "New user has been registered",
            "userId": newUserId

        })

    } catch (e) {
        console.log("error",e);
        res.status(500).json({
            "message":"unable to register",
            "error": e
        })


    }
})

router.post('/login', async (req,res) => {
    try{
        const {email, password} = req.body;
        const user = await userServiceLayer.loginUser(email, password);
        const token = jwt.sign({
            'userId' : user.id
        }, process.env.JWT_SECRET,
        {
            "expiresIn": "1h"
        })

        res.json({
            "message" : "Login successsfull",
            token
        })
    }catch (e){
res.status(400).json({
    error: e,
    "message": "Login unsuccessful"
})
    }
})

router.put('/me', AuthenticateWithJwt, async (req,res) =>{
    const userId = req.userId;
    const {
        name,
        email,
        salutation,
        country,
        marketingPreferences
      } = req.body;
      
      const userDetails = {
        name,
        email,
        salutation,
        country,
        marketing_preferences: marketingPreferences
      };
     console.log("🛠️ Received user update:", userDetails);

    try{    
        await userServiceLayer.updateUserDetails(userId, userDetails);
        res.json({
            "message" : "Update Successfull"
        })
    }catch (e) {
        console.error("❌ Error updating user:", e);
        res.status(400).json({
            error: e,
            "message": "failed to update user profile"
        })
    }
})

router.get('/me', AuthenticateWithJwt, async (req,res) => {
    try{
        const user = await userServiceLayer.getUserDetailsById(req.userId)
        if(!user){
            res.status(401).json({
                "message":"Unable to find user"
            })
        }
        res.json(user)
    } catch (e){
        console.log(e);
        res.status(400).json({
            "message":"Unable to get profile",
            "error":e
        })
    }
})

router.delete('/me', AuthenticateWithJwt, async(req,res)=>{
    try{
        await userServiceLayer.deleteUserById(req.userId);
        res.json({
            "message":"User has been deleted"
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            "message":"unable to delete"
        })
    }
})
module.exports = router;