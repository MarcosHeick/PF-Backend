const mercadopago = require("mercadopago");

// require('dotenv').config();

// const {
//     PROD_ACCESS_TOKEN
// } = process.env;


mercadopago.configure({
    access_token: 'TEST-4011887028534633-102808-cda46b3df10c2883b642c4ce78c8aee5-569834122',
});

module.exports = {
    mercadopago
};
