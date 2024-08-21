const { DataTypes } = require('sequelize')
const {sequelize} = require('../config/config')
const {v4: uuidv4} = require('uuid')
const { fields } = require('../middleware/multerMiddleware')

const contactus = sequelize.define('contactus', {
    id : {
        type : DataTypes.UUID,
        defaultValue : uuidv4(),
        primaryKey : true
    }, 
    username : {
        type : DataTypes.STRING,
        allowNull : false,
    }, 
    email : {
        type : DataTypes.STRING,
        allowNull : false,
    }, 
    subject : {
        type : DataTypes.STRING,
        allowNull : false,
    }, 
    message : {
        type : DataTypes.STRING,
        allowNull : false,
    }, 
}, {
    indexes : [
        {   
            name: 'index',
            fields : ['username'] 
        }
    ]
})

module.exports = {contactus}