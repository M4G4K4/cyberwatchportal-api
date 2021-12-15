const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConnection');

const Website = require('./Website');

const Ssl = sequelize.define('Ssl', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ssl: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  tls: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  certificate: {
    type: DataTypes.JSON,
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
  tableName: 'ssl',
  timestamps: true,
  underscored: true,
});

module.exports = Ssl;
