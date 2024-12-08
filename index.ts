require("reflect-metadata");
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config()
let AppDataSource = require('./src/database')
const productRou = require('./src/routers/product.router')
// const orderRou = require('./src/routers/orders.router')
// const orderRou = require('./src/routers/')


const app = express();
app.use(cors());
app.use(express.json());

AppDataSource.initialize().then(async () => {
    console.log("Data Source has been initialized!");
}).catch((error: any) => console.log("Error: ", error));


// app.use('/user', userRou)
// app.use('/order', orderRou)
app.use('/product', productRou)


app.listen(3000, () => {
    console.log('Server running on port 3000');
});
