//require dotenv and envoke it
require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const app = express();
const port = 4000;

// mongo user name & password goes here  //
const mongoUsername = process.env.MONGODB_USERNAME
const mongoPassword = process.env.MONGODB_PASSWORD

// mongo URI goes here //
const mongoURI = `mongodb+srv://${mongoUsername}:${mongoPassword}@crafts.gyzyb.mongodb.net/?retryWrites=true&w=majority&appName=crafts`;

// Home route for the backend
app.get('/', (req, res) => {
    res.send('Hello, this is your Express server!'); 
  // message shown when we navigate to this URL
  });

  // Listen to changes
app.listen(port, () => {
    console.log(`Express server is running on http://localhost:${port}`);
});

// Connect to MongoDB Atlas
mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB Atlas:', err);
    });