function getWebsiteScoreRead(website) {
    return {
        id: website.id,
        domain: website.domain,
        score: website.score
    }
}

function getWebsiteScoreReadCached(domain, scoreInRedis) {
    return {
        domain: domain,
        score: scoreInRedis,
        cached: true
    }
}

module.exports = {
    getWebsiteScoreRead,
    getWebsiteScoreReadCached
}
