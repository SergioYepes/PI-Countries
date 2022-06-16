const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:"Other"
    }, 
    id:{
      type:DataTypes.STRING(3),
      allowNull: false, 
      primaryKey: true,
     },
      
    Nombre:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:"Other",
       },
    Image:{
        type: DataTypes.STRING ,
        allowNull: false,
        defaultValue:"Other",
      },
      Flag:{
        type: DataTypes.STRING,allowNull: false,defaultValue:"Other",
      },
     
       Continent:{
         type: DataTypes.STRING,allowNull: false,defaultValue:"Other",
       },
       SubRegion:{
         type: DataTypes.STRING
       },
       Capital:{
        type: DataTypes.STRING,allowNull: false,defaultValue:"Other",
       },
       Area:{
         type: DataTypes.FLOAT
       },
       Poblacion:{
         type: DataTypes.INTEGER
       }
      
}, {timestamps:false});
};
