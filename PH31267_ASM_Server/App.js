const express = require('express')
const mongoose = require('mongoose')
const UserRoute = require('./routes/UserRoute')
const TrademarkRoute = require('./routes/TrademarkRoute')
const ShoesRoute = require('./routes/ShoesRoute')
const FavoriteRoute = require('./routes/FavoriteRoute')
const EvaluateRoute = require('./routes/EvaluateRoute')
const ShoesVarianRoute = require('./routes/ShoesVarianRoute')
const ShoesVarianSizeRoute = require('./routes/ShoesVarianSizeRoute')
const SendEmailRoute = require('./routes/SendEmailRoute')
const CartRoute = require('./routes/CartRoute')

const cors = require('cors')

const app = express()

mongoose.connect('mongodb://localhost:27017/ASMServer', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Kết nối thành công với mongodb')
}).catch((err) => {
    console.error('Lỗi: ' + err)
})

app.use(cors())

app.use('/uploads', express.static('uploads'))

app.use(express.json())

app.use('/', UserRoute)
app.use('/', TrademarkRoute)
app.use('/', ShoesRoute)
app.use('/', FavoriteRoute)
app.use('/', EvaluateRoute)
app.use('/', ShoesVarianRoute)
app.use('/', ShoesVarianSizeRoute)
app.use('/', SendEmailRoute)
app.use('/', CartRoute)

app.set('view engine', 'ejs')

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server đang chạy')
})