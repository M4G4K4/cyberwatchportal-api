const dns = require('dns');

dnsPromises = dns.promises;

function isSubDomain(url) {
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

async function domainInfo(link){
    let url = new URL(link);
    return {
        hostname: url.hostname,
        pathname: url.pathname,
        protocol: url.protocol.replace(':',''),
        query_parameters: url.search
    }
}

module.exports = {
    domainInfo,
    isSubDomain,
    reverseLookup,
}