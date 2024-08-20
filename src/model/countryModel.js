const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/config')

const countrys = sequelize.define('countrys', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    country:{
        type : DataTypes.STRING,
        allowNull : false
    },
    createAt : {
        type : DataTypes.DATE,
        defaultValue : DataTypes.NOW
}})

module.exports = { countrys } 