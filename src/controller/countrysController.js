const { getCountrysData } = require('../service/countryService')

exports.getCountrys = async (req, res) => {
    try {
        const result = await getCountrysData()
        res.set('Content-Type', 'application/json')
        if (result.failed || result.error) {
            return res.status(400).json({
                'error' : {
                    'message' : result.failed?result.failed.message:result.error.message
                }
            })
        }
        return res.status(200).json({...result})
    } catch (error) {
        console.error('Error while get countrys data in controller ',error)
        res.status(500).json({'error' : {'message' : 'internal is error'}})
    }
}
