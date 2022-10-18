const { User } = require('../db')

const allUsers = async function () {
    return await User.findAll()
}

const getUsers = async function (req, res) {
    let a = await allUsers()
    //console.log(a)
    res.status(200).send(a)
}

module.exports = { getUsers }