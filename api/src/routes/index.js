
const { Router } = require('express');
const { plusProduct, getProducts, getProductsId, getProductsByName, putProductById, addImagesByIdProduct } = require('../controllers/Products');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getUsers, postUsers, putUserById, putUserById1 } = require('../controllers/Users');
const { getOrder } = require('../controllers/Order')
const { getOrderProduct } = require('../controllers/OrderProduct')
const { postLogin, verification } = require('../controllers/logins')
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../controllers/SendEmail')
const { postReview, getReview, getAllReview } = require('../controllers/Reviews')
//para cloudinary
const upload = require('../utils/multer');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post('/product', plusProduct)
router.get('/product', getProducts)
router.get('/product/:id', getProductsId)
router.get('/products', getProductsByName)
router.put('/product/:id_product', putProductById)
router.post('/product/images', upload.array("imagen", 5), addImagesByIdProduct)
//rutas Users
router.get('/users', getUsers)
router.post('/users', postUsers)
router.put('/verification/:id', putUserById1)
router.put('/users/:id', putUserById)
//rutas Login
router.post('/login', postLogin);
router.get('/info', verification, (req, res) => {
    res.json('INFO entregada')
})
//rutas Order
router.get('/order', getOrder)
//rutas OrderProduct
router.get('/orderProduct', getOrderProduct)
//router
router.post('/send-email', sendEmail)

//rutas Review
router.post('/review/:product_id', postReview)
router.get('/review/:product_id', getReview)
router.get('/reviews', getAllReview)

module.exports = router;
