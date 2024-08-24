const { DataTypes } = require('sequelize')
const {sequelize} = require('../config/config')
const {v4: uuidv4} = require('uuid')
const { admins } = require('./adminModel')

const historys = sequelize.define('historys', {
    id : {
        type : DataTypes.UUID,
        defaultValue : uuidv4(),
        primaryKey : true
    }, 
    adminId : {
        type : DataTypes.UUID,
        allowNull : false,
        refernces : {
            model : admins,
            key : 'id'
        }
    }, 
    activity  : {
        type : DataTypes.STRING,
        allowNull : false,
    }, 
})

module.exports = {historys}