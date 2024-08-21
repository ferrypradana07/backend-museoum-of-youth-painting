const {createImageData, deleteImageData, getImagesData, getUserImagesData, getImageData} = require('../service/imageService')
const {createURL} = require('../utill/location')
const {createArrayNotifObject} = require('../utill/notification')
const {getFollowersIdData} = require('../service/followerService')
const {getUsernameByUserId} = require('../service/userService')

exports.createImage = async (req, res) => {
    try {
        const userId = req.decoded.id
        const imageIdentifier = req.imageIdentifier??''
        const {title, description} = req.body??''
        res.set('Content-Type', 'application/json')
        if (!title || !imageIdentifier) {
            return res.status(400).json({
                'error' : {
                    'message' : 'image name is require'
                }
            })
        } 
        const cdnAccess = await createURL(`/cdn/${imageIdentifier}`)
        const message = await createImageData(userId, cdnAccess, title, description)
        if (message.failed || message.failed) {
            return res.status(500).json({
                'error' : {
                    'message' : message.error?message.error:message.failed
                }
            })
        }
        if (message) {
            return res.status(201).json({
                'message' : 'image upload successfully'
            })
        }
        
        res.status(500).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })
        const array = await getFollowersIdData(userId)
        if (array) {
            const username = await getUsernameByUserId(userId)
            await createArrayNotifObject(array.followers, '<username>'+ username + '</username> upload new image', '<username>'+username+ '</username> upload new image')
        }
    } catch (error) {
        console.error('Error while create image in controller',error)
        return res.status(400).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })
    }
}

exports.deleteImage = async (req, res) => {
    try {
        const {imageId} = req.params??'';
        const {id} = req.decoded;
        res.set('Content-Type', 'application/json')
        if (!imageId || !userId) {
            return res.status(400).json({
                'error' : {
                    'message' : 'image id and userId is require'
                }
            })
        } 
        const message = await deleteImageData(imageId, id)
        
        if (message.failed || message.error) {
            return res.status(500).json({
                'error' : {
                    'message' : message.error?message.error.message:message.failed.message
                }
            })
        }
        if (message) {
            return res.status(201).json({
                'message' : 'image deleted'
            })
        }
        res.status(500).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })
    } catch (error) {
        console.error('Error while deleting image in controller',error)
        return res.status(400).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })
    }
}

exports.getOwnerIdBYimageId = async() => {
    try {
        
    } catch (error) {
        console.error('Error while deleting image ',error)
        return res.status(400).json({
            'error' : {
                'message' : 'something going wrong'
            }
        })
    }
}
