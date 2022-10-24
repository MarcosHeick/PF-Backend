const { OrderProduct } = require('../db')


const allOrderProduct = async function () {
    try {
        return await OrderProduct.findAll()
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const getOrderProduct = async function (req, res) {
    try {
        let a = await allOrderProduct()
        //console.log(a)
        res.status(200).send(a)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports = { getOrderProduct }