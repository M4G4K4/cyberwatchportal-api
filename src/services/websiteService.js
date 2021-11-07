const createError = require('http-errors');
const domain = require('../utils/domain');
const Website = require('../models/Website');
const websiteMapper = require('../mapper/WebsiteMapper');
const redisRepository = require('../repository/redisRepository');

async function registerNewWebsite(newWebsite) {

    const websiteUrl = domain.getStrippedDomain(newWebsite.url);

    const website = await Website.findOne({
        where: {
            domain: websiteUrl.url
        }
    });

    if (website) {
        throw createError.Conflict('Website already registered');
    }

    await Website.create({
        domain: websiteUrl.url
    });

    return {};
}

async function getWebsiteScore(getScoreWebsite) {
    const websiteUrl = domain.getStrippedDomain(getScoreWebsite.url);

    console.log(websiteUrl)

    const website = await Website.findOne({
        where: {
            domain: websiteUrl
        }
    });

    if (!website) {
        throw createError.NotFound('Website not registered');
    }
    return websiteMapper.getWebsiteScoreRead(website);
}

async function getWebsiteInfo(getWebsiteInfo) {
    const websiteUrl = domain.getStrippedDomain(getWebsiteInfo.url);

    const scoreInRedis = await redisRepository.getValue(websiteUrl);

    if(scoreInRedis){
        return websiteMapper.getWebsiteScoreReadCached(scoreInRedis);
    }

    const website = await Website.findOne({
        where: {
            domain: websiteUrl
        }
    });

    await redisRepository.setValueWith1DayExpiration(websiteUrl, website.score);

    if (!website) {
        throw createError.NotFound('Website not registered');
    }

    return websiteMapper.getWebsiteScoreRead(website);
}

module.exports = {
    registerNewWebsite,
    getWebsiteScore,
    getWebsiteInfo
};
