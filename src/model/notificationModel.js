const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/config')
const { users } = require('./userModel')
const {v4: uuidv4} = require('uuid')

const notification = sequelize.define('notifications', {
    id : {
        type : DataTypes.UUID,
        defaultValue : uuidv4,
        primaryKey : true
    }, 
    userId : {
        type : DataTypes.UUID,
        allowNull : false,
        references:{
            model : users,
            key: 'id'
        }
    },
    title : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    message : {
        type : DataTypes.STRING,
        allowNull : false,
    }
}, {
    indexes : [
        {
            name : 'index_userid',
            fields : ['userId']
        }
    ]
})

module.exports = {notification}