module.exports = function(sequelize,DataTypes){
  let alias = "users";


let cols={
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false
  }
}
  let config = {
    tableName:"users",
    timestamps:false
  }


let usuarioS=sequelize.define(alias,cols,config);
usuarioS.associte = function(models){
  usuarioS.belongsTo(models.usuarios,{
    as:"product",
    foreignKey:"productId",
    timestamps:false
  });
return usuarios;
}
}
