const express = require("express")
const app = express()
const mongoose = require('mongoose')
const userRoutes = require('./routes/UserRoutes.js');

const PORT = process.env.PORT || 8081

// Middleware to parse JSON and URL-encoded data
app.use(express.json()); // For parsing JSON
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded data from forms

//helper function to connect to MongoDB asychronously
const connectDB = async() => {
    try{
        console.log(`Attempting to connect to DB`);

        mongoose.connect('mongodb+srv://admin:Password123@cluster0.hojrx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then( () => {
            console.log(`MongoDB connected`)
        }).catch( (err) => {
            console.log(`Error while connecting to MongoDB : ${JSON.stringify(err)}`)
        });
    }catch(error){
        console.log(`Unable to connect to DB : ${error.message}`);
        
    }
}

const onServerStart = () => {
    console.log(`The server started running at http://localhost:${PORT}`);
    console.log(`Press Ctrl+c to stop`);

    //connect to database
    connectDB()
}

app.use(userRoutes);

app.listen(PORT, onServerStart)