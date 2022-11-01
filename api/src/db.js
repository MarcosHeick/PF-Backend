require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const {
  POST
} = process.env;
 

const sequelize = new Sequelize(`postgres://qdxcljxw:0nUSlq4EtcGa1nYdGPQ0e-vk3D8Mj-X8@babar.db.elephantsql.com/qdxcljxw`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Product, Categories, OrderProduct, User, Image, Review ,Order,Size,Favorite,UserFav} = sequelize.models;

// Aca vendrian las relaciones
//producto-categoria --->mucho a mucho 

// Product.belongsToMany(Categories, { through: 'product-category' })
// Categories.belongsToMany(Product, { through: 'product-category' })

// //producto-OrderProduct --->mucho a mucho 

// Product.belongsToMany(OrderProduct, { through: 'product-OrderProduct' })
// OrderProduct.belongsToMany(Product, { through: 'product-OrderProduct' })

// //producto-User ---> mucho a mucho 

// Product.belongsToMany(User, { through: 'product-User' })
// User.belongsToMany(Product, { through: 'product-User' })

// //producto-Image --->mucho a mucho 

// Product.belongsToMany(Image, { through: 'product-Image' })
// Image.belongsToMany(Product, { through: 'product-Image' })

// //producto-Review --->mucho a mucho 

// Product.belongsToMany(Review, { through: 'product-Review' })
// Review.belongsToMany(Product, { through: 'product-Review' })

// //User-Review --->mucho a mucho 

// User.belongsToMany(Review, { through: 'User-Review' })
// Review.belongsToMany(User, { through: 'User-Review' })
// //
// User.belongsToMany(OrderProduct, { through : 'User-Orderproduct'})
// OrderProduct.belongsToMany(User,{through:'User-Orderproduct'})
// //
// Product.belongsToMany(Size, {through: 'Product-Size'})
// Size.belongsToMany(Product,{through:'Product-Size'})
// //
// Order.belongsToMany(OrderProduct,{through: 'Order-OrderProduct'})
// OrderProduct.belongsToMany(Order,{through: 'Order-OrderProduct'})
//////

//De prueba de momento
Product.belongsToMany(Categories, {
  through: 'product-category',
  as: "categories",
  foreignKey: 'product_id'
})
Categories.belongsToMany(Product, {
  through: 'product-category',
  as: "products",
  foreignKey: 'category_id'
})
// favs
Favorite.belongsToMany(User, {
  through: UserFav,
  as: "Favorites",
  foreignKey: 'favorite_id'
})
User.belongsToMany(Favorite, {
  through: UserFav,
  as: "User",
  foreignKey: 'favorite_id'
})
//producto-Order --->M:M 
Product.belongsToMany(Order, { through: OrderProduct, foreignKey: 'order_id' })
Order.belongsToMany(Product, { through: OrderProduct, foreignKey: 'product_id' })

//producto-User --->M:M
Product.belongsToMany(User, {
  through: 'product-User',
  foreignKey:'user_id'
})
User.belongsToMany(Product, { 
  through: 'product-User',
  foreignKey:'product_id'
 })

//producto-Image --->1:M 

Product.hasMany(Image, { foreignKey: 'product_id' })
Image.belongsTo(Product, { foreignKey: 'product_id' })

//producto-Review --->1:M
Product.hasMany(Review, { foreignKey: 'product_id' })
Review.belongsTo(Product, { foreignKey: 'product_id' })


//User-Review --->1:M

User.hasMany(Review, { foreignKey: 'user_id' })
Review.belongsTo(User, { foreignKey: 'user_id' })

Product.belongsToMany(Size, { through: 'Product-Size' })
Size.belongsToMany(Product, { through: 'Product-Size' })

//User-Order

User.hasMany(Order, { foreignKey: 'user_id' })
Order.belongsTo(User, { foreignKey: 'user_id' })

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
