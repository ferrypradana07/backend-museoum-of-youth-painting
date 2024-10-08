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
        console.error('Error while create image data in image service',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}

exports.deleteImageData = async (imageId, userId) => {
    try {
        const image = await images.destroy({
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
        console.error('Error while delete image data in image service',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}

exports.getURLimageByImageId = async (array) => {
    try {
        const result = await Promise.all(array.map( async (index) => {
            const image = await images.findOne({
                where :{
                    id : index
                },
                attributes : ['URL']
            })
            const result = {
                imageId : index,
                'URL' : URL
            }
            return URL?{'URL' : image.URL,'imageId' : index }: ''
        })) 
        
        console.log(result)
        if (!result) {
            return {'failed':{
                'message' : 'images not found'
            }}
        }
        return result
    } catch (error) {
        console.error('Error while get URL images data in image service ', error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}

exports.getUserImagesData = async (userId, offset, order, limit) => {
    try {
        const result = await images.findAll({
            where : {
                userId : userId
            },
            offset : offset,
            limit: limit+1,
            order : [['createdAt', order]]
        })
        if (result) {
            if (result.length <= limit) {
                return {
                    'islast' : true,
                    'images' : result
                }
            } else {
                result.pop()
                return {
                    'islast' : false,
                    'images' : result
                }
            }
        }
        return {'failed' : {
            'message' : 'image data not found'
        }}
    } catch (error) {
        console.error('error while get user image image service', error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}

exports.getImagesDataByTitle = async (title) => {
    try {
        const result = await images.findAll({
            where : {
                title : title
            },
            offset : offset,
            limit: limit+1,
            order : [['createdAt', order]]
        })
        if (result) {
            if (result.length <= limit) {
                return {
                    'islast' : true,
                    'images' : result
                }
            } else {
                result.pop()
                return {
                    'islast' : false,
                    'images' : result
                }
            }
        }
        return {'failed' : {
            'message' : 'image data not found'
        }}
    } catch (error) {
        console.error('error while get image data by title in image service', error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}

exports.getImagesData = async (offset, order, limit) => {
    try {
        const result = await images.findAll({
            offset : offset,
            limit: limit,
            order : [['createdAt', order]],
            attributes : ['id', 'URL', 'title', 'description']
        })
        if (result.length > 0) {
            if (result.length <= limit) {
                return {
                    'islast' : true,
                    'images' : result
                }
            } else {
                result.pop()
                return {
                    'islast' : false,
                    'images' : result
                }
            }
        }
        return {'failed' : {
            'message' : 'Failed get images data'
        }}
    } catch (error) {
        console.error('error while get images image service', error)
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
        console.log(ownerId)
        return ownerId?ownerId.userId:{'failed' : {
            'message' : 'Failed get owner id'
        }}
    } catch (error) {
        console.error('Error while deleting image ',error)
        return {'error' : {
            'message' : 'Something going wrong'
        }}
    }
}
