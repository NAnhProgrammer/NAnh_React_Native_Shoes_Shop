const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
    },
    avatar: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    status: {
        type: Boolean
    }
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema)