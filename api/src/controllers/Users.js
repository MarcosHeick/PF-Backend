

const bcryptjs = require('bcryptjs')
const { User, Favorite, UserFav, Order, OrderProduct } = require('../db')
const jwt = require('jsonwebtoken');
const express = require('express');
const { sendEmail } = require('./SendEmail');

const { ARRAY } = require('sequelize');

const keys = require('../../settings/keys');

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


    const a = await User.findAll({ include: [{ model: Favorite }] })


    return a



    //    const b = await a?.map(er=>{
    //     return {
    //         id: er.id,
    //         userName:er.userName,
    //         email:er.email,
    //         password:er.password,
    //         image:er.image ,
    //         phoneNumber: er.phoneNumber,
    //         role:er.role ,
    //         random:er.random,
    //         favorites: er.favorites?.map(el=> {return{idProduct: el.idProduct, verify :el.userFav?.verify}})
    //     }
    // }
    //)


}

const getUsers = async function (req, res) {
    //console.log(res,req)
    try {
        let a = await allUsers()
        //console.log(a)

        return res.status(200).send(a)
    } catch (error) {

        return res.status(400).json({ error: error.message })
    }

}

const postUsers = async function (req, res) {

    let {
        userName,
        password,
        email,
        image,
        phoneNumber,
        role,
        googleId,
    } = req.body
    console.log(password)
    let pas = await bcryptjs.hash(password, 8)
    //console.log(pas)
    if (googleId === undefined) {
        googleId = false
    }

    if (googleId === false) {
        let a = await allUsers();
        //console.log("esto es a ", a)


        let b = a.filter(e => e.userName === userName)
        let c = a.filter(o => o.email === email)



        if (c[0]) {

            return res.send('email ya registrado')
        }

        if (b[0]) {

            return res.status(200).send('ya tenemos creado ese usuario, prueba con otro')

        }
        const random = as()
        try {
            let userCreated = await User.create({
                userName,
                password: pas,
                email,
                image,
                phoneNumber,
                role,
                random
            })
            //  console.log(userCreated.dataValues)

            const ID = userCreated.id
            await sendEmail(email, ID, random)

            res.send(await postLogin(req, res))
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
    else {

        const random = as()
        try {
            let userCreated = await User.findOrCreate({
                where: { userName: userName },
                defaults: {
                    password: pas,
                    email: email,
                    image,
                    phoneNumber,
                    role: "active",
                    random: random
                }
            })


            res.send(await postLogin(req, res))
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
    if (image) arr.image = image
    /* let i = image.slice(12, image.length)
    console.log(i)
    arr.image = i */

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
                upUser.image = req.body.image;
                break;
            case 'phoneNumber':
                upUser.phoneNumber = req.body.phoneNumber;
                break;
            // case 'address':
            //      upUser.address = req.body.address;
            //      break;
            case 'role':
                upUser.role = req.body.role;
                break;
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

        const { random } = req.body
        //console.log("2123")
        const bringUser = await User.findByPk(id, {});
        // console.log(bringUser.dataValues.role)
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



const postLogin = async function (req, res) {

    const { userName, password } = req.body

    const Users = await allUsers();


    const a = Users.filter( e => e.userName === userName)
    //console.log("hola",a[0].dataValues.password)

    //console.log(a.length)
    let pas = await bcryptjs.compare(password, a[0].dataValues?.password)
    console.log("esto es pas ", pas)
    try {
        if (/* a.length && a[0].dataValues?.password === password */pas) {
            const payload = {
                check: true
            }
            const token = jwt.sign(payload, keys.key, {
                expiresIn: '1d'
            })
            console.log([a[0], token])
            res.json([a[0], token])
        } else {
            res.json({
                menssage: 'Usuario y/o password son incorrectos'
            })
        }

    }
    catch (error) {
        res.status(200).send(json({ error: error.message }))
    }
}
module.exports = { getUsers, postUsers, putUserById, allUsers, putUserById1, addOrder, postLogin };