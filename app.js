var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

var indexRouter = require('./routes/index');
var signupRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');

var app = express();

var mongoDB = process.env.MONGODB_URI;

mongoose.connect(mongoDB, 
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},
    (err) => {
    if (err) throw err;
    console.log('Database connected');
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(express.static('./client/build'));

app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/', indexRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

module.exports = app;
