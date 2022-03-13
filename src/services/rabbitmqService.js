var amqp = require('amqplib/callback_api');
const amqplib = require('amqplib');

const queue = process.env.RABBITMQ_CHANNEL || 'analyze_website';
const rabbitUrl = process.env.RABBITMQ_CONNECTION || 'amqp://localhost';

async function send(content) {
  amqp.connect(rabbitUrl, function(error0, connection) {
      if (error0) {
          throw error0;
      }

      connection.createChannel(function(error1, channel) {
          if (error1) {
              throw error1;
          }

          channel.assertQueue(queue, {
              durable: false
          });

          const data = JSON.stringify(content)

          channel.sendToQueue(queue, Buffer.from(data), {
              persistent: true
          });

          console.log(" [x] Sent %s", data);
        });
      });
}

module.exports = {
  send
};
