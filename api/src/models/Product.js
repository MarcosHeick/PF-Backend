const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
    },
    // image :{
    //   type:DataTypes.STRING,
    // },
    price :{
        type:DataTypes.INTEGER,
    },
    stock :{
        type:DataTypes.INTEGER,
    },
    description :{
        type:DataTypes.STRING,
        
    },
    value:{
      type:DataTypes.BOOLEAN,
      defaultValue:true
    }
  });
};