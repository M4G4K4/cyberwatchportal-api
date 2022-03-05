const queue = 'analyze_website';
var amqp = require('amqplib/callback_api');

async function send(content) {

  amqp.connect(process.env.RABBITMQ_CONNECTION, function(error0, connection) {
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

          channel.sendToQueue(queue, Buffer.from(data));

          console.log(" [x] Sent %s", data);
      });
  });
}

module.exports = {
  send,
};
