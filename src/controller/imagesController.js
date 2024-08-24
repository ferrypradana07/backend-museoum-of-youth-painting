const {getImagesData, getUserImagesData, getImagesDataByTitle} = require('../service/imageService')
const {numberValidator, converToNumberType, convertToNumberType} = require('../utill/type')

exports.getUserImages = async (req, res) => {
    try {
        const {limit, offset} = req.query??'';
        const {userId} = req.params??'' 
        const order = req.query.order?req.query.order: 'ASC' 
        res.set('Content-Type', 'application/json')
        if (!userId || !limit || !offset) {
            return res.status(400).json({
                'error' : {
                    'message' : 'userId, limit, and offset are require'
                }
            })
        }
        const validType = await numberValidator(offset) && await numberValidator(limit)
        if (!validType) {
            return res.status(400).json({
                'error' : {
                    'message' : 'offset or limit query type are invalid'
                }
            })
        }
        const newOffset = await convertToNumberType(offset)
        const newLimit = await convertToNumberType(limit)
        const result = await getUserImagesData(userId, newOffset, order, newLimit)
        if (result.failed || result.error) {
            return res.status(400).json({
                'error' : {
                    'message' : result.failed?result.failed.message:result.error.message
                }
            })
        }
        res.status(200).json({
            'images' : result
        })
    } catch (error) {
        console.error('error while getting user images in controller', error)
        res.status(500).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })
    }
}


exports.getImages = async (req, res) => {
    try {
        const {limit, offset} = req.query??'';
        const order = req.query.order?req.query.order: 'ASC' 
        res.set('Content-Type', 'application/json')
        const newOffset = await convertToNumberType(offset)
        const newLimit = await convertToNumberType(limit)
        const result = await getImagesData(newOffset, order, newLimit)
        if (result.failed || result.error) {
            return res.status(400).json({
                'error' : {
                    'message' : result.failed?result.failed.message:result.error.message
                }
            })
        }
        res.status(200).json({
            ...result
        })
    } catch (error) {
        console.error('error while getting many image in controller', error)
        res.status(500).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })
    }
}

exports.getImagesByTitle = async (req, res) => {
    try {
        const {limit, offset, title} = req.query??'';
        const order = req.query.order?req.query.order: 'ASC' 
        const newOffset = await convertToNumberType(offset)
        const newLimit = await convertToNumberType(limit)
        const result = await getImagesDataByTitle(title, newOffset, order, newLimit)
        res.set('Content-Type', 'application/json')
        if (result.failed || result.error) {
            return res.status(400).json({
                'error' : {
                    'message' : result.failed?result.failed.message:result.error.message
                }
            })
        }
        res.status(200).json({
            ...result
        })
    } catch (error) {
        console.error('error while getting image in controller', error)
        res.status(500).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })
    }
}