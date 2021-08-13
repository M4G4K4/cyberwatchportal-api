const { DataTypes } = require("sequelize");
const sequelize = require('../config/Connection');

const Files = sequelize.define('Files', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    study_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'files',
    timestamps: true,
    underscored: true
});

module.exports = Files;
