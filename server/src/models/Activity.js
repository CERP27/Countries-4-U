const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activity', {
    id:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dificulty:{
      type:DataTypes.ENUM,
      values:['1','2','3','4','5'],
      allowNull:false
    },
    duration:{
      type:DataTypes.STRING,
    },
    season:{
      type:DataTypes.ENUM,
      values:['Summer','Fall','Winter','Spring'],
      allowNull:false
    }
  },{
    timestamps:false,
    freezeTableName:true
  });
};