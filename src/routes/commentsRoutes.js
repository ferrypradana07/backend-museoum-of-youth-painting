const express = require('express')

const commentsController = require('../controller/commentsController')

const router = express.Router()

router.get('/:imageId', commentsController)
// success
module.exports = router