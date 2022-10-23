const nodemailer = require('nodemailer')


const sendEmail = async function(req, res) {
    const transporter = await nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure:true,
        auth: {
            user: 'guille.fernandeeez@gmail.com',
            pass: 'hpxjhtbeoybhdmor'
        }
    });

   /*  transporter.verifi().then(()=>{
        console.log('ready for send emails')
    })
 */
   /*  const mailOptions = {
        from: 'Velvet',
        to: 'marcos.heick@gmail.com',  
        subject: 'Enviando desde Velvet',
        text:'bueno esta funcionando yeah!'
    } */
    await transporter.sendMail({
        from: 'Velvet',
        to: 'guille.fernandeeez@gmail.com',  
        subject: 'Enviando desde Velvet',
        text:'bueno esta funcionando yeah!'
    })
    res.send('todo ok')
}



module.exports = {
    sendEmail
}