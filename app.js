const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors  = require('cors');
const path = require('path');
const Model = require('./models/models');

require('dotenv/config');

app.use(express.json());
app.use(cors());
const postRoute = require('./routes/post')
app.use('/post',postRoute);
app.use(express.static(__dirname+'/web'))
app.use('/chess',(req,res) => {
    res.sendFile(__dirname+'/web/chess.html'); 
})

app.get('/',(req,res) => {
    res.sendFile(__dirname+'/web/index.html');
 });
 app.get('/info',(req,res) => {
    res.sendFile(__dirname+'/web/info.html');
 });

mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true,useUnifiedTopology: true },() => {
    console.log('Connected to DB')
})
app.listen(5000); 