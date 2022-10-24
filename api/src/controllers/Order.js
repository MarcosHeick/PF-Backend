const { Order } = require('../db')

const allOrder = async function () {
    try {
         await Order.findAll()
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}


const getOrder = async function (req, res) {
    try {
        let a = await allOrder()
        console.log(a)
        res.status(200).send(a)

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports = { getOrder }