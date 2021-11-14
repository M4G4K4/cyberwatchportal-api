function getWebsiteScoreRead(website) {
    return {
        id: website.id,
        domain: website.domain,
        score: website.score
    }
}

function getWebsiteScoreReadCached(website) {
    return {
        id: website.id,
        domain: website.domain,
        score: website.score,
    }
}

module.exports = {
    getWebsiteScoreRead,
    getWebsiteScoreReadCached
}
