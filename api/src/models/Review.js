const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('review', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true
    },
    description: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    score :{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  });
};
