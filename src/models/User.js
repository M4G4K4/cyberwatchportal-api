const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConnection');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  picture: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    values: ['user', 'admin', 'academic'],
    defaultValue: 'user',
  },
  requests: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 25
  },
  permissions: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
    values: ['active', 'inactive', 'banned'],
    defaultValue: 'active'
  },
  verified: {
    type: DataTypes.STRING,
    allowNull: true,
    values: ['verified', 'unverified'],
    defaultValue: 'verified'
  },
}, {
  tableName: 'users',
  timestamps: true,
  underscored: true,
});

User.beforeCreate(async (user, options) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hashSync(user.password, salt);
});


module.exports = User;
