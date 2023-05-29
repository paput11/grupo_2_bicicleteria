module.exports = function(sequelize,DataTypes){
    let alias = "categorias";
  
  
  let cols={
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tipo: {
      type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.STRING,
    }
  }
    let config = {
      tableName:"categorias",
      timestamps:false
    }

    let categorias=sequelize.define(alias,cols,config);
    return categorias
}