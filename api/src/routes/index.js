
const { Router } = require('express');
const { plusProduct, getProducts, getProductsId, getProductsByName, putProductById, addImagesByIdProduct, addImagesByIdProductSingle } = require('../controllers/Products');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getUsers, postUsers, putUserById, putUserById1, addOrder , postLogin} = require('../controllers/Users');
const { getOrder, sendEmailWithOrder, updateOrderState } = require('../controllers/Order')
const { getOrderProduct } = require('../controllers/OrderProduct')
const { verification } = require('../controllers/logins')
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../controllers/SendEmail')
const { postReview, getReview, getAllReview } = require('../controllers/Reviews')
const { Payment, Feedback } = require('../controllers/Payment')
//para cloudinary
const upload = require('../utils/multer');
const path = require('path');
const { getFavorites,addFavorite } = require('../controllers/Favs');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post('/product', plusProduct)
router.get('/product', getProducts)
router.get('/product/:id', getProductsId)
router.get('/products', getProductsByName)
router.put('/product/:id_product', putProductById)
router.post('/product/images', upload.array("imagen", 5), addImagesByIdProduct)
router.post('/product/image', upload.single("imagen1"), addImagesByIdProductSingle)
//rutas Users
router.get('/users',  getUsers)
router.post('/users', postUsers)
router.put('/verification/:id', putUserById1)
router.put('/users/:id', putUserById)

router.post('/users/cart/:user_id', addOrder)

//rutas Login
router.post('/login', postLogin);
router.get('/info', verification, (req, res) => {
    res.json('INFO entregada')
})
//rutas Order
router.get('/order', getOrder)
router.put('/order/:order_id', updateOrderState)
router.post('/order/sendingEmail', sendEmailWithOrder)



//rutas OrderProduct
router.get('/orderProduct', getOrderProduct)
//router
router.post('/send-email', sendEmail)

//rutas Review
router.post('/review/:product_id', postReview)
router.get('/review/:product_id', getReview)
router.get('/reviews', getAllReview)
//Mercado pago
router.post('/payment', Payment)
router.get('/feedback', Feedback)




router.get('/prueba',function(req,res){
    res.sendFile(path.join(__dirname+'../../../prueba.html'))
})
//Favorites
router.get('/favorites',getFavorites)
router.post('/favorites',addFavorite)

module.exports = router;
