const mercadopago = require("mercadopago");

// require('dotenv').config();

// const {
//     PROD_ACCESS_TOKEN
// } = process.env;


mercadopago.configure({
    access_token: 'TEST-3051747133356344-102711-dece0f5ba8318b35351669ca05d76b74-227615014',
});

module.exports = {
    mercadopago
};
