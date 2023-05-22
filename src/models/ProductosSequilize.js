const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); 

const productosBicicletas = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
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
   categoria:{
    type: DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true,
    
  },
});
 module.exports = productosBicicletas