const express = require('express')

const contactusController = require('../controller/contactusController')
const {headerContentTypeJSON} = require('../middleware/headerMiddleware')

const router = express.Router()

router.post('/', headerContentTypeJSON, contactusController.createContactUsForm)
router.get('/', contactusController.getContactUsForm)

module.exports = router