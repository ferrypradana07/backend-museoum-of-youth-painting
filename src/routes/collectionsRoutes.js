const express = require('express')

const collectionsController = require('../controller/collectionsController')
const {gettingManyDatasValidation} = require('../middleware/requestMiddleware')

const router = express.Router()

router.get('/:userId', gettingManyDatasValidation, collectionsController.getUserCollection)

module.exports = router