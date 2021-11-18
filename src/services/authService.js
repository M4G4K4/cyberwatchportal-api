const createError = require('http-errors');
const { signToken, signRefreshToken, verifyRefreshToken } = require('../middlware/jwt_helper');
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

async function login(loginDTO, ip, userAgent){
  const user = await User.findOne({
    where:{
      email: loginDTO.email
    }
  });

  if(user){
    if(bcrypt.compare(loginDTO.password, user.dataValues.password)){
      await saveLoginInfo(user.dataValues.id, user.dataValues.email, ip, userAgent, 'success');

      const accessToken = await signToken(user.dataValues.id);
      const refreshToken = await signRefreshToken(user.dataValues.id);

      return authMapper.userLoginRead(user, accessToken, refreshToken);
    }
  }else {
    await saveLoginInfo(null, loginDTO.email, ip, userAgent, 'failed');
    throw createError.Unauthorized('Invalid credentials');
  }

}

async function saveLoginInfo(userId, email ,ip, userAgent, status){
    await Login.create({
      user_id: userId,
      ip: ip,
      email: email,
      user_agent: userAgent,
      status: status
    });
}

async function refresh(refreshDTO){
  const userId = await verifyRefreshToken(refreshDTO.refreshToken);

  const accessToken = await signToken(userId);
  const refreshToken = await signRefreshToken(userId);

  return authMapper.refreshToken(accessToken, refreshToken);
}

module.exports = {
  register,
  login,
  refresh
};
