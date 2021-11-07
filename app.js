require('dotenv').config();
const express = require('express');
const cors = require('cors');
const createError = require('http-errors');

const app = express();

app.use(cors());
app.use(express.json());


const router = require('./src/router/router');

app.use('/', router);


app.use(async (req, res, next) => {
    next(createError.NotFound())
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    })
})

module.exports = app;
