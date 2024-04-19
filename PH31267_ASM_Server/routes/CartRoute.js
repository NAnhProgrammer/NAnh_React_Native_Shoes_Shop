const express = require('express')
const router = express.Router()
const Cart = require('../models/CartModel')

router.get('/get-carts', async (req, res) => {
    try {
        const carts = await Cart.find()
        // res.render('CartView', { Carts: Carts })
        res.status(200).send(carts)
        console.log('Danh sách Cart: ', carts)
    } catch (err) { console.error('Lỗi get Cart: ', err) }
})

router.post('/add-cart', async (req, res) => {
    try {
        const { id, idShoesVarianSize, idUser, quantity } = req.body

        const newCart = new Cart({
            id: id,
            idShoesVarianSize: idShoesVarianSize,
            idUser: idUser,
            quantity: quantity,
            checkout: false
        })
        const result = await newCart.save()
        if (!result) {
            return res.status(500).json({ 'message': 'Thêm Cart thất bại' })
        }
        res.status(200).json({ 'message': 'Thêm Cart thành công', 'data': result })

    } catch (err) { console.error('Lỗi get Cart: ', err) }
})

router.post('/update-cart', async (req, res) => {
    try {
        const { id, idShoesVarianSize, idUser, quantity, checkout } = req.body

        const updateCart = new Cart.findOneAndUpdate(
            { id: id },
            {
                idShoesVarianSize: idShoesVarianSize,
                idUser: idUser,
                quantity: quantity,
                checkout: checkout
            },
            { new: true }
        )

        if (!updateCart) {
            return res.status(404).json({ 'message': 'Cập nhật Cart thất bại' })
        }
        res.status(200).json({ 'message': 'Thêm Cart thành công', 'data': updateCart })

    } catch (err) { console.error('Lỗi get Cart: ', err) }
})

router.get('/delete-cart', async (req, res) => {
    const { id } = req.query;

    try {
        const result = await Cart.deleteOne({ id: id });

        if (result.deletedCount === 0) {
            res.status(404).send('Cart không tồn tại hoặc đã được xóa');
        } else {
            res.status(201).send('Xóa Cart thành công');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ errorCode: 500, message: 'Xóa Cart không thành công' });
    }
})

router.post('/get-carts-by-id-user', async (req, res) => {
    try {
        const { idUser } = req.body

        const carts = await Cart.find({
            idUser: idUser
        })

        if (!carts) {
            return res.status(200).send(false)
        }
        res.status(201).send(carts)
    } catch (error) {
        res.status(500).send({ errorCode: 500, message: 'Lỗi server' });
    }
})


module.exports = router
