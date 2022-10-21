const { Order } = require('../db')

const allOrder = async function () {
    return await Order.findAll()
}


const getOrder = async function (req, res) {
    let a = await allOrder()
    console.log(a)
    res.status(200).send(a)
}

module.exports = { getOrder }