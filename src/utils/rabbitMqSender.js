var amqp = require('amqplib/callback_api');
const queue = (process.env.RABBITMQ_CHANNEL === undefined) ? 'analyze_website' : process.env.RABBITMQ_CHANNEL;

async function sendMessage (message){
    amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        channel.assertQueue(process.env.RABBITMQ_CHANNEL || 'analyze_website', {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(message));

        console.log("Sent %s for queue %s", message, queue);
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});
}

module.exports = {
    sendMessage
}
