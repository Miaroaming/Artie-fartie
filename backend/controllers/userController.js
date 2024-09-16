// login user
const loginUser = async (req, res) => {
    res.json({mssg: 'login user'})
}

// signup user 
const signupUser = async (req,res) => {
    const {email, password} = req.body

    try {
        // calls the custom signup static method defined in the User Model
        const user = await User.signup(email, password)
        
        res.status(200).json({email, user})
    } catch (error ) {
        res.status(400).json({error: error.message})
    }
}

//import User Model
const User = require('../models/userModel')

module.exports = { signupUser, loginUser}