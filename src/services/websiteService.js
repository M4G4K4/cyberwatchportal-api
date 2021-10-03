const createError = require('http-errors');
const domain = require('../utils/domain');
const Website = require('../models/Website');
const websiteMapper = require('../mapper/WebsiteMapper');

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

    const website = await Website.findOne({
        where: {
            domain: websiteUrl.url
        }
    });

    if (!website) {
        throw createError.NotFound('Website not registered');
    }
    return websiteMapper.getWebsiteScoreRead(website);
}

module.exports = {
    registerNewWebsite,
    getWebsiteScore
};
