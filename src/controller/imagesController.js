const {getImagesData, getUserImagesData} = require('../service/imageService')
const {numberValidator} = require('../utill/type')

exports.getUserImages = async (req, res) => {
    try {
        const {limit, offset} = req.query??'';
        const {userId} = req.params??'' 
        const order = req.query.order?req.query.order: ASC 
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
        const result = await getUserImagesData(userId, offset, order, limit)
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
        if (!limit || !offset) {
            return res.status(400).json({
                'error' : {
                    'message' : 'limit and offset are require'
                }
            })
        }
        const result = await getImagesData(offset, order, limit)
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
        console.error('error while getting image in controller', error)
        res.status(500).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })
    }
}