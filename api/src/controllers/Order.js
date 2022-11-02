const { where } = require('sequelize')
const nodemailer = require('nodemailer')

const { Order } = require('../db')

const allOrder = async function () {

    return await Order.findAll()

}


const getOrder = async function (req, res) {
    let a

    let { statu } = req.query
    if (statu !== 'completed' && statu !== 'pending' && statu !== 'canceled' && statu !== undefined) {
        return res.status(200).send('no tenemos ese estado')
    }
    console.log(statu)
    try {
        if (statu) {
            if (statu === 'completed') {
                a = await Order.findAll({
                    where: {
                        status: statu
                    }
                })
            }
            if (statu === 'pending') {
                a = await Order.findAll({
                    where: {
                        status: statu
                    }
                })
            }
            if (statu === 'canceled') {
                a = await Order.findAll({
                    where: {
                        status: statu
                    }
                })
            }
        } else {
            a = await Order.findAll({})
        }
        // console.log(a)

        res.status(200).json(a)

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}


const sendEmailWithOrder = async function (req, res) {
    const { firstName, lastName, email, phoneNumber, direction, department, products, status, precioFinal } = req.body;

    console.log(req.body);
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'velveteccomerce@gmail.com',
            pass: 'jbppkfqawhietail'
        }
    })

    const mailOptions = {
        from: 'Velvet',
        to: `${email}`,
        subject: `su pedido esta en estado: ${status}`,
        html: `
        <html>
            <body>

            <p><span>Nombre: </span>${firstName}</p>
            <p><span>Apellido: </span>${lastName}</p>

                
                <p><span>Estado de tu orden :</span><b>${status ? status : 'pending'}</b></p>

                <p><span>precio Final: </span>${precioFinal}</p>
            </body>

        
        </html>
        `
    }

    transporter.sendMail(mailOptions, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).json(error.message)
        } else {
            res.status(200).json(req.body)

        }
    })


}

const updateOrderState = async function (req, res) {
    const { order_id } = req.params;
    const { status } = req.body;
    if (status !== "pending" && status !== "completed" && status !== "canceled" && status !== "created" && status !== "cart") {
        res.status(400).json('No es un status valido');
    }

    try {
        Order.update({
            status
        }, { where: { order_id } }
        )

        res.status(201).json('Se actualizo el estado')

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }



}

module.exports = { getOrder, sendEmailWithOrder, updateOrderState }