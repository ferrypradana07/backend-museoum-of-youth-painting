const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes');
const { NODE_PORT, sequelize } = require('./config/config');
const { FORCE } = require('sequelize/lib/index-hints');

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extends : true}))

app.use('/', routes)


sequelize.authenticate()
    .then(() => {console.log('connected with database')})
    .catch(err => {console.error('Error while authenticate sequelize in server', err)})

sequelize.sync({force : false})
    .then(() => {console.log('connected with DDL database model')})
    .catch(err => {console.error('Error while syncronization sequelize in server', err)})

    app.listen(NODE_PORT , () => {
    console.log(`server running on port = ${NODE_PORT} `)
})