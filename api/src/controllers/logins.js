const {getUsers, allUsers} = require('../controllers/Users')
const jwt = require('jsonwebtoken');

const express = require('express');
const app = express();
const keys = require('../../settings/keys')
app.set('key', keys.key)
//console.log(app.get('key'))
const postLogin = async function (req, res) {
    
    const {userName, password} = req.body

    const Users = await allUsers();
    //console.log('user de login ',Users)
    const a = Users.filter( e => e.userName === userName)
    //console.log("hola",a[0].dataValues.password)
    //console.log(a.length)
    if(a.length && a[0].dataValues.password === password){
        const payload = {
            check:true
        }
        const token = jwt.sign(payload, app.get('key'),{
            expiresIn:'1d'
        })
        res.json( [a , {token: token }    ]   )
    }else{
        res.json({
            menssage:'Usuario y/o password son incorrectos'
        })
    }
}

function verification (req,res,next){
    let token = req.headers['x-acces-token'] || req.headers['authorization'];
    console.log(req.headers)
    if (!token){
        res.status(401).send({
            error:'Necesitas token'
        })
    
    
    }
    if (token?.startsWith('Bearer ')){
        token = token.slice(7,token.length)
    
    }
    if (token){
        jwt.verify(token,app.get('key'), (error,decoded)=>{
            if(error){
                return res.json({
                    message:'Token Invalido'
                })
            }
            else{
                req.decoded= decoded;
                next()
            }
        })
    }
    };


module.exports = {postLogin,verification}