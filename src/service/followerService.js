const { where } = require('sequelize')
const {followers} = require('../model/followerModel')

exports.createFollowerData = async (userId, postId) =>{
    try {
        const validation = await followers.findOne({
            where : {
                userId : userId,
                postId : postId
            }
        })
        if (validation) {
            return {
                'failed' : {
                    'message' : 'user has been followed'
                }
            }
        }
        const result = await followers.create({
            userId : userId,
            postId : postId
        })
        if (result) {
            return {'success' : {
                'message':'success'
            }}
        }
        return {'failed' : {
            'message' : 'Failed create follower data'
        }}
    } catch (error) {
        console.error('Error while create follower data in follower service',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}

exports.deleteFollowerData = async (userId, postId) =>{
    try {
        const result = await collections.destroy({
            where : {
                userId : userId,
                postId : postId
            }
        })
        if (result) {
            return {'success' : {
                'message' : 'success'
            }}
        }
        return {'failed' : {
            'message' : 'Failed delete image data'
        }}
    } catch (error) {
        console.error('Error while deleteing follower data in follower service',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}

exports.getFollowersIdData = async (postId) =>{
    try {
        const result = await followers.findAll({
            where : {
                postId : postId
            }
        })
        if (result.length > 0) {
            return {'followers' : result}
        }
        return []
    } catch (error) {
        console.error('Error while getting followers data in follower service ',error)
        return {'error' : {
                'message' : 'Something going wrong'
            }}
    }
}
