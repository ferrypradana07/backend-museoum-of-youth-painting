const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/config')
const { users } = require('./userModel')
const {v4: uuidv4} = require('uuid')

const followers = sequelize.define('followers', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    userId : {
        type : DataTypes.UUID,
        allowNull : false,
        references:{
            model : users,
            key: 'id'
        }
    },
    postId : {
        type : DataTypes.UUID,
        allowNull : false,
        references:{
            model : users,
            key: 'id'
        }
    },
}, {
    indexes : [
        {
            name : 'index_userid',
            fields : ['postId']
        }
    ]
})

module.exports = {followers}