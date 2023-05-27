module.exports = function(sequelize,DataTypes){
  let alias = "product";


let cols={
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  descripcion: {
    type: DataTypes.STRING,
   
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
  },
   color:{
    type: DataTypes.STRING,
   },
  categoria: {
    type: DataTypes.INTEGER,
    
  },
  
}
  let config = {
    tableName:"products",
    timestamps:false
  }


let productosBicicleta=sequelize.define(alias,cols,config);
/* productosBicicleta.associte = function(models){
  productosBicicleta.belongsTo(models.usuarioS,{
    as:"users",
    foreignKey:"genre_id"
  });
  productosBicicleta.belongsToMany(models.usuarioS,{
    as:"users",
    foreignKey:"users_id",
    timestamps:false
  });
} */
return productosBicicleta;
}
 