const rabbit = require('../config/rabbit');

async function send(content) {
    const broker = await rabbit.getInstance();
    await broker.send(process.env.RABBITMQ_CHANNEL, Buffer.from(JSON.stringify(content)));
    content = '';
}

module.exports = {
    send
}