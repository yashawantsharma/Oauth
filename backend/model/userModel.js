const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    status: {
        type: String,
        enum: ["Active", "inActive"],
        default: "Active"
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User