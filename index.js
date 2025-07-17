const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

const pool = require('./database');

const productRouter = require('./routes/products');
const userRouter = require('./routes/users');
const cartRouter = require('./routes/cart');

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/cart', cartRouter);


app.get('/', (req,res) => {
    res.json( {
        "messsage" : "hello world"
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sever is Running on PORT : ${PORT}`)
})