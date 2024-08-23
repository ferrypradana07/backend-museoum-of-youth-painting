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
    }
})

module.exports = { countrys } 