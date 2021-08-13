require('dotenv').config();
const express = require('express');
const app = express();
const port =  process.env.PORT || 3000;
const createError = require('http-errors')

app.use(express.json())


const router = require('./src/router/router');

app.use('/', router);



app.use(async (req, res, next) => {
    next(createError.NotFound())
});

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
