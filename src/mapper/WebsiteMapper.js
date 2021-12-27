function getWebsiteScoreRead(website) {
  return {
    id: website.id,
    domain: website.domain,
    score: website.score,
    is_phishing: website.is_phishing === 'TRUE',
  };
}

function getWebsiteScoreReadCached(website) {
  return {
    id: website.id,
    domain: website.domain,
    score: website.score,
    is_phishing: website.is_phishing === 'TRUE',
  };
}

module.exports = {
  getWebsiteScoreRead,
  getWebsiteScoreReadCached,
};
