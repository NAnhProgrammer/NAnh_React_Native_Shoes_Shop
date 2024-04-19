const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

// Tạo bộ gửi mail
let boGuiMail = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:'anhdnph31267@fpt.edu.vn',
        pass: 'mped onxn oxne nkbb'
    }
});

// Route gửi email
router.post('/send-email', async (req, res) => {
    try {
        const { to, subject, text } = req.body;

        // Thiết lập nội dung gửi
        let noiDungGui = {
            from: 'anhdnph31267@fpt.edu.vn',
            to: to,
            subject: subject,
            text: text
        };

        // Thực hiện gửi
        boGuiMail.sendMail(noiDungGui, (err, info) => {
            if (err) {
                console.log('Lỗi gửi mail', err);
                res.status(500).json({ message: 'Lỗi gửi email' });
            } else {
                console.log('Đã gửi:', info.response);
                res.status(200).json({ message: 'Email đã được gửi thành công' });
            }
        });
    } catch (error) {
        console.error('Lỗi server', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

module.exports = router;
