const express = require('express')

const commentsController = require('../controller/commentsController')
const {gettingManyDatasValidation} = require('../middleware/requestMiddleware')

const router = express.Router()

router.get('/:imageId', gettingManyDatasValidation, commentsController.getComments)
// success
module.exports = router