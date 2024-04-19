const express = require('express')
const router = express.Router()
const Trademark = require('../models/TrademarkModel')
const Upload = require('../config/Upload')

router.get('/get-trademarks', async (req, res) => {
    try {
        const trademarks = await Trademark.find()
        // res.render('TrademarkView', { trademarks: trademarks })
        res.status(200).send(trademarks)
        console.log('Danh sách Trademark: ', trademarks)
    } catch (err) { console.error('Lỗi get trademark: ', err) }
})

router.post('/add-trademark', Upload.array('image', 5), async (req, res) => {
    try {
        const { id, name } = req.body
        const { files } = req

        if (files && files.length > 0) {
            const urlImage = files.map((file) => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`)
            const newTrademark = new Trademark({
                id: id,
                name: name,
                image: urlImage[0],
                status: true
            })
            const result = await newTrademark.save()
            if (!result) {
                return res.status(500).json({ 'message': 'Thêm Trademark thất bại' })
            }
            res.status(200).json({ 'message': 'Thêm Trademark thành công', 'data': result })
        } else {
            const newTrademark = new Trademark({
                id: id,
                name: name,
                image: '',
                status: true
            })
            const result = await newTrademark.save()
            if (!result) {
                return res.status(500).json({ 'message': 'Thêm Trademark thất bại' })
            }
            res.status(200).json({ 'message': 'Thêm Trademark thành công', 'data': result })
        }

    } catch (err) { console.error('Lỗi add trademark: ', err) }
})

router.put('/update-trademark', Upload.array('image', 5), async (req, res) => {
    try {
        const { id, name, image, status } = req.body
        const { files } = req

        if (files && files.length > 0) {
            const urlImage = files.map((file) => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`)
            const updateTrademark = await Trademark.findOneAndUpdate(
                { id: id },
                {
                    name: name,
                    image: urlImage[0],
                    status: status
                },
                { new: true })

            if (!updateTrademark) {
                return res.status(404).json({ 'message': 'Cập nhật Trademark không thành công' })
            }
            res.status(200).json({ 'message': 'Cập nhật Trademark thành công', 'data': updateTrademark })
        } else {
            const updateTrademark = await Trademark.findOneAndUpdate(
                { id: id },
                {
                    name: name,
                    image: image,
                    status: status
                },
                { new: true })

            if (!updateTrademark) {
                return res.status(404).json({ 'message': 'Cập nhật Trademark không thành công' })
            }
            res.status(200).json({ 'message': 'Cập nhật Trademark thành công', 'data': updateTrademark })
        }
    } catch (err) { console.error('Lỗi get trademark: ', err) }
})

router.get('/delete-trademark', async (req, res) => {
    const { id } = req.query;

    try {
        const result = await Trademark.deleteOne({ id: id });

        if (result.deletedCount === 0) {
            res.status(404).send('trademark không tồn tại hoặc đã được xóa');
        } else {
            res.status(201).send('Xóa trademark thành công');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ errorCode: 500, message: 'Xóa trademark không thành công' });
    }
})

router.get('/get-trademark-by-id', async (req, res) => {
    try {
        const id = req.query.id
        const trademark = await Trademark.find({ id: id })

        if (trademark.length > 0) {
            res.status(201).send(trademark)
        } else {
            res.status(404).send('Không tồn tại')
        }
    } catch (err) { console.error('Lỗi get trademark: ', err) }
})

router.post('/find-trademark-by-name', async (req, res) => {
    try {
        const name = req.body.name;

        const trademark = await Trademark.find({
            name: {
                $regex: name,
                $options: 'i'
            }
        });

        res.status(201).send(trademark);
    } catch (error) {
        res.status(500).send({ errorCode: 500, message: 'Lỗi server' });
    }
});

module.exports = router