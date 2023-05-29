module.exports = function(sequelize,DataTypes){
    let alias = "productosUsuario";
  
  
  let cols={
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    usuarios_id: {
      type: DataTypes.INTEGER,
    },
    productos_id: {
      type: DataTypes.INTEGER,
     
    },
     product_producto_id:{
      type: DataTypes.INTEGER,
     },  
  }
    let config = {
      tableName:"productosUsuarios",
      timestamps:false
    }

    let productosYusuario=sequelize.define(alias,cols,config);
    return productosYusuario
}