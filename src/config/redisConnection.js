const redis = require('redis');
const createError = require('http-errors');

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

client.on('error', (error) => {
  console.error(error);
  throw createError.InternalServerError('Connection error');
});

client.on('ready', () => {
  console.log('Redis connected');
});

client.on('end', () => {
  console.log('Connection with Redis ended');
});

module.exports = client;
