const express = require("express")
const cors = require("cors")
const userRouter = require("./routes/userRouter")
const toyRouter = require("./routes/toyRouter")
// const mongoose = require("mongoose")

const app = express();

app.use(express.json());
app.use(cors())

app.use('/api/v1/users',userRouter)
app.use('/api/v1/toys',toyRouter)

console.log("app is runing");
module.exports.app = app;