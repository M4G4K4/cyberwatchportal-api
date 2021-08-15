const createError = require('http-errors');
const { signToken, signRefreshToken } = require('../helpers/jwt/jwt_helper');
const authMapper = require('../mapper/AuthMapper');
const User = require('../models/User');
const Login = require('../models/Login');
const bcrypt = require('bcrypt');


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

  await User.create(registerDTO);

  return {};
}

async function login(loginDTO){
  const user = await User.findOne({
    where:{
      email: loginDTO.email
    }
  });

  if(!user){
    throw createError.Unauthorized('Invalid credentials');
  }

  const equalPassword = bcrypt.compare(loginDTO.password, user.dataValues.password);

  if(!equalPassword){
    throw createError.Unauthorized('Invalid credentials');
  }

  const accessToken = await signToken(user.dataValues.id);
  const refreshToken = await signRefreshToken(user.dataValues.id);

  return authMapper.userLoginRead(user, accessToken, refreshToken);
}

async function saveLoginInfo(userId, ip, userAgent){
    const result = await Login.create({
      user_id:userId,
      ip: ip,
      user_agent: userAgent
    });
}

module.exports = {
  register,
  login,
  saveLoginInfo
};
