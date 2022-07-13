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

        // Renombre de archivos usando código de referencia. Ejemplo: Foo.mp4 -> MXIM-AV-2-67.mp4
        const oldPath = req.file.path; // file.destination + file.filename
        const fileExtension = (req.file.originalname.match(/\.(.+)$/i))[1]; // caracteres finales después de punto (.) final
        const newPath = `${req.file.destination}/${req.body.codigoReferencia}.${fileExtension}`; // nuevo nombre de archivo
        try {
            fs.renameSync(oldPath, newPath); // usar método síncrono para resolver errores adecuadamente
        } catch (error) {
            return res.status(501).json({ message: 'No se pudo renombrar el archivo'});
        }

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

        // Renombre de archivos usando código de referencia. Ejemplo: Foo.jpg -> MXIM-AV-2-67.jpg
        const oldPath = req.file.path; // file.destination + file.filename
        const fileExtension = (req.file.originalname.match(/\.(.+)$/i))[1]; // caracteres finales después de punto (.) final
        const newPath = `${req.file.destination}/${req.body.codigoReferencia}.${fileExtension}`; // nuevo nombre de archivo
        try {
            fs.renameSync(oldPath, newPath); // usar método síncrono para resolver errores adecuadamente
        } catch (error) {
            return res.status(501).json({ message: 'No se pudo renombrar el archivo'});
        }

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
        
        // Renombre de archivos usando código de referencia. Ejemplo: Foo.pdf -> MXIM-AV-2-67.pdf
        const oldPath = req.file.path; // file.destination + file.filename
        const fileExtension = (req.file.originalname.match(/\.(.+)$/i))[1]; // caracteres finales después de punto (.) final
        const newPath = `${req.file.destination}/${req.body.codigoReferencia}.${fileExtension}`; // nuevo nombre de archivo
        try {
            fs.renameSync(oldPath, newPath); // usar método síncrono para resolver errores adecuadamente
        } catch (error) {
            return res.status(501).json({ message: 'No se pudo renombrar el archivo'});
        }

        return res.status(200).json({ file: req.file, message: 'Documento subido correctamente'});
    });
}