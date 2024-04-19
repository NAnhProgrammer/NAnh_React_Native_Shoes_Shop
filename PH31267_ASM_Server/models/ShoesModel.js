const mongoose = require('mongoose')

const ShoesSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    idTrademark:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    describe: {
        type: String
    },
    classify:{
        type: Number
    },
    status: {
        type: Boolean
    }
}, { timestamps: true })

module.exports = mongoose.model('Shoes', ShoesSchema)