const { User } = require('../db')
const { sendEmail } = require('./SendEmail')
const as = () => {
    const len = 8
    let randStr = ''
    for (let i = 0; i < len; i++) {
        const ch = Math.floor((Math.random() * 10) + 1)
        randStr += ch
    }
    return randStr
}
const allUsers = async function () {

    return await User.findAll()



}

const getUsers = async function (req, res) {
    try {
        let a = await allUsers()
        //console.log(a)
        return res.status(200).send(a)
    } catch (error) {

        return res.status(400).json({ error: error.message })
    }
}

const postUsers = async function (req, res) {
    console.log('hola')
    let {
        userName,
        password,
        email,
        image,
        phoneNumber,
        role
    } = req.body
    console.log(req.body)

    random = as()
    try {
        let userCreated = await User.create({
            userName,
            password,
            email,
            image,
            phoneNumber,
            role,
            random
        })
        const ID = userCreated.id
        await sendEmail(email, ID)
        res.send('todo ok')
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}
const putUserById = async (req, res) => {

    // const { email, image, phoneNumber, role, address } = req.body;
    const { id_user } = req.params;
    const reqBodyArray = Object.keys(req.body)

    console.log(reqBodyArray);

    let upUser = {};

    reqBodyArray.map(u => {
        switch (u) {
            case 'userName':
                upUser.userName = req.body.userName;
                break;
            case 'email':
                upUser.email = req.body.email;
                break;
            case 'image':
                upUser.image = req.body.image;
                break;
            case 'phoneNumber':
                upUser.phoneNumber = req.body.phoneNumber;
                break;
            case 'address':
                upUser.address = req.body.address;
                break;
            case 'role':
                upUser.role = req.body.role;
                break;
        }
    });

    try {
        await User.update(upUser, { where: { id_user } })
        return res.status(200).json('updated information!!');
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }


    // const fetchUsers = await User.findByPk(id_user,{})

}

const putUserById1 = async (req, res) => {

    // const { email, image, phoneNumber, role, address } = req.body;
    const { id } = req.params;
    const {random} = req.body

    const bringUser = await User.findByPk(id, {});
    console.log(bringUser.dataValues.role)
    if (bringUser.dataValues.random === random){

    let upUser = {};

    upUser.role = "active";



    try {
        await User.update(upUser, { where: { id } })
        return res.status(200).json('updated information!!');
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
    }
    else{
        return res.status(404).json('Wrong Number verification')
    }

    // const fetchUsers = await User.findByPk(id_user,{})

}
module.exports = { getUsers, postUsers, putUserById, allUsers, putUserById1 }