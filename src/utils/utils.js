function timeDifference(date1, date2) {
  const difference = date1.getTime() - date2.getTime();

  const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);

  return daysDifference;
}

module.exports = {
  timeDifference,
};
