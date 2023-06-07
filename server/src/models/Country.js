const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    id:{
      type:DataTypes.STRING,
      allowNull:false,
      primaryKey:true,
      unique:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flags:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    continents:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    capital:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    subregion:{
      type:DataTypes.STRING
    },
    area:{
      type:DataTypes.STRING,
    },
    population:{
      type:DataTypes.INTEGER,
      allowNull:false,
    }
  },{timestamps:false,
    freezeTableName:true
  });
};