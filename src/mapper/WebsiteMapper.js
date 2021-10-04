function getWebsiteScoreRead(website){
    return {
            id: website.id,
            domain: website.domain,
    }
}

module.exports = {
    getWebsiteScoreRead
}
