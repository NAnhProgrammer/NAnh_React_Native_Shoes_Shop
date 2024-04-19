const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    idShoesVarianSize: {
        type: String,
        required: true
    },
    idUser: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    checkout: Boolean

}, { timestamps: true })

module.exports = mongoose.model('Cart', CartSchema)