const { DataTypes } = require('sequelize');
const sequelize = require('../config/Connection');

const User = require('./User');

const Login = sequelize.define('Login', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_agent: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // 'Movies' would also work
      key: 'id',
    },
  },
}, {
  tableName: 'login',
  timestamps: true,
  underscored: true,
});

Login.belongsTo(User);

module.exports = Login;
