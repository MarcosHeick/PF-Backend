
const { Router } = require('express');
const { plusProduct, getProducts, getProductsId, getProductsByName,putProductById ,addImagesByIdProduct} = require('../controllers/Products');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getUsers, postUsers,putUserById } = require('../controllers/Users');
const { getOrder } = require('../controllers/Order')
const { getOrderProduct } = require('../controllers/OrderProduct')
const { postLogin,verification } = require('../controllers/logins')
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../controllers/SendEmail')

//para cloudinary
const upload = require('../utils/multer');
const { nuevaImagen } = require('../controllers/routePrueba')

//



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post('/product', plusProduct)
router.get('/product', getProducts)
router.get('/product/:id', getProductsId)
router.get('/products', getProductsByName)
router.put('/product/:id', putProductById)
router.post('/:id_product/images', upload.single("imagen"), addImagesByIdProduct)

//rutas Users
router.get('/users',verification, getUsers)
router.post('/users', postUsers)
router.put('/users/:id',putUserById)
//rutas Login
router.post('/login', postLogin);
router.get('/info',verification, (req,res)=>{
    res.json('INFO entregada')
} )
//rutas Order
router.get('/order', getOrder)
//rutas OrderProduct
router.get('/orderProduct', getOrderProduct)
//router
router.post('/send-email', sendEmail)


module.exports = router;
