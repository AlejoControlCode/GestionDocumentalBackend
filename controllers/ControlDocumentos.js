const Documentos = require('../shared/models/Documentos');
const fs = require('fs');
const path = require('path');

const ListarDocumentos = async (req, res) => {
  try {
    const { Categoria } = req.params; 
   
    if (!Categoria) {
      return res.status(400).json({ 
        error: 'Debe especificar una categoría' 
      });
    }
    
    const documentos = await Documentos.findAll({
      where: { Categoria } 
    });
    
    console.log(`Documentos encontrados en categoría ${Categoria}:`, documentos.length);
    
    res.status(200).json(documentos);
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    res.status(500).json({ 
      error: 'Error al obtener los documentos',
      details: error.message 
    });
  }
}

const ListarTodoslosDocumentos = async (req, res) => {
  try {
    const documentos = await Documentos.findAll();
    res.status(200).json(documentos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los documentos' });
  }
}


const GuardarDocumentos = async (req, res) => {
  try {
    const localPath = req.file?.path;
    const { NombreDocumento, Labels, FechaDocumento, Autor, Categoria } = req.body;

    if (!localPath) {
      return res.status(400).json({ error: "No se recibió ningún archivo PDF" });
    }


    const documentosDir = path.join(__dirname, '../documentos');
    if (!fs.existsSync(documentosDir)) {
      fs.mkdirSync(documentosDir, { recursive: true });
    }


    const destinoPath = path.join(documentosDir, req.file.originalname);

    fs.renameSync(localPath, destinoPath);

    const nuevoDocumento = await Documentos.create({
      NombreDocumento,
      Labels,
      FechaDocumento,
      Autor,
      Categoria,
      RutaArchivoNube: destinoPath
    });

    res.status(201).json({
      message: "📄 Documento guardado exitosamente en local",
      status: "success",
      documentoAgregado: nuevoDocumento
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al guardar el documento", error: error.message });
  }
};
const DescargarDocumento = async (req, res) => {
  try {
    const { id } = req.params;
    const documento = await Documentos.findByPk(id);
    if (!documento) {
      return res.status(404).json({ error: 'Documento no encontrado' });
    }
    const filePath = documento.RutaArchivoNube;
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Archivo no encontrado en el servidor' });
    }
    res.download(filePath, documento.NombreDocumento + '.pdf', (err) => {
      if (err) {
        console.error('Error al descargar el archivo:', err);
        res.status(500).json({ error: 'Error al descargar el archivo' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al descargar el documento' });
  }
}

const EliminarDocumento = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Buscar el documento
    const documento = await Documentos.findByPk(id);
    if (!documento) {
      return res.status(404).json({ error: 'Documento no encontrado' });
    }

    // Construir la ruta absoluta del archivo
    const filePath = path.join(__dirname, '..', documento.RutaArchivoNube);
    
    // Eliminar el archivo físico si existe
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Archivo eliminado: ${filePath}`);
    } else {
      console.warn(`Archivo no encontrado en: ${filePath}`);
    }

    // Eliminar el registro de la base de datos
    await documento.destroy();
    
    res.status(200).json({ 
      message: 'Documento eliminado exitosamente',
      id: id 
    });
  } catch (error) {
    console.error('Error al eliminar documento:', error);
    res.status(500).json({ 
      error: 'Error al eliminar el documento',
      details: error.message 
    });
  }
};


module.exports = {
  ListarDocumentos,
  GuardarDocumentos,
  DescargarDocumento,
  ListarTodoslosDocumentos,
  EliminarDocumento
}
