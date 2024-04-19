const express = require('express')
const router = express.Router()
const Shoes = require('../models/ShoesModel')
const Upload = require('../config/Upload')

router.get('/get-shoes', async (req, res) => {
    try {
        const shoes = await Shoes.find()
        res.status(200).send(shoes)

        console.log('Danh sách Shoes: ', shoes)
    } catch (err) { console.error('Lỗi get Shoes: ', err) }
})

router.post('/add-shoes', Upload.array('image', 5), async (req, res) => {
    try {
        const { id, idTrademark, name, describe, classify } = req.body
        const { files } = req

        if (files && files.length > 0) {
            const urlImage = files.map((file) => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`)
            const newShoes = new Shoes({
                id: id,
                idTrademark: idTrademark,
                name: name,
                images: urlImage,
                describe: describe,
                classify: classify,
                status: true
            })
            const result = await newShoes.save()
            if (!result) {
                return res.status(500).json({ 'message': 'Thêm Shoes thất bại' })
            }
            res.status(200).json({ 'message': 'Thêm Shoes thành công', 'data': result })
        } else {
            const newShoes = new Shoes({
                id: id,
                idTrademark: idTrademark,
                name: name,
                images: [],
                describe: describe,
                classify: classify,
                status: true
            })
            const result = await newShoes.save()
            if (!result) {
                return res.status(500).json({ 'message': 'Thêm Shoes thất bại' })
            }
            res.status(200).json({ 'message': 'Thêm Shoes thành công', 'data': result })
        }

    } catch (err) { console.error('Lỗi get Shoes: ', err) }
})

router.put('/update-shoes', Upload.array('image', 5), async (req, res) => {
    try {
        const { id, idTrademark, name, images, describe, classify, status } = req.body
        const { files } = req

        if (files && files.length > 0) {
            const urlImage = files.map((file) => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`)
            const updateShoes = await Shoes.findOneAndUpdate(
                { id: id },
                {
                    idTrademark: idTrademark,
                    name: name,
                    images: urlImage,
                    describe: describe,
                    classify: classify,
                    status: status
                },
                { new: true })

            if (!updateShoes) {
                return res.status(404).json({ 'message': 'Cập nhật Shoes không thành công' })
            }
            res.status(200).json({ 'message': 'Cập nhật Shoes thành công', 'data': updateShoes })
        } else {
            const updateShoes = await Shoes.findOneAndUpdate(
                { id: id },
                {
                    idTrademark: idTrademark,
                    name: name,
                    images: images,
                    describe: describe,
                    classify: classify,
                    status: status
                },
                { new: true })

            if (!updateShoes) {
                return res.status(404).json({ 'message': 'Cập nhật Shoes không thành công' })
            }
            res.status(200).json({ 'message': 'Cập nhật Shoes thành công', 'data': updateShoes })
        }
    } catch (err) { console.error('Lỗi get Shoes: ', err) }
})

router.get('/delete-shoes', async (req, res) => {
    const { id } = req.query;

    try {
        const result = await Shoes.deleteOne({ id: id });

        if (result.deletedCount === 0) {
            res.status(404).send('Shoes không tồn tại hoặc đã được xóa');
        } else {
            res.status(201).send('Xóa Shoes thành công');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ errorCode: 500, message: 'Xóa Shoes không thành công' });
    }
})

router.get('/get-shoes-by-id', async (req, res) => {
    try {
        const id = req.query.id
        const shoes = await Shoes.find({ id: id })

        if (shoes.length > 0) {
            res.status(201).send(shoes)
        } else {
            res.status(404).send('Không tồn tại')
        }
    } catch (err) { console.error('Lỗi get Shoes: ', err) }
})

router.post('/find-shoes-by-name', async (req, res) => {
    try {
        const name = req.body.name;

        const shoes = await Shoes.find({
            name: {
                $regex: name,
                $options: 'i'
            }
        });

        res.status(201).send(shoes);
    } catch (error) {
        res.status(500).send({ errorCode: 500, message: 'Lỗi server' });
    }
});

router.post('/find-shoes-by-id-trademark', async (req, res) => {
    try {
        const idTrademark = req.body.idTrademark;

        const shoes = await Shoes.find({
            idTrademark: {
                $regex: idTrademark,
                $options: 'i'
            }
        });

        res.status(201).send(shoes);
    } catch (error) {
        res.status(500).send({ errorCode: 500, message: 'Lỗi server' });
    }
});

router.post('/find-shoes-by-classify', async (req, res) => {
    try {
        const classify = req.body.classify
        
        const shoes = await Shoes.find({ classify: classify })

        res.status(201).send(shoes);
    } catch (error) {
        res.status(500).send({ err: error, message: 'Lỗi server' });
    }
});

module.exports = router