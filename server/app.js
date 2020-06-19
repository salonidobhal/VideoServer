const express= require('express');
const morgan= require('morgan');
const cors = require('cors');
const bodyParser= require('body-parser');
const mongoose= require('mongoose');


const app= express();
mongoose.connect("mongodb://localhost:27017/videoServer", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('connected', ()=>{
    console.log('connected to db');
});
mongoose.connection.on('error', error=>{
    console.log('Error at mongodb:'+ err);
});
 
mongoose.Promise= global.Promise;

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); 

//Routes
app.use('/api/signUp', require('./routes/signUp'));
app.use('/api/signIn', require('./routes/signIn'));

 

module.exports = app;