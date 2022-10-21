const { OrderProduct } = require('../db')


const allOrderProduct = async function () {
    return await OrderProduct.findAll()
}

const getOrderProduct = async function (req, res) {
    let a = await allOrderProduct()
    //console.log(a)
    res.status(200).send(a)
}

module.exports = { getOrderProduct }