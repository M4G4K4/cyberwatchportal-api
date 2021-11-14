const createError = require('http-errors');
const domain = require('../utils/domain');
const Website = require('../models/Website');
const websiteMapper = require('../mapper/WebsiteMapper');
const redisRepository = require('../repository/redisRepository');

async function registerNewWebsite(newWebsite) {
    const websiteUrl = await domain.domainInfo(newWebsite.url);

    const website = await Website.findOne({
        where: {
            domain: websiteUrl.hostname
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

async function getWebsiteScore(websiteDto) {
    const url = await domain.domainInfo(websiteDto.url);

    const cache = await redisRepository.getValue(url.hostname);

    if(cache){
        return websiteMapper.getWebsiteScoreReadCached(cache);
    }

    const website = await Website.findOne({
        where: {
            domain: url.hostname
        }
    });

    await redisRepository.setValueWith1DayExpiration(url.hostname, website);

    if (!website) {
        throw createError.NotFound('Website not registered');
    }
    
    return websiteMapper.getWebsiteScoreRead(website);
}

async function getWebsiteScoreById(id){
    const websiteCache = await redisRepository.getValue(id);

    if(websiteCache){
        return websiteMapper.getWebsiteScoreReadCached(websiteCache);
    }

    const website = await Website.findByPk(id);

    if(!website){
        throw createError.NotFound('Website with id: ' + id + 'not found.');
    }

    await redisRepository.setValueWith1DayExpiration(website.id, website);

    return websiteMapper.getWebsiteScoreRead(website);
}

module.exports = {
    registerNewWebsite,
    getWebsiteScore,
    getWebsiteScoreById
};
