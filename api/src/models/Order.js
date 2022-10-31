const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('order', {
    /* id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true
    }, */
    status: {
      type: DataTypes.ENUM('pending','completed','canceled'),
      allowNull:false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    direction: {
        type: DataTypes.STRING,
        allowNull:true,
    },
    numAddress: {
        type: DataTypes.STRING,
        allowNull:true, 
    },
    postalCode: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    province: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    locality: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    department: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    floor: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false

    }
  });
};
