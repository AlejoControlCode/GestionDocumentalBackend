const express = require('express');
const upload = require('../Config/multer'); 
const { ListarDocumentos,GuardarDocumentos,DescargarDocumento,ListarTodoslosDocumentos, EliminarDocumento } = require('../controllers/ControlDocumentos');

const router = express.Router();





router.get('/ruoutesDocumentos/listarDocumentos/:Categoria', ListarDocumentos);
router.post('/ruoutesDocumentos/GuardarDocumentos', upload.single('file'), GuardarDocumentos);
router.get('/ruoutesDocumentos/DescargarDocumento/:id', DescargarDocumento);
router.get('/ruoutesDocumentos/ListarTodoslosDocumentos', ListarTodoslosDocumentos);
router.delete('/ruoutesDocumentos/eliminarDocumento/:id', EliminarDocumento);


module.exports = router;