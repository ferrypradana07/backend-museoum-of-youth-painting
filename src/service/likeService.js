const {likes} = require('../model/likeModel')

exports.createLikeData = async (userId, postId, imageId) =>{
    try {
        const result = await likes.create({
            userId : userId,
            postId : postId,
            imageId : imageId
        })
        if (result) {
            return {'message': "success"}
        }
        return {'failed': "failed"}
    } catch (error) {
        console.error('Error while create like data in service',error)
        return {'error' : 'somthing going wrong'}
    }
}

exports.deleteLikeData = async (userId, imageId) =>{
    try {
        const result = await likes.delete({
            userId : userId,
            imageId : imageId
        })
        if (result) {
            return {'message': "success"}
        }
        return {'failed': "failed"}
    } catch (error) {
        console.error('Error while create like data in service',error)
        return {'error' : 'somthing going wrong'}
    }
}