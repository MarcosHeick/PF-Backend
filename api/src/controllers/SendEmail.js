const nodemailer = require('nodemailer')


const sendEmail = async function(req, res) {
    const transporter = await nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure:false,
        auth: {
            user: 'liam.bahringer@ethereal.email',
            pass: 'bs2tBGa9rfQmR3d2DD'
        }
    });

    const mailOptions = {
        from: 'Velvet',
        to: 'marcos.heick@gmail.com',  
        subject: 'Enviando desde Velvet',
        text:'bueno esta funcionando yeah!'
    }
    await transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            res.status(500).send(error.message)
        } else{
            console.log('email enviado')
            res.status(200).send('susse')
        }
    })
}

module.exports = {
    sendEmail
}