module.exports = function(sequelize,DataTypes){
    let alias = "jerarquias";
  
  
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
    }
  }
    let config = {
      tableName:"jerarquias",
      timestamps:false
    }

    let jerarquias=sequelize.define(alias,cols,config);
    return jerarquias
}