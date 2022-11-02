const {getUsers, allUsers} = require('../controllers/Users')
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')
const express = require('express');
const app = express();
const keys = require('../../settings/keys')
const cors = require('cors')
app.set('key', keys.key)
//console.log(app.get('key'))
app.use(cors())

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


module.exports = {verification}