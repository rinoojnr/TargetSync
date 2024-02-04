

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

const homeRouter = require('./Routes/home');
const userRouter = require('./Routes/user')


const app = express();
app.use(cors({
    origin: "*",    
}));


app.use(bodyParser.json());
app.use(homeRouter);
app.use('/personal',homeRouter);
app.use(userRouter);


mongoose.connect(process.env.MONGODB_CREDENTIAL)
.then((result)=>{
    app.listen(3000,()=>{
        console.log("running")
    })
})
.catch((err)=>{
    console.log(err)
})
