const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConnection');

const Website = require('./Website');

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  version: {
    type: DataTypes.STRING,
  },
  port: {
    type: DataTypes.INTEGER,
  },
  description: {
    type: DataTypes.STRING,
  },
  website_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Website,
      key: 'id',
    },
  },
}, {
  tableName: 'application',
  timestamps: true,
  underscored: true,
});

module.exports = Application;
