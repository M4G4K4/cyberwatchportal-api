const { DataTypes } = require('sequelize');
const sequelize = require('../config/Connection');

const User = require('./User');
const File = require('./File');
const Graph = require('./Graph');

const Study = sequelize.define('Study', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
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

Study.belongsTo(User);
Study.hasMany(File);
Study.hasMany(Graph);

module.exports = Study;
