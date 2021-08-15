const createError = require('http-errors');
const { authRegisterSchema } = require('../utils/validation/authValidation');
const { signToken, signRefreshToken } = require('../helpers/jwt/jwt_helper');
const AuthMapper = require('../mapper/AuthMapper');
const User = require('../models/User');

async function register (req, res, next){
  try{

    const registerDTO = await authRegisterSchema.validateAsync(req.body);

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
  }catch (error){
    if(error.isJoi === true){
      error.status = 422;
    }
    next(error)
  }
}

module.exports = {
  register
};
