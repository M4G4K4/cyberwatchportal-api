function timeDifference(date1,date2) {
    var difference = date1.getTime() - date2.getTime();

    var daysDifference = Math.floor(difference/1000/60/60/24);

    return daysDifference;    
}

module.exports = {
    timeDifference,
}