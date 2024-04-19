const express = require('express')
const router = express.Router()
const ShoesVarian = require('../models/ShoesVarianModel')
const Upload = require('../config/Upload')

router.get('/get-shoes-varians', async (req, res) => {
    try {
        const shoesVarians = await ShoesVarian.find()
        // res.render('ShoesVarianView', { ShoesVarians: ShoesVarians })
        res.status(200).send(shoesVarians)
        console.log('Danh sách ShoesVarian: ', shoesVarians)
    } catch (err) { console.error('Lỗi get ShoesVarian: ', err) }
})

router.post('/add-shoes-varian', Upload.array('image', 5), async (req, res) => {
    try {
        const { id, idShoes, images, color, price } = req.body
        const { files } = req

        if (files && files.length > 0) {
            const urlImage = files.map((file) => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`)
            const newShoesVarian = new ShoesVarian({
                id: id,
                idShoes: idShoes,
                images: images,
                color: color,
                price: price,
                status: true
            })
            const result = await newShoesVarian.save()
            if (!result) {
                return res.status(500).json({ 'message': 'Thêm ShoesVarian thất bại' })
            }
            res.status(200).json({ 'message': 'Thêm ShoesVarian thành công', 'data': result })
        } else {
            const newShoesVarian = new ShoesVarian({
                id: id,
                idShoes: idShoes,
                images: images,
                color: color,
                price: price,
                status: true
            })
            const result = await newShoesVarian.save()
            if (!result) {
                return res.status(500).json({ 'message': 'Thêm ShoesVarian thất bại' })
            }
            res.status(200).json({ 'message': 'Thêm ShoesVarian thành công', 'data': result })
        }

    } catch (err) { console.error('Lỗi get ShoesVarianVarian: ', err) }
})

router.put('/update-shoes-varian', Upload.array('image', 5), async (req, res) => {
    try {
        const { id, idShoes, images, color, price, status } = req.body
        const { files } = req

        if (files && files.length > 0) {
            const urlImage = files.map((file) => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`)
            const updateShoesVarian = await ShoesVarian.findOneAndUpdate(
                { id: id },
                {
                    idShoes: idShoes,
                    images: urlImage,
                    color: color,
                    price: price,
                    status: status
                },
                { new: true })

            if (!updateShoesVarian) {
                return res.status(404).json({ 'message': 'Cập nhật Shoes varian không thành công' })
            }
            res.status(200).json({ 'message': 'Cập nhật Shoes varian thành công', 'data': updateShoesVarian })
        } else {
            const updateShoesVarian = await ShoesVarian.findOneAndUpdate(
                { id: id },
                {
                    idShoes: idShoes,
                    images: images,
                    color: color,
                    price: price,
                    status: status
                },
                { new: true })

            if (!updateShoesVarian) {
                return res.status(404).json({ 'message': 'Cập nhật Shoes varian không thành công' })
            }
            res.status(200).json({ 'message': 'Cập nhật Shoes varian thành công', 'data': updateShoesVarian })
        }
    } catch (err) { console.error('Lỗi get Shoes: ', err) }
})

router.get('/delete-shoes-varian', async (req, res) => {
    const { id } = req.query;

    try {
        const result = await ShoesVarian.deleteOne({ id: id });

        if (result.deletedCount === 0) {
            res.status(404).send('Shoes varian không tồn tại hoặc đã được xóa');
        } else {
            res.status(201).send('Xóa Shoes varian thành công');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ errorCode: 500, message: 'Xóa Shoes varian không thành công' });
    }
})

router.get('/get-shoes-varian-by-id', async (req, res) => {
    try {
        const id = req.query.id
        const shoesVarian = await ShoesVarian.find({ id: id })

        if (shoesVarian.length > 0) {
            res.status(201).send({ 'message': 'shoesVarian by id', 'data': shoesVarian })
        } else {
            res.status(404).send('Không tồn tại')
        }
    } catch (err) { console.error('Lỗi get shoesVarian: ', err) }
})

router.post('/get-shoes-varian-by-id-shoes', async (req, res) => {
    try {
        const idShoes = req.body.idShoes;

        const shoesVarians = await ShoesVarian.find({
            idShoes: {
                $regex: idShoes,
                $options: 'i'
            }
        });

        res.status(201).send(shoesVarians);
    } catch (error) {
        res.status(500).send({ errorCode: 500, message: 'Lỗi server' });
    }
})

module.exports = router
