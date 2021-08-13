const { DataTypes } = require("sequelize");
const sequelize = require('../config/Connection');

const Study = sequelize.define('Study', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    long_description:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    picture:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    theme:{
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'study',
    timestamps: true,
    underscored: true
});

module.exports = Study;
