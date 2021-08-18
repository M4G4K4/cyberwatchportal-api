const redisRepository = require('../repository/redisRepository');
const createError = require('http-errors');
const User = require('../models/User');


module.exports = {
    verifyRequests: (req, res, next) => new Promise(async (resolve, reject) => {

        let numRequests = await redisRepository.getValue(req.payload.aud);

        if(numRequests === null){
            const user = await User.findOne({
                where: {
                    id: req.payload.aud
                }
            });

            await redisRepository.setValueWith1DayExpiration(user.dataValues.id, user.dataValues.requests);
        }

        if(numRequests != null && numRequests > 0) {
            numRequests = numRequests - 1;
            await redisRepository.setValueWith1DayExpiration(req.payload.aud, numRequests);
        }else if(numRequests != null && numRequests <= 0){
            next(createError.Unauthorized('To much requests for today'));
        }

        next();
    })
}
