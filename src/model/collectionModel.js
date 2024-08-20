const { DataTypes } = require('sequelize')
const {sequelize} = require('../config/config')
const {users} = require('./userModel')
const { images } = require('./imageModel')

const collections = sequelize.define('collections', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    userId : {
        type : DataTypes.INTEGER,
        allowNull : false,
        referance : {
            model : users,
            key : 'id'
        }
    }, 
    imageId : {
        type : DataTypes.INTEGER,
        allowNull : false,
        referance : {
            model : images,
            key : 'id'
        }
    }, 
}, {
    indexes : [
        {   
            name : 'index_userId',
            fields : ['userId']
        }
    ]
})

module.exports = {collections}