
const PORT = 3000;
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');
const DB = "mongodb+srv://priyanshuraj:ashu6723@cluster0.dfase4n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

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

