const mongoose = require('mongoose')

const TrademarkSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    status: {
        type: Boolean
    }
}, { timestamps: true })

module.exports = mongoose.model('Trademark', TrademarkSchema)