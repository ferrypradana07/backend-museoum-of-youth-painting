const {countrys} = require('../model/countryModel')

exports.getCountryById = async (countryId) => {
    try {
        const result = await countrys.findOne({
            where : {
                id : countryId
            }, 
            attributes: ['country']
        })
        if (result) {
            return result
        }
        return {}
    } catch (error) {
        console.error('Error while getting country data in service :',error)
        return {'error' : 'somthing going wrong'}
    }
}