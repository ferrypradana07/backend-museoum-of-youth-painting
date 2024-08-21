const { MAIL_USERNAME, MAIL_PASSWORD, MAIL_SERVICE } = require("../config/config");
const { emailValidation } = require('../utill/email')
const nodeMailer = require('nodemailer');
//  @params mailObject = {to : <array>, subject : <>, text : <>}
// return
// 

exports.sendMail = async (req, res, next) => {
    const {mailObject} = req
    const transporter = nodeMailer.createTransport({
        service : MAIL_SERVICE,
        auth : {
            user : MAIL_USERNAME,
            pass : MAIL_PASSWORD
        }
    })
    const mailValidation = emailValidation(mailObject.to)
    if (!mailValidation) {
        return res.status(400).json({
            'error' : {
                'message' : 'email is invalid'
            }
        })
    } else {
        const mailOption = {
            from : MAIL_USERNAME,
            to : mailObject.to[0],
            subject : mailObject.subject,
            text : mailObject.text
        } 
        try {
            let info = await transporter.sendMail(mailOption)
            console.log(info.response)
            return next()
        } catch (error) {
            console.log(error)
        }
    }
}
  
