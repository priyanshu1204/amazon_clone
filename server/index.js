
const PORT = 3000;
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');
require('dotenv').config();
const DB = process.env.MONGODB_URI;

const app = express();

//midddleware
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);

//connection
mongoose.connect(DB).then(() => { console.log("connection successful");} ).catch((e) => {
console.log(e);});


app.listen(PORT, "0.0.0.0", () => { console.log(`connected at port ${PORT}` );});

