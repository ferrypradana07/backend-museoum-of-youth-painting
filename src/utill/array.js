exports.exportImageId = async (array) => {
    try {
        const result = array.map(index => 
            index.imageId
        )
        return result
    } catch (error) {
        console.error('Error while export imageId',error)
        return {'error' : false}
    }
}