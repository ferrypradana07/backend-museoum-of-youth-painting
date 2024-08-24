const { DataTypes } = require('sequelize')
const { sequelize, WEB_DOMAIN } = require('../config/config.js')
const { countrys } = require('./countryModel.js')
const {v4: uuidv4} = require('uuid')

const users = sequelize.define('users', {
  id : {
    type : DataTypes.UUID,
    defaultValue : uuidv4(),
    primaryKey : true
  }, 
  username : {
    type : DataTypes.STRING,
    unique : true,
    allowNull : false
  }, 
  email : {
    type : DataTypes.STRING,
    allowNull : false,
    unique : true,
  }, 
  password : {
    type : DataTypes.STRING,
    allowNull : false
  },
  photo_profile : {
    type : DataTypes.STRING,
    defaultValue : WEB_DOMAIN
  },
  country : {
    type : DataTypes.INTEGER,
    defaultValue : '1',
    references : {
      model : countrys,
      key : 'id'
    }
  }, 
  description : {
    type : DataTypes.STRING 
  }, 
  status : {
    type : DataTypes.ENUM,
    values : ['active', 'pending', 'deleted'],
    defaultValue : 'active'
  }
}, {
  indexes : [
    {
      name : 'index_email',
      fields : ['email']
    }
  ]
})

module.exports = {users}