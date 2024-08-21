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
            return { 'success' :{
                'message' : 'success'
            }}
        }
        return  {'failed' : {
            'message' : 'Failed create image data'
        }}
    } catch (error) {
        console.error('Error while create image data in service',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
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
            return {'success':{
                'message' : 'success delete image data'
            }}
        }
        return {'failed' : {
            'message' : 'Failed delete image data'
        }}
    } catch (error) {
        console.error('Error while delete image data in service',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
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
        return {'failed' : {
            'message' : 'image data not found'
        }}
    } catch (error) {
        console.error('error while get user image service', error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
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
        return {'failed' : {
            'message' : 'Failed get images data'
        }}
    } catch (error) {
        console.error('error while get user image service', error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
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
        return ownerId?ownerId:{'failed' : {
            'message' : 'Failed get owner id'
        }}
    } catch (error) {
        console.error('Error while deleting image ',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}
