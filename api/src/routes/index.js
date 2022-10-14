const { Router } = require('express');
const { plusProduct, getProducts } = require('../controllers/Products');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post('/product',plusProduct)
router.get('/product', getProducts)
module.exports = router;
