const rabbit = require('./rabbitMqSender');
require('dotenv').config();

async function coisas (){
    var ff = {
        "admin": true
    }
    rabbit.sendMessage(JSON.stringify(ff));
}

coisas();