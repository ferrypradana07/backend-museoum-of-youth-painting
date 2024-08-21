const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/config')
const { users } = require('./userModel')
const {v4: uuidv4} = require('uuid')

const images = sequelize.define('images', {
    id : {
        type : DataTypes.UUID,
        defaultValue : uuidv4(),
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
    URL : {
        type : DataTypes.STRING,
        allowNull : false
    },
    title : {
        type : DataTypes.STRING,
        allowNull : false
    },
    description : { 
        type : DataTypes.STRING,
        allowNull : false
    },
}, {
    indexes : [
        {
            name : 'URL_index',
            fields : ['URL']
        }
    ]
})

module.exports = {images}