const mongoose = require('mongoose')

const EvaluateSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    idShoes: {
        type: String,
        required: true
    },
    idUser: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    star: {
        type: Number
    },
    status: {
        type: Boolean
    }
}, { timestamps: true })

module.exports = mongoose.model('Evaluate', EvaluateSchema)