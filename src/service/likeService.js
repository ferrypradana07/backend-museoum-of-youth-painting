const { where } = require('sequelize')
const {likes} = require('../model/likeModel')

exports.createLikeData = async (userId, postId, imageId) =>{
    try {
        const validation = await likes.findOne({
            where : {
                userId : userId,
                imageId : imageId
            }
        })
        if (validation) {
            return {
                'failed' : {
                    'message' : 'user has been liked'
                }
            }
        }
        const result = await likes.create({
            userId : userId,
            postId : postId,
            imageId : imageId
        })
        if (result) {
            return {'success': {
                'message' : "success"
            }}
        }
        return  {'failed' : {
            'message' : 'Failed create user like'
        }}
    } catch (error) {
        console.error('Error while create like data in like service',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}

exports.deleteLikeData = async (userId, imageId) =>{
    try {
        const result = await likes.destroy({
            where : {
                userId : userId,
                imageId : imageId
            }
        })
        console.log(result)
        if (result) {
            return {'success': {'message' : "success"}}
        }
        return  {'failed' : {
            'message' : 'Failed delete user like'
        }}
    } catch (error) {
        console.error('Error while delete like data in like service',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}