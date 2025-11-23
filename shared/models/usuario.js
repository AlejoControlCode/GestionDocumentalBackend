const {DataTypes} = require('sequelize');
const {sequelize} = require('../../Config/database');

const User = sequelize.define('User',{
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   NombreUsuario: {type: DataTypes.STRING, allowNull: false}, 
   Correo: {type: DataTypes.STRING, allowNull: false, unique: true},
    Contrasena: {type: DataTypes.STRING, allowNull: false},
    Sexo: {type: DataTypes.STRING, allowNull: true},
});

module.exports = User;