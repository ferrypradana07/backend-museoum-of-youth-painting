const { DataTypes } = require('sequelize')
const {sequelize} = require('../config/config')
const {v4: uuidv4} = require('uuid')
const { images } = require('./imageModel')
const { users } = require('./userModel')

const comments = sequelize.define('comments', {
    id : {
        type : DataTypes.UUID,
        defaultValue : uuidv4(),
        primaryKey : true
    }, 
    imageId : {
        type : DataTypes.UUID,
        allowNull : false,
        references : {
            model : images,
            key : 'id'
        },
        onDelete : 'CASCADE'
    }, 
    userId : {
        type : DataTypes.UUID,
        allowNull : false,
        references : {
            model : users,
            key : 'id'
        },
        onDelete : 'CASCADE'
    }, 
    text : {
        type : DataTypes.STRING,
        allowNull : false
    }
}, {
    indexes : [
        {
            name : 'imageId_index',
            fields : ['imageId']
        }
    ]
})

module.exports = {comments}