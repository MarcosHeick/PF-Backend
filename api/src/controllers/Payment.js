const { mercadopago } = require('../utils/mercadoPago')

const Payment = async (req, res) => {
    const {name,id,stock,price} = req.body;
    console.log(req.body.price)
    
    let preference = {
        items: [
            {
                title: name,
                unit_price: Number(price),
                quantity: Number(stock)
            }
        ],
        back_urls: {
            "success": "http://localhost:3001/feedback",
            "failure": "http://localhost:3001/feedback",
            "pending": "http://localhost:3001/feedback"
        },
        auto_return: "approved",
    }

    const response = await mercadopago.preferences.create(preference)
    const preferenceId = response.body.id
    res.status(200).send(preferenceId)

}

const Feedback = async (req, res) => {
    res.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id
    })
}

module.exports = { Payment, Feedback }