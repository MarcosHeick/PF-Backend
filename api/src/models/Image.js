const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('image', {

    img: {
      type: DataTypes.STRING,
    },
    id_product: {
      type: DataTypes.STRING
    }

  });
};
