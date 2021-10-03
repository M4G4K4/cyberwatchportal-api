function getWebsiteScoreRead(website){
    return {
        website: {
            id: website.id,
            domain: website.domain,
        }
    }
}

module.exports = {
    getWebsiteScoreRead
}
