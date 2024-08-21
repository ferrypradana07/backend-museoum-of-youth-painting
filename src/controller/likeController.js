const {createLikeData} = require('../service/likeService')
const {getOwnerIdByImageId} = require('../service/imageService')
const {createNotificationData} = require('../service/notificationService')

exports.createLike = async (req, res) => {
    try {
        const {imageId} = req.params??''
        const {id} = req.decoded
        const ownerId = await getOwnerIdByImageId(imageId)
        if (!ownerId) {
            return res.status(400).json({
                'error' : {
                    'message' : 'imageId is invalid'
                }
            })
        }
        const result = await createLikeData(id, ownerId.id, imageId)
        if (result.failed || result.error) {
            return res.status(400).json({
                'error' : {
                    'message' : result.failed?result.failed.message:result.error.message
                }
            })
        }
        await createNotificationData(ownerId)
        if (result) {
            return res.status(200).json({
                'message' : 'success'
            })
        }
        res.status(400).json({
                'error' : {
                    'message' : 'failed create like'
                }
        })
    } catch (error) {
        console.error('error while create like in controller', error)
        res.status(500).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })
    }
}

exports.deleteLike = async (req, res) => {
    try {
        const {imageId} = req.params??''
        const {id} = req.decoded
        const ownerId = await getOwnerIdBYimageId(imageId)
        if (!ownerId) {
            return res.status(400).json({
                'error' : {
                    'message' : 'imageId is invalid'
                }
            })
        }
        const result = await createLikeData(id, ownerId, imageId)
        if (result.failed || result.error) {
            return res.status(400).json({
                'error' : {
                    'message' : result.failed?result.failed.message:result.error.message
                }
            })
        }
        res.status(200).json({
            'message' : 'success'
        })
    } catch (error) {
        console.error('error while deleting like in controller', error)
        res.status(500).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })
    }
}