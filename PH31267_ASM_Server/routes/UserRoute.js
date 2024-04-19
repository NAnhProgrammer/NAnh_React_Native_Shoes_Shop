const express = require('express')
const router = express.Router()
const User = require('../models/UserModel')
const Upload = require('../config/Upload')

router.get('/get-users', async (req, res) => {
    try {
        const users = await User.find()
        // res.render('UserView', { users: users })
        res.status(200).send(users)
        console.log('Danh sách user: ', users)
    } catch (err) { console.error('Lỗi get users: ', err) }
})

router.post('/add-user', Upload.array('image', 5), async (req, res) => {
    try {
        const { id, username, password,avatar, fullname, email, phone, address } = req.body
        const { files } = req

        if (files && files.length > 0) {
            const urlImage = files.map((file) => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`)
            const newUser = new User({
                id: id,
                username: username,
                password: password,
                fullname: fullname,
                avatar: urlImage[0],
                email: email,
                phone: phone,
                address: address,
                status: true
            })
            const result = await newUser.save()
            if (!result) {
                return res.status(500).json({ 'message': 'Thêm user thất bại' })
            }
            res.status(200).json({ 'message': 'Thêm user thành công', 'data': result })
        } else {
            const newUser = new User({
                id: id,
                username: username,
                password: password,
                fullname: fullname,
                avatar: avatar,
                email: email,
                phone: phone,
                address: address,
                status: true
            })
            const result = await newUser.save()
            if (!result) {
                return res.status(500).json({ 'message': 'Thêm user thất bại' })
            }
            res.status(200).json({ 'message': 'Thêm user thành công', 'data': result })
        }

    } catch (err) { console.error('Lỗi get users: ', err) }
})

router.put('/update-user', Upload.array('image', 5), async (req, res) => {
    try {
        const { id, username, password, fullname, email, avatar, phone, address, status } = req.body
        const { files } = req

        if (files && files.length > 0) {
            const urlImage = files.map((file) => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`)
            const updateUser = await User.findOneAndUpdate(
                { id: id },
                {
                    username: username,
                    password: password,
                    fullname: fullname,
                    avatar: urlImage[0],
                    email: email,
                    phone: phone,
                    address: address,
                    status: status
                },
                { new: true })

            if (!updateUser) {
                return res.status(404).json({ 'message': 'Cập nhật user không thành công' })
            }
            res.status(200).json({ 'message': 'Cập nhật user thành công', 'data': updateUser })
        } else {
            const updateUser = await User.findOneAndUpdate(
                { id: id },
                {
                    username: username,
                    password: password,
                    fullname: fullname,
                    avatar: avatar,
                    email: email,
                    phone: phone,
                    address: address,
                    status: status
                },
                { new: true })

            if (!updateUser) {
                return res.status(404).json({ 'message': 'Cập nhật user không thành công' })
            }
            res.status(200).json({ 'message': 'Cập nhật user thành công', 'data': updateUser })
        }
    } catch (err) { console.error('Lỗi get users: ', err) }
})

router.get('/delete-user', async (req, res) => {
    const { id } = req.query;

    try {
        const result = await User.deleteOne({ id: id });

        if (result.deletedCount === 0) {
            res.status(404).send('User không tồn tại hoặc đã được xóa');
        } else {
            res.status(201).send('Xóa user thành công');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ errorCode: 500, message: 'Xóa user không thành công' });
    }
})

router.get('/get-user-by-id', async (req, res) => {
    try {
        const id = req.query.id
        const user = await User.find({ id: id })

        if (user.length > 0) {
            res.status(201).send(user)
        } else {
            res.status(404).send('Không tồn tại')
        }
    } catch (err) { console.error('Lỗi get user: ', err) }
})

router.post('/find-user-by-username', async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ username: username });

        if (user) {
            res.status(201).send(user);
        } else {
            res.status(200).send(false);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Lỗi khi kiểm tra username' });
    }
})

router.post('/find-user-by-email', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email });

        if (user) {
            res.status(201).send(user);
        } else {
            res.status(200).send(false);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Lỗi khi kiểm tra email' });
    }
})

module.exports = router