const { Router } = require('express');
const { plusProduct, getProducts, getProductsId, getProductsByName } = require('../controllers/Products');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post('/product', plusProduct)
router.get('/product', getProducts)
router.get('/product/:id', getProductsId)
router.get('/products', getProductsByName)
module.exports = router;
