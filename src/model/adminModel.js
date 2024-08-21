const { DataTypes } = require('sequelize')
const {sequelize} = require('../config/config')
const {v4: uuidv4} = require('uuid')
const { fields } = require('../middleware/multerMiddleware')

const admins = sequelize.define('admins', {
    id : {
        type : DataTypes.UUID,
        defaultValue : uuidv4(),
        primaryKey : true
    }, 
    username : {
        type : DataTypes.STRING,
        allowNull : false,
    }, 
    password : {
        type : DataTypes.STRING,
        allowNull : false,
    }, 
})

module.exports = {admins}