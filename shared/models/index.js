const {sequelize} = require('../../Config/database');
const Documentos = require('./Documentos');
const usuario = require('./usuario');

const synCmodels = async () => {
    try{
        await sequelize.sync({alter:true});
        console.log('Modelos sincronizados con la base de datos');
    }catch(error){
        console.error('Error al sincronizar los modelos con la base de datos:', error);
    }
}

module.exports = {
    Documentos, 
    synCmodels,
    usuario
}