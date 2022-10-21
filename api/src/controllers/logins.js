const {getUsers, allUsers} = require('../controllers/Users')
const jwt = require('jsonwebtoken');

const express = require('express');
const app = express();
const keys = require('../../settings/keys')
app.use('Key', keys.key)
console.log(jwt)
const postLogin = async function (req, res) {
    
    const {userName, password} = req.body

    const Users = await allUsers();
    //console.log('user de login ',Users)
    const a = Users.filter( e => e.userName === userName)
    console.log("hola",a[0].dataValues.password)
    console.log(a.length)
    if(a.length && a[0].dataValues.password == password){
        const payload = {
            check:true
        }
        const token = jwt.sign(payload, app.get('key'),{
            expiresIn:'1d'
        })
        res.json({
            message:'autentificacion correcta',
            token: token
        })
    }else{
        res.json({
            menssage:'Usuario y/o password son incorrectos'
        })
    }
}


module.exports = {postLogin}