/**
* Controlador de operaciones para usuarios
* @module api/user/user-controller
*/
import Usuario from '../../model/user-model.mjs'
import Coleccion from '../../model/coleccion-model.mjs'
import Grupo from '../../model/grupo-model.mjs'
import Video from '../../model/video-model.mjs'

/**
* Obtener listado de todo los usuarios
* @param {Object} req - Petición (request) recibida por http
* @param {Object} res - Respuesta (response) a enviar por http
* @returns Lista de usuarios en la base de datos
*/
export function index(req, res){
    Usuario.find().sort([
        ['admin', 'descending'], 
        ['operation.create', 'descending'], 
        ['operation.update', 'descending'],
        ['operation.delete', 'descending'],
        ['active', 'descending'],
    ])
    .exec((err, usuarios) => {
        if(err)
            return res.status(500).json({message: err});
        return res.status(200).json({usuarios: usuarios});
    });
}

/**
 * Obtiene la información de un usario mediante su id
 * @param {Object} req - Petición (request) recibida por http con id del usuario
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns Objeto con todas las propiedas del usuario
 */
export function show(req, res){
    Usuario.findOne({_id: req.params.id}, (error, usuario) => {
        if(error)
            return res.status(500).json({message: error})
        if(!usuario)
            return res.status(400).json({message: 'El usuario no existe'})
        return res.status(200).json({usuario: usuario, message: 'Usuario obtenido correctamente'})
    })
}

/**
 * Actualiza la información de un usuario
 * @param {Object} req - Petición (request) recibida por http con los datos de usuario a actualizar
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns Mensaje de confirmación en actualización o mensaje de error
 */
export function update(req, res){
    if(!req.body.usuario)
        return res.status(400).json({message: 'No hay información de usuario. Verificar \'request.body.usuario\''})
    if(!req.body.usuario._id || !req.body.usuario.username || !req.body.usuario.fullname || !req.body.usuario.operation)
        return res.status(400).json({message: 'Información de usuario incompleta. Verificar propiedades \'_id\', \'username\', \'fullname\' y \'operation\''})

    // Listar manualmente los cambios a usuario (esto evita revelar, borrar y/o sobreescribir contraseña)
    const updateQuery = {
        '$set': {
            username: req.body.usuario.username,
            fullname: req.body.usuario.fullname,
            email: req.body.usuario.email || '',
            operation: {
                create: req.body.usuario.operation.create || true,
                update: req.body.usuario.operation.update || false,
                delete: req.body.usuario.operation.delete || false,
            },
            admin: req.body.usuario.admin || false,
            active: req.body.usuario.active || true,
        }
    };

    Usuario.findByIdAndUpdate({_id: req.body.usuario._id}, updateQuery, (error, usuario) => {
        if(error){
            return res.status(500).json({message: error})
        }
        if(!usuario){
            return res.status(400).json({message: `No hay registro del usuario con id ${req.body.usuario._id}`});
        }
        return res.status(200).json({message: 'Usuario actualizado correctamente'})
    })
}

/**
 * Elimina un usuario de la base de datos
 * @param {Object} req - Petición (request) recibida por http con id del usuario a eliminar
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns Mensaje de confirmación al eliminar o mensaje de error
 */
export function remove(req, res){
    // TODO @RodrigoRoy Solamente usuarios con permisos suficientes pueden borrar
    Usuario.findByIdAndDelete({_id: req.params.id}, (error, usuario) => {
        if(error){
            return res.status(500).json({message: error});
        }
        if(!usuario){
            return res.status(400).json({message: `El registro con id ${req.params.id} no existe`});
        }
        return res.status(200).json({message: `Usuario ${usuario.username} borrado`});
    });
}

/**
* Obtener listado de las colecciones, grupos y videos de un usuario
* @param {Object} req - Petición (request) recibida por http
* @param {Object} res - Respuesta (response) a enviar por http
* @returns Lista de colecciones, grupos y videos de un usuario
*/
export function indexData(req, res){
    Usuario.findOne({_id: req.params.id}, async (error, usuario) => {
        if(error)
            return res.status(500).json({message: error})
        if(!usuario)
            return res.status(400).json({message: 'El usuario no existe'})
        
        // Arreglo para almacenar datos de colecciones, grupos y videos
        let data = []

        // Obtención de colecciones por usuario
        await Coleccion.find({'adicional.user.0': req.params.id}, (error, docs) => {
            if(error)
                return res.status(500).json({message: error})

            docs.forEach(coleccion => {
                let copyColeccion = {
                    _id: coleccion._id,
                    titulo: coleccion.identificacion.titulo,
                    tipo: 'Colección',
                    codigo: coleccion.identificacion.codigoReferencia,
                    fecha: coleccion.createdAt,
                    update: coleccion.updatedAt
                }
                data.push(copyColeccion)
            })
        }).lean()

        // Obtención de grupos por usuario
        await Grupo.find({'adicional.user.0': req.params.id}, (error, docs) => {
            if(error)
                return res.status(500).json({message: error})

            docs.forEach(grupo => {
                let copyGrupo = {
                    _id: grupo._id,
                    titulo: grupo.identificacion.titulo,
                    tipo: 'Grupo',
                    codigo: grupo.identificacion.codigoReferencia,
                    fecha: grupo.createdAt,
                    update: grupo.updatedAt
                }
                data.push(copyGrupo)
            })
        }).lean()

        // Obtención de videos por usuario
        await Video.find({'adicional.user.0': req.params.id}, (error, docs) => {
            if(error)
                return res.status(500).json({message: error})

            docs.forEach(video => {
                let copyVideo = {
                    _id: video._id,
                    titulo: video.identificacion.codigoReferencia,
                    tipo: 'Video',
                    codigo: video.identificacion.codigoReferencia,
                    fecha: video.createdAt,
                    update: video.updatedAt
                }
                data.push(copyVideo)
            })
        }).lean()
        
        return res.status(200).json({data: data, message: 'Datos obtenidos correctamente'})

    })
}