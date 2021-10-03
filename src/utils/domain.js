const dns = require('dns');
const geoip = require('geoip-lite');

dnsPromises = dns.promises;

function getStrippedDomain(url) {
    return url.replace("https://", "").replace("/", "");
}

async function getIpFromDomain(url) {
    const strippedUrl = url.replace("https://", "").replace("/", "");
    return await dnsPromises.lookup((strippedUrl));
}

function subDomain(url) {
    url = url.replace(new RegExp(/^\s+/),""); // START
    url = url.replace(new RegExp(/\s+$/),""); // END

    url = url.replace(new RegExp(/\\/g),"/");

    url = url.replace(new RegExp(/^http\:\/\/|^https\:\/\/|^ftp\:\/\//i),"");

    url = url.replace(new RegExp(/^www\./i),"");

    url = url.replace(new RegExp(/\/(.*)/),"");

    if (url.match(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i))) {
        url = url.replace(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i),"");

    } else if (url.match(new RegExp(/\.[a-z]{2,4}$/i))) {
        url = url.replace(new RegExp(/\.[a-z]{2,4}$/i),"");
    }

    return !!(url.match(new RegExp(/\./g)));
}

async function reverseLookup(ip) {
    var domains = await dnsPromises.reverse(ip);
    return domains[0];
}


function getInfoFromIp(ip){
    return geoip.lookup(ip);
}


module.exports = {
    getStrippedDomain,
    getIpFromDomain,
    subDomain,
    reverseLookup,
    getInfoFromIp
}
