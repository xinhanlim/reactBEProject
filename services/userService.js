const userDataLayer = require("../data/userData");
const bcrypt = require('bcrypt');


async function registerUser({name, email, password, salutation,
    marketing_preferences, country}){
        if(password.length < 8) {
            throw Error("Password must be at least 8 characters long")
        }

        const exisitingUser = await userDataLayer.getUserByEmail(email);
        if (exisitingUser){
            throw Error("Email is already in use");
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const newUserId = await userDataLayer.createNewUser(
            {   name,
                email, 
                "password" : hashedPassword, 
                salutation, 
                marketing_preferences, 
                country}
        );
        return newUserId;
}

async function loginUser(email,password){

    const exisitingUser = await userDataLayer.getUserByEmail(email);
    const isPasswordValid = await bcrypt.compare(password, exisitingUser.password);


    if(!exisitingUser || !isPasswordValid){
        throw new Error("invalid email or password");
    }

    return exisitingUser;
}

async function updateUserDetails(id, userDetails){
    const {
        name,
        email,
        salutation,
        country,
        marketing_preferences
      } = userDetails;
    
    
        if (!name || name === null) {
            throw new Error("Name is required");
        }
        
        if (!email || !email.includes('@') || !email.includes('.')) {
            throw new Error("Invalid email address");
        }
        
        if (!marketing_preferences || !Array.isArray(marketing_preferences) || marketing_preferences.length === 0) {
            throw new Error("Please select at least one marketing preference");
        }
    
        if (!country) {
            throw new Error("Country is required");
        }

        return await userDataLayer.updateUser(id, userDetails)
}

async function getUserDetailsById(id){
    const user = await userDataLayer.getUserById(id);
    delete user.password;
    return user;
}

async function deleteUserById(id){
    return await userDataLayer.deleteUser(id);
}

module.exports = {
    registerUser,
    loginUser,
    updateUserDetails,
    getUserDetailsById,
    deleteUserById
}