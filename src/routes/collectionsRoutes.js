const express = require('express')

const collectionsController = require('../controller/collectionsController')

const router = express.Router()

router.get('/:userId', collectionsController.getUserCollection)

module.exports = router