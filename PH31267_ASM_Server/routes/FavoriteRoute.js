const express = require('express')
const router = express.Router()
const Favorite = require('../models/FavoriteModel')

router.get('/get-favorites', async (req, res) => {
    try {
        const favorites = await Favorite.find()
        // res.render('FavoriteView', { favorites: favorites })
        res.status(200).send(favorites)
        console.log('Danh sách Favorite: ', favorites)
    } catch (err) { console.error('Lỗi get Favorite: ', err) }
})

router.post('/add-favorite', async (req, res) => {
    try {
        const { id, idShoes, idUser } = req.body

        const newFavorite = new Favorite({
            id: id,
            idShoes: idShoes,
            idUser: idUser,
        })
        const result = await newFavorite.save()
        if (!result) {
            return res.status(500).json({ 'message': 'Thêm Favorite thất bại' })
        }
        res.status(200).json({ 'message': 'Thêm Favorite thành công', 'data': result })

    } catch (err) { console.error('Lỗi get Favorite: ', err) }
})

router.get('/delete-favorite', async (req, res) => {
    const { id } = req.query;

    try {
        const result = await Favorite.deleteOne({ id: id });

        if (result.deletedCount === 0) {
            res.status(404).send('Favorite không tồn tại hoặc đã được xóa');
        } else {
            res.status(201).send('Xóa Favorite thành công');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ errorCode: 500, message: 'Xóa Favorite không thành công' });
    }
})

router.post('/get-favorites-by-id-user', async (req, res) => {
    try {
        const { idUser } = req.body

        const favorites = await Favorite.find({
            idUser: idUser
        })

        if (!favorites) {
            return res.status(200).send(false)
        }
        res.status(201).send(favorites)
    } catch (error) {
        res.status(500).send({ errorCode: 500, message: 'Lỗi server' });
    }
})

router.post('/get-favorite-by-id-user-and-id-shoes', async (req, res) => {
    try {
        const { idUser, idShoes } = req.body;

        const favorite = await Favorite.findOne({
            idUser: idUser,
            idShoes: idShoes
        });

        if (!favorite) {
            return res.status(200).send(false);
        }

        res.status(201).send(favorite);
    } catch (error) {
        res.status(500).send({ errorCode: 500, message: 'Lỗi server' });
    }
});

module.exports = router
