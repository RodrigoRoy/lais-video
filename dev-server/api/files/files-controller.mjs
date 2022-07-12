import multer from 'multer' // middleware para subir archivos
import * as fs from 'fs' // biblioteca para manejo de archivos en sistema (filesystem)

/**
 * Sube al servidor un archivo de video
 * @param {Object} req - Petición (request) recibida por http
 * @param {Object} res - Respuesta (response) a enviar por http
 */
 export function uploadVideo(req, res){
    const uploadDir = 'public/files/video'; // ubicación para subir archivo
    // verificar que la ubicación exista, de lo contrario, crearla
    if(!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir, {recursive: true})
    }

    // configuración de ruta de archivos subidos y renombramiento de archivos
    const storage = multer.diskStorage({
        destination: function(req, res, cb){
            cb(null, uploadDir)
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname) // conservar nombre y extensión original del archivo
        }
    });
    // configuración de limites en cantidad y peso de archivos subidos
    const limits = {
        fileSize: 1024*1024*100, // tamaño máximo de archivo, 100MB
        files: 1, // máxima cantidad de campos que son archivos
        fields: 7, // máxima cantidad de campos de texto (no-archivos)
        parts: 8 // máxima cantidad de campos (archivos + no-archivos)
    };
    // configuración de aceptación por tipo de archivo
    const fileFilter = function(req, file, cb){
        if(/video.*/.test(file.mimetype)){ // regex para aceptar solo videos
            cb(null, true);
        }
        else{ // error personalizado cuando no se trata de un archivo de video
            const error = new multer.MulterError();
            error.message = 'Mimetype not accepted by fileFilter';
            error.code = 'INCORRECT_FILETYPE';
            cb(error);
        }
    };
    // 'video' debe coincider con el nombre en formData.append('video', videoFile) desde formulario front-end
    const upload = multer({ storage: storage, limits: limits, fileFilter: fileFilter}).single('video');

    // subida auto-mágica de archivos con Multer
    upload(req, res, function(err){
        // errores de Multer
        if (err instanceof multer.MulterError){
            if(err.code === 'LIMIT_FILE_SIZE')
                return res.status(413).json({ message: 'El archivo pesa demasiado'});
            if(err.code === 'INCORRECT_FILETYPE')
                return res.status(415).json({ message: 'El archivo no es un video'});
            return res.status(400).json({ message: 'No se pudo procesar el archivo enviado'});
        }
        // cualquier otro error
        if (err){
            return res.status(500).json({ message: 'Error al subir el archivo'});
        }
        // código cuando no hay error:
        // Post-procesamiento del archivo, por ejemplo, renombrar y crear versiones de baja resolución
        
        // @TODO EmmanuelCruz Renombrar archivo de video. Ejemplo: Foo.mp4 -> MXIM-AV-2-67.mp4
        // Recordar que req.file y req.body contienen información del archivo y campos de texto adicionales
        // Información necesaria para renombrar. Nombre con el que se almacena y nuevo nombre (codigo de referencia)
        const bodyObject = JSON.parse(JSON.stringify(req.body))
        const destination = `${req.file.destination}/${req.file.filename}`
        const extension = req.file.mimetype // Extension del archivo
        const newName = `${req.file.destination}/${bodyObject.codigoReferencia}.${extension.substring(extension.length-3)}`

        // Renombre de archivos
        renameFile(destination, newName)

        return res.status(200).json({ file: req.file, message: 'Video subido correctamente'});
    });
}

/**
 * Sube al servidor un archivo de imagen
 * @param {Object} req - Petición (request) recibida por http
 * @param {Object} res - Respuesta (response) a enviar por http
 */
export function uploadImage(req, res){
    const uploadDir = 'public/files/image'; // ubicación para subir archivo
    // verificar que la ubicación exista, de lo contrario, crearla
    if(!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir, {recursive: true})
    }

    // configuración de ruta de archivos subidos y renombramiento de archivos
    const storage = multer.diskStorage({
        destination: function(req, res, cb){
            cb(null, uploadDir)
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname) // conservar nombre y extensión original del archivo
        }
    });
    // configuración de limites en cantidad y peso de archivos subidos
    const limits = {
        fileSize: 1024*1024*10, // tamaño máximo de archivo, 10MB
        files: 1, // máxima cantidad de campos que son archivos
        fields: 7, // máxima cantidad de campos de texto (no-archivos)
        parts: 8 // máxima cantidad de campos (archivos + no-archivos)
    };
    // configuración de aceptación por tipo de archivo
    const fileFilter = function(req, file, cb){
        if(/image.*/.test(file.mimetype)){ // regex para aceptar solo imagen
            cb(null, true);
        }
        else{ // error personalizado cuando no se trata de un archivo de imagen
            const error = new multer.MulterError();
            error.message = 'Mimetype not accepted by fileFilter';
            error.code = 'INCORRECT_FILETYPE';
            cb(error);
        }
    };
    // 'image' debe coincider con el nombre en formData.append('image', imageFile) desde formulario front-end
    const upload = multer({ storage: storage, limits: limits, fileFilter: fileFilter}).single('image');

    // subida auto-mágica de archivos con Multer
    upload(req, res, function(err){
        // errores de Multer
        if (err instanceof multer.MulterError){
            if(err.code === 'LIMIT_FILE_SIZE')
                return res.status(413).json({ message: 'El archivo pesa demasiado'});
            if(err.code === 'INCORRECT_FILETYPE')
                return res.status(415).json({ message: 'El archivo no es una imagen'});
            return res.status(400).json({ message: 'No se pudo procesar el archivo enviado'});
        }
        // cualquier otro error
        if (err){
            return res.status(500).json({ message: 'Error al subir el archivo'});
        }
        // código cuando no hay error:
        // @TODO EmmanuelCruz Renombrar archivo de imagen. Ejemplo: Foo.jpg -> MXIM-AV-2-67.jpg
        // Recordar que req.file y req.body contienen información del archivo y campos de texto adicionales
        // Información necesaria para renombrar. Nombre con el que se almacena y nuevo nombre (codigo de referencia)
        const bodyObject = JSON.parse(JSON.stringify(req.body))
        const destination = `${req.file.destination}/${req.file.filename}`
        const extension = req.file.mimetype // Extension del archivo
        const newName = `${req.file.destination}/${bodyObject.codigoReferencia}.${extension.substring(extension.length-3)}`

        // Renombre de archivos
        renameFile(destination, newName)

        return res.status(200).json({ file: req.file, message: 'Imagen subida correctamente'});
    });
}

/**
 * Sube al servidor un documento de texto (pdf)
 * @param {Object} req - Petición (request) recibida por http
 * @param {Object} res - Respuesta (response) a enviar por http
 */
 export function uploadDocument(req, res){
    const uploadDir = 'public/files/docs'; // ubicación para subir archivo
    // verificar que la ubicación exista, de lo contrario, crearla
    if(!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir, {recursive: true})
    }

    // configuración de ruta de archivos subidos y renombramiento de archivos
    const storage = multer.diskStorage({
        destination: function(req, res, cb){
            cb(null, uploadDir)
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname) // conservar nombre y extensión original del archivo
        }
    });
    // configuración de limites en cantidad y peso de archivos subidos
    const limits = {
        fileSize: 1024*1024*10, // tamaño máximo de archivo, 10MB
        files: 1, // máxima cantidad de campos que son archivos
        fields: 7, // máxima cantidad de campos de texto (no-archivos)
        parts: 8 // máxima cantidad de campos (archivos + no-archivos)
    };
    // configuración de aceptación por tipo de archivo
    const fileFilter = function(req, file, cb){
        if(/.*pdf/.test(file.mimetype)){ // regex para aceptar solo documentos de texto (pdf)
            cb(null, true);
        }
        else{ // error personalizado cuando no se trata de un documento de texto (pdf)
            const error = new multer.MulterError();
            error.message = 'Mimetype not accepted by fileFilter';
            error.code = 'INCORRECT_FILETYPE';
            cb(error);
        }
    };
    // 'document' debe coincider con el nombre en formData.append('document', documentFile) desde formulario front-end
    const upload = multer({ storage: storage, limits: limits, fileFilter: fileFilter}).single('document');

    // subida auto-mágica de archivos con Multer
    upload(req, res, function(err){
        // errores de Multer
        if (err instanceof multer.MulterError){
            if(err.code === 'LIMIT_FILE_SIZE')
                return res.status(413).json({ message: 'El archivo pesa demasiado'});
            if(err.code === 'INCORRECT_FILETYPE')
                return res.status(415).json({ message: 'El archivo no es un documento de texto (pdf)'});
            return res.status(400).json({ message: 'No se pudo procesar el archivo enviado'});
        }
        // cualquier otro error
        if (err){
            return res.status(500).json({ message: 'Error al subir el archivo'});
        }
        // código cuando no hay error:
        // @TODO EmmanuelCruz Renombrar documento de texto. Ejemplo: Foo.pdf -> MXIM-AV-2-67.pdf
        // Recordar que req.file y req.body contienen información del archivo y campos de texto adicionales
        // Información necesaria para renombrar. Nombre con el que se almacena y nuevo nombre (codigo de referencia)
        const bodyObject = JSON.parse(JSON.stringify(req.body))
        const destination = `${req.file.destination}/${req.file.filename}`
        const extension = req.file.mimetype // Extension del archivo
        const newName = `${req.file.destination}/${bodyObject.codigoReferencia}.${extension.substring(extension.length-3)}`

        // Renombre de archivos
        renameFile(destination, newName)
        return res.status(200).json({ file: req.file, message: 'Documento subido correctamente'});
    });
}

/**
 * Renombra un archivo.
 * @param {string} oldName path que hace referencia al archivo almacenado
 * @param {string} newName path con el nuevo nombre con el que se va a reeamplazar (renombrar) el archivo
 */
function renameFile(oldName, newName) {
    fs.rename(oldName, newName, err => {
        if(err) throw err;
    })
}