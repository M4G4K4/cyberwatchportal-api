const { DataTypes } = require("sequelize");
const sequelize = require('../config/Connection');

const Graphs = sequelize.define('Graphs', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: true
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false
    },
    data:{
        type: DataTypes.JSON,
        allowNull: false
    },
    study_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'graphs',
    timestamps: true,
    underscored: true
});

module.exports = Graphs;
