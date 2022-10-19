const { User } = require('../db')

const allUsers = async function () {
    return await User.findAll()
}

const getUsers = async function (req, res) {
    let a = await allUsers()
    //console.log(a)
    res.status(200).send(a)
}

const postUsers = async function (req, res) {
    console.log('hola')
    let{
        userName,
        password,
        email,
        image,
        phoneNumber,
        role
    } = req.body
    console.log(req.body)
    let userCreated = await User.create({
        userName,
        password,
        email,
        image,
        phoneNumber,
        role
    })
    res.send('todo ok')
}

module.exports = { getUsers, postUsers }