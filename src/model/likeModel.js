const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/config')
const { users } = require('./userModel')
const { images } = require('./imageModel')

const likes = sequelize.define('likes', {
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
        },
        onDelete : 'CASCADE'
    },
    postId : {
        type : DataTypes.UUID,
        allowNull : false,
        references:{
            model : users,
            key: 'id'
        },
        onDelete : 'CASCADE'
    },
    imageId : {
        type : DataTypes.UUID,
        allowNull : false,
        references : {
            model : images,
            key : 'id'
        },
        onDelete : 'CASCADE'
    }
}, {
    indexes : [
        {
            name : 'index_userid',
            fields : ['postId']
        }
    ]
})

module.exports = {likes}