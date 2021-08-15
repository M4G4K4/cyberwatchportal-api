const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConnection');

const User = require('./User');

const Study = sequelize.define('Study', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  long_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  picture: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  theme: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  tableName: 'study',
  timestamps: true,
  underscored: true,
});

module.exports = Study;
