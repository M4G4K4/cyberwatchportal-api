const redis = require('../config/redisConnection');
const util = require('util');

redis.get = util.promisify(redis.get);


async function setValueWithExpiration(key, expiresIn, data){
    await redis.set(key, data, 'EX', expiresIn);
}

async function setValueWithoutExpiration(key, data){
    await redis.set(key, data);
}

async function setValueWith1DayExpiration(key, data){
    await redis.set(key, JSON.stringify(data), 'EX', 86400);
}

async function getValue(key){
    return  JSON.parse(await redis.get(key));
}


module.exports = {
    setValueWithExpiration,
    setValueWithoutExpiration,
    setValueWith1DayExpiration,
    getValue
}
