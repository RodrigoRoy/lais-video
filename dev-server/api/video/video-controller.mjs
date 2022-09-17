import Video from '../../model/video-model.mjs';
import Grupo from '../../model/grupo-model.mjs'
import Coleccion from '../../model/coleccion-model.mjs';

/**
 * Regresa un listado de todos los videos.
 * @param {Object} req - Petición (request) recibida por http
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con un listado de todos los videos en la base de datos.
 */
export function index(req, res){
  Video.find({}, (error, videos) => {
    if(error){
      return res.status(500).json({message: error});
    }
    return res.status(200).json({videos: videos, message: "Operación exitosa"});
  })
  .sort({createdAt: -1});
}

/**
 * Crea un nuevo video. Se asume que la información en petición es correcta
 * @param {Object} req - Petición (request) recibida por http que incluye toda la información necesaria de un video.
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con el id del nuevo video creado.
 */
export function create(req, res){
  const video = new Video(req.body.video);

  video.save(error => {
    if(error){
      return res.status(500).json({message: error});
    }
    return res.status(201).json({id: video._id, message: `Registro ${video.identificacion.codigoReferencia} creado`});
  });
}

/**
 * Actualiza un video específico de la base de datos.
 * @param {Object} req - Petición (request) recibida por http que incluye la nueva información a actualizar.
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con un mensaje de error éxito.
 */
export function update(req, res){
  const video = new Video(req.body.video);
  // findByIdAndUpdate() requiere que el segundo parámetro incluya $set. Alternativamente usar opción "overwrite"
  // Video.findOneAndReplace({_id: video._id}, video, error => {
  Video.findByIdAndUpdate({_id: video._id}, video, {overwrite: true}, (error, document) => {
    if(error){
      return res.status(500).json({message: error})
    }
    if(!video.identificacion.codigoReferencia){
      return res.status(400).json({message: 'Registro de video vacio. Verificar propiedades \'video\', \'video._id\', \'video.identificacion.codigoReferencia\''});
    }
    if(!document){
      return res.status(400).json({message: `El registro con id ${video._id} no existe`});
    }
    return res.status(200).json({id: video._id, message: `Registro ${video.identificacion.codigoReferencia} actualizado`})
  });
}

/**
 * Elimina un video de la base de datos.
 * @param {Object} req - Petición (request) recibida por http que incluye el id del video a eliminar
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con un mensaje de error o éxito de eliminación.
 */
export function remove(req, res){
  Video.findByIdAndDelete({_id: req.params.id}, (error, video) => {
    if(error){
      return res.status(500).json({message: error});
    }
    if(!video){
      return res.status(400).json({message: `El registro con id ${req.params.id} no existe`});
    }
    return res.status(200).json({message: `Registro ${video.identificacion.codigoReferencia} borrado`});
  });
}

/**
 * Regresa un video específico de la base de datos.
 * @param {Object} req - Petición (request) recibida por http que incluye el id del video a consultar.
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con toda la información del video.
 */
export function show(req, res){
  Video.findOne({_id: req.params.id}, (error, video) => {
    if(error){
      return res.status(500).json({message: 'Error de petición. URL incorrecta'});
    }
    if(!video){
      return res.status(400).json({message: 'Error de la base de datos'});
    }
    return res.status(200).json({video: video, message: "Registro obtenido correctamente"});
  })
}

/**
 * Regresa un listado de los videos contenidos en otro grupo específica.
 * La petición debe incluir query URL:
 * 'from' - ID de origen (string)
 * Ejemplo: GET video/filter?from=123456789
 * @param {Object} req - Petición (request) recibida por http
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con un listado de los videos con el mismo id del grupo solicitado
 */
 export function filter(req, res){
  if(!req.query.from) // no proceder si faltan URL queries
    return res.status(400).json({message: 'Falta URL query from: usar ?from=<groupId>'});
  // crear Query de Mongoose según los parámetros en URL
  const myQuery = {'adicional.grupo': req.query.from};
  Video.find(myQuery, (error, videos) => {
    if(error){
      return res.status(500).json({message: error});
    }
    return res.status(200).json({videos: videos});
  })
  .sort({createdAt: -1});
}

/**
 * Obtiene el breadcrumbs de un video.
 * @param {Object} req - Petición (request) recibida por http que incluye el id del video a eliminar
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con un mensaje de error o éxito de eliminación.
 */
 export async function getBreadcrumbs(req, res){

  // Arreglo de respuesta
  let breadcrumbsArray = []

  // Se obtiene el video
  let videoObtenido = null
  await Video.findOne({_id: req.params.id}, (error, video) => {
    if(error){
      return res.status(500).json({message: 'Error de petición. URL incorrecta'});
    }
    if(!video){
      return res.status(400).json({message: 'Error de la base de datos'});
    }
    videoObtenido = video
  }).lean()

  breadcrumbsArray.push({
    text: videoObtenido.identificacion.codigoReferencia,
    disabled: true,
    href: `/video/${videoObtenido._id}`
  })

  // Se obtiene el grupo padre del video
  let grupoColeccionObtenido = {...videoObtenido}

  while(grupoColeccionObtenido.adicional.grupo){
    await Grupo.findOne({_id: grupoColeccionObtenido.adicional.grupo.toString()}, (error, grupo) => {
      if(error){
        return res.status(500).json({message: error});
      }
      if(!grupo){
        return res.status(400).json({message: `No hay registro del grupo con id ${req.params.id}`});
      }
      grupoColeccionObtenido = grupo
      breadcrumbsArray.push({
        text: grupo.identificacion.codigoReferencia,
        disabled: false,
        href: `/${grupo._id.toString() === videoObtenido.adicional.grupo.toString() ? 'video' : 'grupo' }?from=${grupoColeccionObtenido._id}&type=group`
      })
    }).lean()
  }

  // Se obtiene la coleccion

  await Coleccion.findOne({_id: grupoColeccionObtenido.adicional.coleccion}, (error, coleccion) => {
    if(error){
      return res.status(500).json({message: 'Error de petición. URL incorrecta'});
    }
    if(!coleccion){
      return res.status(400).json({message: 'Error de la base de datos'});
    }

    breadcrumbsArray.push({
      text: coleccion.identificacion.codigoReferencia,
      disabled: false,
      href: `/grupo?from=${coleccion._id}&type=collection`
    })
  }).lean()

  breadcrumbsArray.push({
    text: 'Inicio',
    disabled: false,
    href: `/coleccion`
  })

  return res.status(200).json({breadcrumbs: breadcrumbsArray.reverse()})
}