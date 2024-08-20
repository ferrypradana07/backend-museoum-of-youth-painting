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
const SECRET = process.env.SECRET
const SALT_ROUND = process.env.SALT_ROUND
const WEB_DOMAIN = process.env.WEB_DOMAIN

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD,{
    host : DB_HOST,
    port : DB_PORT,
    dialect : 'mysql'
})

module.exports = {
    MAIL_USERNAME,
    MAIL_PASSWORD,
    SECRET,
    SALT_ROUND,
    NODE_PORT,
    WEB_DOMAIN,
    sequelize
}