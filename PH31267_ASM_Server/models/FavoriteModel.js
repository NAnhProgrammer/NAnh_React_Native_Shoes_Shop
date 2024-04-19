const mongoose = require('mongoose')

const FavoriteSchema = new mongoose.Schema({
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
    }
}, { timestamps: true })

module.exports = mongoose.model('Favorite', FavoriteSchema)