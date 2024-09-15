const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method
userSchema.statics.signup = async function (email,password) {
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    //Normal Password: mypassword
    //Add Salt: mypasswordj7h8g4f6r3 (password plus salt)
    //Hash: 64ad45hsad798dhkjs76d45 etc...

    const salt = await bcrypt.genSalt(10) // 10 extra caharcters
    const hash = await bcrypt.hash(password, salt)

    // set the password to the hash value when creating the user
    const user = await this.create({email, password: hash})

    return user
}

module.exports = mongoose.model('User', userSchema)