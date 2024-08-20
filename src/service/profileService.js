const {users} = require('../model/userModel')
const {collections} = require('../model/collectionModel')
const {followers} = require('../model/followerModel')
const {images} = require('../model/imageModel')
const {likes} = require('../model/likeModel')
const {getCountryById} = require('./countryService')

exports.getProfileData = async (userId, authId) => {
    try {
        console.log(userId)
        console.log(authId)
        const userData = await users.findOne({
            where : {
                id : userId
            },
            attributes : ['username', 'photo_profile', 'description', 'country']
        })
        if (!userData) {
            return {'failed' : 'Not Found'}
        }
        const country = await getCountryById(userData.country)
        userData.country = country.country
        
        const collectionData = await collections.findAll({
            where : {
                id : userId
            },
            limit : 3
        })
    
        const imageData = await images.findAll({
            where : {
                id : userId
            },
            limit : 3
        })
        
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
            result = {...userData.user, 'collections' : collectionData, 'images' : imageData, like : likeData, follower: followerData}
            return {'user' : result, 'isfollow' : hasFollowed?true:false}
        }
        return {'failed' : 'not found'}
    } catch (error) {
        console.error('Error while getprofiledata in service', error)
        return {'error' : 'error'} 
    }
}