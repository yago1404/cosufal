const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
require('dotenv-safe').config(
    { example: '.env' }
);

const userController = require('./controllers/user_controller');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.use('/user', userController);

app.listen(8081, () => {
    console.log('Daipe Backend run in http://localhost:8081');
});