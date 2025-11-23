const express = require('express'); 4
require('dotenv').config();
const { corsMiddleware } = require('./shared/middleware/cors');
const { testConexion } = require('./Config/database');
const {synCmodels} = require ('./shared/models/index')

const app = express();

const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(corsMiddleware);

app.get("/", (req, res) => {
    res.json({
        message: "Api corriendo",
        status: "success",
        timestamp: new Date().toISOString()
    })
});

const initialzaDatabase = async () => {
    await testConexion()
    await synCmodels()

}





app.listen(PORT, () => {
    console.log(` 🚀esta vaina esta corriendo en http://localhost:${PORT}`);
});


app.use('/api/documentos', require('./routes/RoutesDocumentos'));


app.use('/api/loggin', require('./routes/auth'));


const StarServer = async () => {

    try {
        await initialzaDatabase();
        app.listen(PORT, () => {
            console.log(` 🚀esta vaina esta corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }

}



StarServer()