const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('size', {
  
    siz3: {
      type: DataTypes.STRING,
      allowNull:false,
    }
    
  });
};
