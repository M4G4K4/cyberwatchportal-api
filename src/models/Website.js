const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConnection');


const Website = sequelize.define('Website', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    domain: {
        type: DataTypes.STRING
    },
    full_domain: {
        type: DataTypes.STRING
    },
    category:{
        type: DataTypes.STRING
    },
    score: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'website',
    timestamps: true,
    underscored: true,
});

module.exports = Website;
