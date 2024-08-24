const {images} = require('../model/imageModel')
const {collections} = require('../model/collectionModel')
const {likes} = require('../model/likeModel')

exports.getImageDetailData = async (imageId, userId) => {
    try {
        const image = await images.findOne({
            where : {
                id : imageId
            }
        })
        if (!image) {
            return {'failed' : {
                'message' : 'Failed get image data'
            }}
        }
        if (!userId) {
            return image
        }
        const isLiked = await likes.findOne({
            where : {
                userId : userId,
                imageId : imageId
            }
        })
        const isCollect = await collections.findOne({
            where : {
                userId : userId,
                imageId : imageId
            }
        })
        return {
            'image' : image,
            'isCollect' : isCollect?true:false,
            'isLiked' : isLiked?true:false
        }
    } catch (error) {
        console.error('Error while getting content data in content service',error)
        return {'error' : {
                'message' : 'Something going wrong'
            }}
    }
}