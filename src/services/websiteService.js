const createError = require('http-errors');
const domain = require('../utils/domain');
const Website = require('../models/Website');
const websiteMapper = require('../mapper/WebsiteMapper');
const redisRepository = require('../repository/redisRepository');
const { timeDifference } = require('../utils/utils');



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

    if (website) {
        //console.log(timeDifference(website.updated_at, new Date()));
        /*
        if(timeDifference(website.updated_at, new Date()) > 90){
            // send event to execute anlysis of website again
        }
        */

        await redisRepository.setValueWith1DayExpiration(url.hostname, website);

        return websiteMapper.getWebsiteScoreRead(website);
    }else{
        const newWebsite = await Website.create({
            full_domain: websiteDto.url,
            domain: url.hostname,
        });

        return websiteMapper.getWebsiteScoreRead(newWebsite);
    }
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


    //console.log(timeDifference(website.updated_at, new Date()));
    /*
    if(timeDifference(website.updated_at, new Date()) > 90){
        // send event to execute anlysis of website again
    }
    */

    await redisRepository.setValueWith1DayExpiration(website.id, website);

    return websiteMapper.getWebsiteScoreRead(website);
}

async function reportWebsitePhishing(websiteDto){
    const url = await domain.domainInfo(websiteDto.url);

    const website = await Website.findOne({
        where: {
            domain: url.hostname
        }
    });

    if(!website){
        throw createError.NotFound('Website ' + url + 'not found.');
    }

    website.reported_phishing += 1;

    if(website.reported_phishing >= 5){
        website.is_phishing = 'TRUE';
    }

    await website.save();
}

module.exports = {
    getWebsiteScore,
    getWebsiteScoreById,
    reportWebsitePhishing
};
