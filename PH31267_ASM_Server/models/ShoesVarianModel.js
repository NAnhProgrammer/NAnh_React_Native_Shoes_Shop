const mongoose = require('mongoose')

const ShoesVarianSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    idShoes: {
        type: String,
        required: true
    },
    color: {
        type: String,
    },
    images: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean
    }
}, { timestamps: true })

module.exports = mongoose.model('ShoesVarian', ShoesVarianSchema)