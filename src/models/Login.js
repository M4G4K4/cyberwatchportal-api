const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConnection');

const Login = sequelize.define('Login', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_agent: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'login',
  timestamps: true,
  underscored: true,
});

module.exports = Login;
