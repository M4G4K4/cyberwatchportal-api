function userLoginRead(user, accessToken, refreshToken) {
  return {
    user: {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
    },
    accessToken,
    refreshToken,
  };
}

function refreshToken(accessToken, refreshToken) {
  return {
    refreshToken,
    accessToken,
  };
}

module.exports = {
  userLoginRead,
  refreshToken,
};
