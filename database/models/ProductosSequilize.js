module.exports = function(sequelize,DataTypes){
  let alias = "product";


let cols={
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
   color:{
    type: DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true,
   },
   imagen: {
    type: DataTypes.STRING,
    allowNull: true
  },
    marca:{
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true,
  },
  
}
  let config = {
    tableName:"product",
    timestamps:false
  }


let productosBicicleta=sequelize.define(alias,cols,config);
productosBicicleta.associte = function(models){
  productosBicicleta.belongsTo(models.usuarioS,{
    as:"users",
    foreignKey:"genre_id"
  });
  productosBicicleta.belongsToMany(models.usuarioS,{
    as:"users",
    foreignKey:"users_id",
    timestamps:false
  });
}
return productosBicicleta;
}
 