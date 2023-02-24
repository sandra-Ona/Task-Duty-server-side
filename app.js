require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT= 4000;
mongoose.set("strictQuery", true);
const cors = require ('cors');
const notFound = require('./middleware/notFoundRoute');
const errorHandler = require("./middleware/errorHandler")
const taskRouter=require('./routes/taskRouter');



//middleware
app.use(express.json());
app.use (cors());

//routes
app.use('/api/v1/tasks', taskRouter);
app.use(errorHandler);

//error routes
app.use(notFound);


const start= async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        app.listen (PORT, () =>{
            console.log(`server running on port ${PORT}...`);
        })
    } catch (error) {
        console.log(error);
    }

};

start();
