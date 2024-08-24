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
        return {'failed' : {
            'message' : 'Failed get country data'
        }}
    } catch (error) {
        console.error('Error while getting country data by countryId in country service :',error)
      return {'error' : {
                'message' : 'Something going wrong'
            }}
    }
}

exports.getCountrysData = async () => {
    try {
        const countrys = await countrys.findAll({
            attributes: ['id', 'country'],
            order : [['country', 'ASC']]
        })
        if (countrys.length > 0) {
            return {countrys}
        }
        return {'failed' : {
            'message' : 'Failed get countrys data'
        }}
    } catch (error) {
        console.error('Error while getting countrys data in country service :',error)
        return {'error' : {
                'message' : 'Something going wrong'
            }}
    }
}