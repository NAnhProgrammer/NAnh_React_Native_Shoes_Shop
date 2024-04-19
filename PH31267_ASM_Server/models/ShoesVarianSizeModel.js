const mongoose = require('mongoose')

const ShoesVarianSizeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    idShoesVarian: {
        type: String,
        required: true
    },
    sizeNumber: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean
    }
}, { timestamps: true })

module.exports = mongoose.model('ShoesVarianSize', ShoesVarianSizeSchema)