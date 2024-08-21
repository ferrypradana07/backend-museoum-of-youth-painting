const {getUsers} = require('../service/userService')

exports.getUsers = async (req, res) => {
    try {
        const {page, limit} = req.query??'';
        const validation = Number.isInteger(page) 
        if (!page || !validation) {
            return res.status(400).json({
                'error' : {
                    'message' : 'query page is required'
                }
            })
        }
        const order = 'ASC'
        const validType = await numberValidator(page) && await numberValidator(limit)
        if (!validType) {
            return res.status(400).json({
                'error' : {
                    'message' : 'offset or limit query type are invalid'
                }
            })
        }
        const offset = page * 15
        const result = await getUsers(offset, order, limit)

        if (result.failed || result.error) {
            return res.status(400).json({
                'error' : {
                    'message' : result.failed?result.failed.message:result.error.message
                }
            })
        }
        return res.status(200).json({"users" : result.users})
    } catch (error) {
        console.log(error)
        res.status(500).json({'error' : {'message' : 'internal is error'}})
    }
}
