const redisRepository = require('../repository/redisRepository');
const createError = require('http-errors');
const User = require('../models/User');
const moment = require('moment');

const WINDOW_SIZE_IN_HOURS = 24;
const MAX_WINDOW_REQUEST_COUNT = 4;
const WINDOW_LOG_INTERVAL_IN_HOURS = 1;

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
    }),

    requestLimiter: (req, res, next) => new Promise(async (resolve, reject) => {
        const requests = await redisRepository.getValue(req.ip);

        const currentRequestTime = moment();

        if (requests == null) {
            let newRecord = [];
            let requestLog = {
                requestTimeStamp: currentRequestTime.unix(),
                requestCount: 1
            };
            newRecord.push(requestLog);
            await redisRepository.setValueWith1DayExpiration(req.ip, JSON.stringify(newRecord));
            return next();
        }

        let data = JSON.parse(requests);
        let windowStartTimestamp = moment()
            .subtract(WINDOW_SIZE_IN_HOURS, 'hours')
            .unix();

        let requestsWithinWindow = data.filter(entry => {
            return entry.requestTimeStamp > windowStartTimestamp;
        });

        let totalWindowRequestsCount = requestsWithinWindow.reduce((accumulator, entry) => {
            return accumulator + entry.requestCount;
        }, 0);

        if (totalWindowRequestsCount >= MAX_WINDOW_REQUEST_COUNT) {
            next(createError.TooManyRequests('To much requests'));
        } else {
            let lastRequestLog = data[data.length - 1];
            let potentialCurrentWindowIntervalStartTimeStamp = currentRequestTime
                .subtract(WINDOW_LOG_INTERVAL_IN_HOURS, 'hours')
                .unix();

            if (lastRequestLog.requestTimeStamp > potentialCurrentWindowIntervalStartTimeStamp) {
                lastRequestLog.requestCount++;
                data[data.length - 1] = lastRequestLog;
            } else {
                data.push({
                    requestTimeStamp: currentRequestTime.unix(),
                    requestCount: 1
                });
            }

            await redisRepository.setValueWith1DayExpiration(req.ip, JSON.stringify(data));
            next();
        }
    })

}
