const express = require('express')
 
const imagesController = require('../controller/imagesController')
const {gettingManyDatasValidation} = require('../middleware/requestMiddleware')

const router = express.Router() 


router.get('/', gettingManyDatasValidation, imagesController.getImages)
router.get('/:userId', gettingManyDatasValidation, imagesController.getUserImages)
router.get('/search', gettingManyDatasValidation, imagesController.getImagesByTitle)
// f
module.exports = router