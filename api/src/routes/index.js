
const { Router } = require('express');
const { plusProduct, getProducts, getProductsId, getProductsByName,putProductById } = require('../controllers/Products');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getUsers, postUsers,putUserById } = require('../controllers/Users');
const { postLogin } = require('../controllers/logins')
const jwt = require('jsonwebtoken');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post('/product', plusProduct)
router.get('/product', getProducts)
router.get('/product/:id', getProductsId)
router.get('/products', getProductsByName)
router.put('/product/:id', putProductById)

//rutas Users
router.get('/users', getUsers)
router.post('/users', postUsers)
router.put('/users/:id',putUserById)
//rutas Login
router.post('/login', postLogin);

module.exports = router;
