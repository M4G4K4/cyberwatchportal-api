const { DataTypes } = require("sequelize");
const sequelize = require('../config/Connection');

const Login = sequelize.define('Login', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    ip:{
        type: DataTypes.STRING,
        allowNull: true
    },
    user_agent:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'login',
    timestamps: true,
    underscored: true
});

module.exports = Login;
