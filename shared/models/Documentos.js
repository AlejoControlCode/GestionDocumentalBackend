const { DataTypes } = require('sequelize');
const { sequelize } = require('../../Config/database');

const Documentos = sequelize.define('Documentos', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    NombreDocumento: { type: DataTypes.STRING, allowNull: false },
    Labels: { type: DataTypes.STRING, allowNull: true },
    FechaDocumento: { type: DataTypes.DATE, allowNull: false },
    Autor: { type: DataTypes.STRING, allowNull: false },
    Categoria: { type: DataTypes.STRING, allowNull: true },
    RutaArchivoNube: { type: DataTypes.STRING, allowNull: false },

});

module.exports = Documentos;
