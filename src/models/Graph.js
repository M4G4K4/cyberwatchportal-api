const { DataTypes } = require("sequelize");
const sequelize = require('../config/Connection');

const Study = require('./Study');

const Graph = sequelize.define('Graph', {
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
        allowNull: false,
        references: {
            model: Study,
            key: 'id'
        }
    }
}, {
    tableName: 'graphs',
    timestamps: true,
    underscored: true
});

Graph.belongsTo(Study);

module.exports = Graph;
