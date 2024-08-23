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
        type : DataTypes.UUID,
        allowNull : false,
        referance : {
            model : users,
            key : 'id'
        },
        onDelete : 'CASCADE'
    }, 
    imageId : {
        type : DataTypes.UUID,
        allowNull : false,
        referance : {
            model : images,
            key : 'id'
        },
        onDelete : 'CASCADE'
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