const { mercadopago } = require('../utils/mercadoPago')

const Payment = async (req, res) => {
    // const {name,id,stock,price} = req.body;
    console.log(req.body)

    let preference = {
        items: [
            {
                title: req.body.title,
                unit_price: Number(req.body.price),
                quantity: Number(req.body.quantity)
            }
        ],
        back_urls: {

            "success": "https://velvetpf.vercel.app/ControlOrders/1",
            "failure": "https://velvetpf.vercel.app/ControlOrders/0",
            "pending": "http://localhost:3001/feedback"
        },
        auto_return: "approved",
    }

    const response = await mercadopago.preferences.create(preference)
    const preferenceId = response.body.init_point
    res.status(200).json(preferenceId)

}

const Feedback = async (req, res) => {
    res.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id
    })
}

module.exports = { Payment, Feedback }