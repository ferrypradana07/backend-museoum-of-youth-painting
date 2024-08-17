const nodeMailer = request('nodemailer');
const transporter = nodeMailer.createrTransport({
    service : 'Gmail',
    auth : {
        user : '',
        pass : ''
    }
})
