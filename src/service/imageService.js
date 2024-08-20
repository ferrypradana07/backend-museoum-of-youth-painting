const { where } = require('sequelize')
const {images} = require('../model/imageModel')

exports.createImageData = async (userId, URL, title, description) => {
    try {
        const image = await images.create({
            userId : userId,
            URL : URL,
            title : title,
            description : description
        })
        if (image) {
            return {
                'message' : 'success'
            }
        }
        return {}
    } catch (error) {
        console.error('Error while create image data in service',error)
        return {'error' : 'somthing going wrong'}
    }
}

exports.deleteImageData = async (imageId, userId) => {
    try {
        const image = await images.delete({
            where : {
                id : imageId,
                userId : userId
            }
        })
        if (image) {
            return {'message' : 'success'}
        }
        return {}
    } catch (error) {
        console.error('Error while delete image data in service',error)
        return {'error' : 'somthing going wrong'}
    }
}

exports.getUserImagesData = async (userId, offset, limit, order) => {
    try {
        const result = await images.findAll({
            where : {
                userId : userId
            },
            offset : offset,
            limit: limit+1,
            order : ['createAt', order]
        })
        if (result) {
            if (result.length <= limit) {
                return {
                    'islast' : false,
                    'images' : result
                }
            } else {
                result.pop()
                return {
                    'islast' : true,
                    'images' : result
                }
            }
        }
        return {}
    } catch (error) {
        console.error('error while get user image service', error)
        return {'error' : 'somthing going wrong'}
    }
}

exports.getImagesData = async (userId, offset, limit, order) => {
    try {
        const result = await images.findAll({
            where : {
                userId : userId
            },
            offset : offset,
            limit: limit+1,
            order : ['createAt', order]
        })
        if (result) {
            if (result.length <= limit) {
                return {
                    'islast' : false,
                    'images' : result
                }
            } else {
                result.pop()
                return {
                    'islast' : true,
                    'images' : result
                }
            }
        }
        return {}
    } catch (error) {
        console.error('error while get user image service', error)
        return {'error' : 'somthing going wrong'}
    }
}


exports.getOwnerIdByImageId = async(imageId) => {
    try {
        const ownerId = await images.findOne({
                where : {
                    id : imageId
                }
            }
        ) 
        return ownerId?ownerId:''
    } catch (error) {
        console.error('Error while deleting image ',error)
        return {'error' : 'error'}
    }
}
