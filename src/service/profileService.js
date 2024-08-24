const {users} = require('../model/userModel')
const {collections} = require('../model/collectionModel')
const {followers} = require('../model/followerModel')
const {images} = require('../model/imageModel')
const {likes} = require('../model/likeModel')
const {getCountryById} = require('./countryService')
const { where } = require('sequelize')

exports.getProfileData = async (userId, authId) => {
    try {
        const userData = await users.findOne({
            where : {
                id : userId
            },
            attributes : ['id', 'username', 'photo_profile', 'description', 'country']
        })
        if (!userData) {
            return  {'failed' : {
                'message' : 'User data not found'
            }}
        }
        const country = await getCountryById(userData.country)
        userData.country = country.country
        
        const collectionData = await collections.findAll({
            where : {
                id : userId
            },
            limit : 3,
            attributes : ['id', 'imageId']
        })
    
        const imageData = await images.findAll({
            where : {
                id : userId
            },
            limit : 3,
            attributes : ['id', 'imageId', 'URL', 'title', 'description']
        })
        const imagesCollection = await Promise.all(collectionData.map(async(index) => {
            const image = await images.findOne({
                where : {
                    imageId : index.imageId
                },
                attributes : ['id', 'imageId', 'URL', 'title', 'description']
            })
            return image?image:''
        }))
        const likeData = await likes.count({
            where : {
                id : userId
            },
        })
        
        const followerData = await followers.count({
            where : {
                id : userId
            },
        })
        const hasFollowed = await followers.findOne({
            where : {
                id : userId,
                userId : authId
            },
        })
    
        if (userData) {
            result = {...userData.user, 'collections' : imagesCollection, 'images' : imageData, like : likeData, follower: followerData}
            return {'user' : result, 'isfollow' : hasFollowed?true:false}
        }
        return {'failed' : {
            'message' : 'failed getting user profile'
        }}
    } catch (error) {
        console.error('Error while getprofiledata in profile service', error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}