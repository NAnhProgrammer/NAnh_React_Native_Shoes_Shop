const express = require('express')
const router = express.Router()
const Evaluate = require('../models/EvaluateModel')

router.get('/get-evaluates', async (req, res) => {
    try {
        const evaluates = await Evaluate.find()
        // res.render('EvaluateView', { evaluates: evaluates })
        res.status(200).send(evaluates)
        console.log('Danh sách Evaluate: ', evaluates)
    } catch (err) { console.error('Lỗi get Evaluate: ', err) }
})

router.post('/add-evaluate', async (req, res) => {
    try {
        const { id, idShoes, idUser, content, star } = req.body

        const newEvaluate = new Evaluate({
            id: id,
            idShoes: idShoes,
            idUser: idUser,
            content: content,
            star: star
        })
        const result = await newEvaluate.save()
        if (!result) {
            return res.status(500).json({ 'message': 'Thêm Evaluate thất bại' })
        }
        res.status(200).json({ 'message': 'Thêm Evaluate thành công', 'data': result })

    } catch (err) { console.error('Lỗi get Evaluate: ', err) }
})

router.put('/update-evaluate', async (req, res) => {
    try {
        const { id, idShoes, idUser, content, star, status } = req.body

        const updateEvaluate = await Evaluate.findOneAndUpdate(
            { id: id },
            {
                idShoes: idShoes,
                idUser: idUser,
                content: content,
                star: star,
                status: status
            },
            { new: true })

        if (!updateEvaluate) {
            return res.status(404).json({ 'message': 'Cập nhật evaluate không thành công' })
        }
        res.status(200).json({ 'message': 'Cập nhật evaluate thành công', 'data': updateEvaluate })

    } catch (err) { console.error('Lỗi get evaluate: ', err) }
})

router.get('/delete-evaluate', async (req, res) => {
    const { id } = req.query;

    try {
        const result = await Evaluate.deleteOne({ id: id });

        if (result.deletedCount === 0) {
            res.status(404).send('Evaluate không tồn tại hoặc đã được xóa');
        } else {
            res.status(201).send('Xóa Evaluate thành công');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ errorCode: 500, message: 'Xóa Evaluate không thành công' });
    }
})

router.post('/get-evaluate-by-id-user', async (req, res) => {
    try {
        const idUser = req.body.idUser;

        const evaluate = await Evaluate.find({
            idUser: {
                $regex: idUser,
                $options: 'i'
            }
        });

        res.status(201).send(evaluate);
    } catch (error) {
        res.status(500).send({ errorCode: 500, message: 'Lỗi server' });
    }
});

router.post('/get-evaluate-by-id-shoes', async (req, res) => {
    try {
        const idShoes = req.body.idShoes;

        const evaluate = await Evaluate.find({
            idShoes: {
                $regex: idShoes,
                $options: 'i'
            }
        });

        res.status(201).send(evaluate);
    } catch (error) {
        res.status(500).send({ errorCode: 500, message: 'Lỗi server' });
    }
});

module.exports = router