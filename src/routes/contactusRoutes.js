const express = require('express')

const contactusController = require('../controller/contactusController')
const {headerContentTypeJSON, headerContentTypeXURLEncoded} = require('../middleware/headerMiddleware')

const router = express.Router()

router.post('/', headerContentTypeXURLEncoded, contactusController.createContactUsForm)
router.get('/', contactusController.getContactUsForm)

module.exports = router