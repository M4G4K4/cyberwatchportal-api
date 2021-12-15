const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConnection');

const Website = require('./Website');

const Server = sequelize.define('Server', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: false,
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
  tableName: 'server',
  timestamps: true,
  underscored: true,
});

module.exports = Server;
