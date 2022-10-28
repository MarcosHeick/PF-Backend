const nodemailer = require('nodemailer')


const sendEmail = async function(email,ID,random) {
    
    const transporter = await nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure:true,
        auth: {
            user: 'velveteccomerce@gmail.com',
            pass: 'jbppkfqawhietail'
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
        to: email,  
        subject: 'Send from Velvet',
        // text:'Verify your email',
            html: `Press <a href="https://velvetpf.vercel.app/verification/${ID}"> Here</a> to verify your email code ${random}`
    })
    // res.send('todo ok')
}



module.exports = {
    sendEmail
}