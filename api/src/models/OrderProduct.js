const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('orderProduct', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    direction: {
        type: DataTypes.STRING,
        allowNull:false,
      },
    quantity :{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
  });
};
