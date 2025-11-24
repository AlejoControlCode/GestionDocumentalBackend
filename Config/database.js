const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.MYSQLDATABASE="railway",
    process.env.MYSQLUSER,
    process.env.MYSQLPASSWORD,
    {
        host: process.env.MYSQLHOST,
        port: process.env.MYSQLPORT,
        dialect: 'mysql',
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

const testConexion = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexion exitosa a la base de datos');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
}

module.exports = {
    sequelize,
    testConexion
};