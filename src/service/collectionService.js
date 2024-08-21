const {collections} = require('../model/collectionModel')

exports.createCollectionData = async (userId, imageId) =>{
    try {
        const result = await collections.create({
            userId : userId,
            imageId : imageId
        })
        if (result) {
            return {'success' : {
                'message':'success'
            }}
        }
        return {'failed' : {
            'message' : 'Failed create collection data'
        }}
    } catch (error) {
        console.error('Error while create collection data in service',error)
      return {'error' : {
                'message' : 'Something going wrong'
            }}
    }
}

exports.deleteCollectionData = async (userId, imageId) =>{
    try {
        const result = await collections.destroy({
            where : {
                userId : userId,
                imageId : imageId
            }
        })
        if (result) {
            return {'success' : {
                'message':'success'
            }}
        }
        return {'failed' : {
            'message' : 'Failed deleting collection data'
        }}
    } catch (error) {
        console.error('Error while delete collection data in service',error)
      return {'error' : {
                'message' : 'Something going wrong'
            }}
    }
}

exports.getUserCollectionsData = async (userId, offset, order, limit) =>{
    try {
        const result = await collections.findAll({
            where : {
                userId : userId
            },
            attributes : ['imageId'],
            offset : offset,
            order : [['createdAt', order]],
            limit : limit
        })
        if (result) {
            return result
        }
        return []
    } catch (error) {
        console.error('Error while get user collection data in service',error)
      return {'error' : {
                'message' : 'Something going wrong'
            }}
    }
}

exports.collections