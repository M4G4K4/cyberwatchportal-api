const rabbitMq = require('amqplib/callback_api').connect(process.env.RABBITMQ_CONNECTION);

module.exports={
    rabbitMq
}