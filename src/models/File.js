const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConnection');

const Study = require('./Study');

const File = sequelize.define('File', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  study_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Study, // 'Movies' would also work
      key: 'id',
    },
  },
}, {
  tableName: 'files',
  timestamps: true,
  underscored: true,
});

module.exports = File;
