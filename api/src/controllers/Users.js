const { User, Order, OrderProduct } = require('../db')
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
    const a = await allUsers()
    let {
        userName,
        password,
        email,
        image,
        phoneNumber,
        role
    } = req.body
    console.log(a.filter(e => e.userName === userName))
    if (a.filter(e => e.userName === userName).length > 0) {
        return res.status(200).send("Existe ese usario")
    }
    else {
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
}
const putUserById = async (req, res) => {

    const { email, image, phoneNumber, userName } = req.body;
    console.log("destructurados", email, image, phoneNumber, userName)
    let arr = {}
    if (email) arr.email = email
    if (image) {
        let i = image.slice(12, image.length)
        console.log(i)
        arr.image = i
    }
    if (phoneNumber) arr.phoneNumber = phoneNumber
    if (userName) arr.userName = userName
    const { id } = req.params;
    const reqBodyArray = Object.keys(arr)
    console.log("esto es arr ", arr)
    console.log("esto es el body", reqBodyArray);

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
                upUser.image = req.body.image.slice(12, req.body.image.length);
                break;
            case 'phoneNumber':
                upUser.phoneNumber = req.body.phoneNumber;
                break;
            /*  case 'address':
                 upUser.address = req.body.address;
                 break;
             case 'role':
                 upUser.role = req.body.role;
                 break; */
        }
    });

    try {
        await User.update(upUser, { where: { id } })
        return res.status(200).json('updated information!!');
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }


    // const fetchUsers = await User.findByPk(id_user,{})

}

const putUserById1 = async (req, res) => {

    // const { email, image, phoneNumber, role, address } = req.body;
    const { id } = req.params;
    const { random } = req.body

    const bringUser = await User.findByPk(id, {});
    console.log(bringUser.dataValues.role)
    if (bringUser.dataValues.random === random) {

        let upUser = {};

        upUser.role = "active";



        try {
            await User.update(upUser, { where: { id } })
            return res.status(200).json('updated information!!');
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
    else {
        return res.status(404).json('Wrong Number verification')
    }

    // const fetchUsers = await User.findByPk(id_user,{})

}

const addOrder = async function (req, res) {
    const { user_id } = req.params;

    // const { price, quantity, product_id, firstName, lastName, email, postalCode, province, locality, department, floor, direction, numAddress } = req.body;
    const { price, quantity,
        product_id, firstName,
        lastName, email, postalCode,
        department, direction,
        products } = req.body;

    console.log(products);
    const newOrder = await Order.findOrCreate({
        // where: {
        //     user_id, status: "created",
        //     ...req.body
        // }
        where: {
            user_id, status: "created", lastName, email, firstName, postalCode, department,
            direction, floor: "", province: "", locality: ""
        }
        // where: {
        //     user_id, status: "cart", lastName: "", email: "", firstName: "", postalCode: "", province: "", locality: "", department: "", floor: "",
        //     direction: "", numAddress: ""
        // }
    })
    console.log(newOrder);


    let order_id = newOrder[0].dataValues.order_id;
    console.log(order_id);

    products.map(e => {
        console.log(e.id);
        console.log(e.price);
        console.log(e.cantidad);


        OrderProduct.create({
            productId: e.id,
            price: e.price,
            quantity: e.cantidad,
            orderOrderId: order_id
        })
    })

    res.status(200).json('todo ok')

}

module.exports = { getUsers, postUsers, putUserById, allUsers, putUserById1, addOrder }