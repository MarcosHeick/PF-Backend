const mercadopago = require("mercadopago");

// require('dotenv').config();

const {
    PROD_ACCESS_TOKEN
} = process.env;


mercadopago.configure({
    access_token: PROD_ACCESS_TOKEN,
});

module.exports = {
    mercadopago
};
