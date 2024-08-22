const Sequelize = require('sequelize');
require('dotenv').config()

const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME
const DB_HOST = process.env.DB_HOST
const NODE_PORT = process.env.NODE_PORT
const DB_PORT = process.env.DB_PORT

const MAIL_USERNAME = process.env.MAIL_USERNAME
const MAIL_PASSWORD = process.env.MAIL_PASSWORD
const MAIL_SERVICE = process.env.MAIL_SERVICE

const SECRET = process.env.SECRET
const SALT_ROUND = process.env.SALT_ROUND
const WEB_DOMAIN = process.env.WEB_DOMAIN
const WHITELIST = process.env.WHITELIST
const NODE_ENV = process.env.NODE_ENV
const SECRET_CORS_KEY = process.env.SECRET_CORS_KEY


const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD,{
    host : DB_HOST,
    port : DB_PORT,
    dialect : 'mysql',
    timezone : '+07:00',
    dialectOptions : {
        dateStrings : true,
        typeCast : function (field, next){
            if (field.type === 'DATETIME') {
                return field.string()
            }
            return next()
        }
    },
    logging : false,
})

module.exports = {
    MAIL_USERNAME,
    MAIL_PASSWORD,
    MAIL_SERVICE,
    SECRET,
    SALT_ROUND,
    NODE_PORT,
    WEB_DOMAIN,
    WHITELIST,
    SECRET_CORS_KEY,
    NODE_ENV,
    sequelize
}