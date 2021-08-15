const createError = require('http-errors');
const { signToken, signRefreshToken } = require('../helpers/jwt/jwt_helper');
const AuthMapper = require('../mapper/AuthMapper');
const User = require('../models/User');

async function register (registerDTO){
    const user = await User.findOne({
      where: {
        email: registerDTO.email
      }
    });

  if(user){
    if(user.username === registerDTO.username){
      throw createError.Conflict('User with provided username already registered');
    }else{
      throw createError.Conflict('User with provided email already registered');
    }
  }

    const createdUser = await User.create(registerDTO);

    const accessToken = await signToken(createdUser.dataValues.id);
    const refreshToken = await signRefreshToken(createdUser.dataValues.id);

   return AuthMapper.userRegisterToRead(accessToken, refreshToken);
}

module.exports = {
  register
};
