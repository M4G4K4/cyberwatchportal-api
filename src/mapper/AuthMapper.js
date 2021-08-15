function userRegisterToRead(accessToken, refreshToken){
    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    };
}

module.exports = {
    userRegisterToRead
}
