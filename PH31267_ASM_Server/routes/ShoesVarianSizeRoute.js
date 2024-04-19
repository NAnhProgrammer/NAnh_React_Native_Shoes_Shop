const express = require('express')
const router = express.Router()
const ShoesVarianSize = require('../models/ShoesVarianSizeModel')

router.get('/get-shoes-varian-sizes', async (req, res) => {
    try {
        const shoesVarianSizes = await ShoesVarianSize.find()
        res.status(200).send(shoesVarianSizes)
        console.log('Danh sách ShoesVarianSize: ', shoesVarianSizes)
    } catch (err) { console.error('Lỗi get ShoesVarianSize: ', err) }
})

router.post('/add-shoes-varian-size', async (req, res) => {
    try {
        const { id, idShoesVarian, sizeNumber, quantity } = req.body

        const newShoesVarianSize = new ShoesVarianSize({
            id: id,
            idShoesVarian: idShoesVarian,
            sizeNumber: sizeNumber,
            quantity: quantity,
            status: true
        })
        const result = await newShoesVarianSize.save()
        if (!result) {
            return res.status(500).json({ 'message': 'Thêm ShoesVarianSize thất bại' })
        }
        res.status(200).json({ 'message': 'Thêm ShoesVarianSize thành công', 'data': result })

    } catch (err) { console.error('Lỗi get ShoesVarianSizeVarian: ', err) }
})

router.put('/update-shoes-varian-size', async (req, res) => {
    try {
        const { id, idShoesVarian, sizeNumber, quantity, status } = req.body

        const updateShoesVarianSize = await ShoesVarianSize.findOneAndUpdate(
            { id: id },
            {
                idShoesVarian: idShoesVarian,
                sizeNumber: sizeNumber,
                quantity: quantity,
                status: status
            },
            { new: true })

        if (!updateShoesVarianSize) {
            return res.status(404).json({ 'message': 'Cập nhật Shoes varian size không thành công' })
        }
        res.status(200).json({ 'message': 'Cập nhật Shoes varian size thành công', 'data': updateShoesVarianSize })

    } catch (err) { console.error('Lỗi get Shoes varian size: ', err) }
})

router.get('/delete-shoes-varian-size', async (req, res) => {
    const { id } = req.query;

    try {
        const result = await ShoesVarianSize.deleteOne({ id: id });

        if (result.deletedCount === 0) {
            res.status(404).send('Shoes varian size không tồn tại hoặc đã được xóa');
        } else {
            res.status(201).send('Xóa Shoes varian size thành công');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ errorCode: 500, message: 'Xóa Shoes varian size không thành công' });
    }
})

router.get('/get-shoes-varian-size-by-id', async (req, res) => {
    try {
        const id = req.query.id
        const shoesVarianSize = await ShoesVarianSize.find({ id: id })

        if (shoesVarianSize.length > 0) {
            res.status(201).send({ 'message': 'shoesVarianSize by id', 'data': shoesVarianSize })
        } else {
            res.status(404).send('Không tồn tại')
        }
    } catch (err) { console.error('Lỗi get ShoesVarianSize: ', err) }
})

router.post('/get-shoes-varian-size-by-id-shoes-varian', async (req, res) => {
    try {
        const idShoesVarian = req.body.idShoesVarian;

        const shoesVarianSize = await ShoesVarianSize.find({
            idShoesVarian: {
                $regex: idShoesVarian,
                $options: 'i'
            }
        });

        res.status(201).send(shoesVarianSize);
    } catch (error) {
        res.status(500).send({ errorCode: 500, message: 'Lỗi server' });
    }
})

module.exports = router
