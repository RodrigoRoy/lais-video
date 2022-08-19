import Grupo from '../../model/grupo-model.mjs';
import Coleccion from '../../model/coleccion-model.mjs';
import Video from '../../model/video-model.mjs';

// import * as auth from '../../services/auth-service';

/**
 * Regresa un listado de todas los Grupos.
 * @param {Object} req - Petición (request) recibida por http
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con un listado de todas las grupos en la base de datos.
 */
export function index(req, res){
  Grupo.find({}, (error, grupos) => {
    if(error){
      return res.status(500).json({message: error});
    }
    return res.status(200).json({grupos: grupos});
  })
  .sort({createdAt: -1});
}

/**
 * Crea un nuevo grupo.
 * @param {Object} req - Petición (request) recibida por http que incluye toda la información necesaria 
 * de un grupo.
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con el id del nuevo grupo
 */
export function create(req, res){
  // TODO @RodrigoRoy Verificar permisos de usuario y agregar autoria de usuario
  // Create collection
  // const id = auth.getUserId(req);
  // Grupo.findOne({_id: id}, (error, user) => {
  //   if(error && !user){
  //     return res.status(500).json();
  //   }
  //   const Grupo = new Grupo(req.body.collection);
  //   Grupo.author = user._id;

  //   Grupo.save(error => {
  //     if(error){
  //       return res.status(500).json();
  //     }
  //     return res.status(201).json({id: Grupo._id});
  //   });
  // });

  const grupo = new Grupo(req.body.grupo);
  grupo.save(error => {
    if(error){
      return res.status(500).json({message: error});
    }
    return res.status(201).json({id: grupo._id, message: `Registro ${grupo.identificacion.codigoReferencia} creado`});
  });
}

/**
 * Actualiza un grupo específico de la base de datos.
 * @param {Object} req - Petición (request) recibida por http que incluye la nueva información a 
 * actualizar.
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con un mensaje de error o éxito
 */
export function update(req, res){
  // TODO @RodrigoRoy Verificar permisos y agregar id de autoria de usuario
  // Update a collection
  // const id = auth.getUserId(req);

  // User.findOne({_id: id}, (error, user) => {
  //   if(error){
  //     return res.status(500).json();
  //   }
  //   if(!user){
  //     return res.status(404).json();
  //   }

  //   const Grupo = new Grupo(req.body.Grupo);
  //   Grupo.author = user._id;
  //   Grupo.findByIdAndUpdate({_id: Grupo._id}, Grupo, error => {
  //     if(error){
  //       return res.status(500).json();
  //     }
  //     return res.status(200).json();
  //   });
  // });

  const grupo = new Grupo(req.body.grupo);
  // findByIdAndUpdate() requiere que el  segundo parámetro incluya $set. Alternativamente usar opción "overwrite"
  // Grupo.findOneAndReplace({_id: grupo._id}, grupo, error => {
  Grupo.findByIdAndUpdate({_id: grupo._id}, grupo, {overwrite: true}, (error, document) => {
    if(error){
      return res.status(500).json({message: error})
    }
    if(!grupo.identificacion.codigoReferencia){
      return res.status(400).json({message: 'Registro de grupo vacio. Verificar propiedades \'grupo\', \'grupo._id\', \'grupo.identificacion.codigoReferencia\''});
    }
    if(!document){
      return res.status(400).json({message: `El registro con id ${grupo._id} no existe`});
    }
    return res.status(200).json({id: grupo._id, message: `Registro ${grupo.identificacion.codigoReferencia} actualizado`})
  });
}

/**
 * Elimina un grupo de la base de datos.
 * @param {Object} req - Petición (request) recibida por http que incluye el id del grupo a eliminar
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con un mensaje de error o éxito de eliminación
 */
export function remove(req, res){
    // TODO @RodrigoRoy Verificar permisos y autoria del usuario
    // const id = auth.getUserId(req);
    // Grupo.findOne({_id: req.params.id}, (error, grupo) => {
    //     if(error){
    //         return res.status(500).json({message: error});
    //     }
    //     if(!grupo){
    //         return res.status(404).json({message: `No hay registro del grupo con id ${req.params.id}`});
    //     }
    //     if(grupo.author._id.toString() !== id){
    //         return res.status(403).json({message: 'Not allowed to delete another user\'s Grupo'});
    //     }
    //     grupo.deleteOne({_id: req.params.id}, error => {
    //         if(error){
    //             return res.status(500).json({message: error});
    //         }
    //         return res.status(200).json({message: `Registro ${grupo.identificacion.codigoReferencia} borrado`});
    //     });
    // });
    Grupo.findByIdAndDelete({_id: req.params.id}, (error, grupo) => {
        if(error){
            return res.status(500).json({message: error});
        }
        if(!grupo){
            return res.status(400).json({message: `El registro con id ${req.params.id} no existe`});
        }
        return res.status(200).json({message: `Registro ${grupo.identificacion.codigoReferencia} borrado`});
    });
}

/**
 * Regresa un grupo específica de la base de datos.
 * @param {Object} req - Petición (request) recibida por http que incluye el id del
 * grupo a consultar
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con toda la información del grupo
 */
export function show(req, res){
  Grupo.findOne({_id: req.params.id}, (error, grupo) => {
    if(error){
      return res.status(500).json({message: error});
    }
    if(!grupo){
      return res.status(400).json({message: `No hay registro del grupo con id ${req.params.id}`});
    }
    return res.status(200).json({grupo: grupo, message: 'Registro obtenido correctamente'});
  })
}

/**
 * Regresa un listado de los grupos contenidos en otro grupo o colección específica.
 * La petición debe incluir querys URL:
 * - 'from' - ID de origen (string)
 * - 'type' - tipo de documento ('collection' o 'group')
 * Ejemplo: GET grupo/filter?from=123456789&type=collection
 * @param {Object} req - Petición (request) recibida por http
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con un listado de los grupos con el mismo id del grupo o colección solicitada
 */
export function filter(req, res){
  if(!req.query.from || !req.query.type) // no proceder si faltan URL queries
    return res.status(400).json({message: 'Faltan URL queries: from, type'});
  // crear Query de Mongoose según los parámetros en URL
  const myQuery = req.query.type === 'collection' ? {'adicional.coleccion': req.query.from} : {'adicional.grupo': req.query.from};
  Grupo.find(myQuery, (error, grupos) => {
    if(error){
      return res.status(500).json({message: error});
    }
    return res.status(200).json({grupos: grupos});
  })
  .sort({createdAt: -1});
}

/**
 * Obtiene el breadcrumbs de un grupo.
 * @param {Object} req - Petición (request) recibida por http que incluye el id del video a eliminar
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con un mensaje de error o éxito de eliminación.
 */
 export async function getBreadcrumbs(req, res){

  // Arreglo de respuesta
  let breadcrumbsArray = []

  // Se obtiene el video
  let grupoObtenido = null
  await Grupo.findOne({_id: req.params.id}, (error, grupo) => {
    if(error){
      return res.status(500).json({message: 'Error de petición. URL incorrecta'});
    }
    if(!grupo){
      return res.status(400).json({message: 'Error de la base de datos'});
    }
    grupoObtenido = grupo
  }).lean()

  // Se obtienen los videos de la colección para saber si es un grupo de grupos o un grupo que contiene videos
  let videosDeGrupo = []
  const myQuery = {'adicional.grupo': req.params.id};
  await Video.find(myQuery, (error, videos) => {
    if(error){
      return res.status(500).json({message: error});
    }
    videosDeGrupo = videos
  })
  .sort({createdAt: -1});

  breadcrumbsArray.push({
    text: grupoObtenido.identificacion.codigoReferencia,
    disabled: true,
    href: `/${videosDeGrupo.length > 0 ? 'video' : 'grupo' }?from=${grupoObtenido._id}&type=group`
  })

  // Se obtiene el grupo padre o coleccion del grupo
  let grupoColeccionObtenido = {...grupoObtenido}

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
        href: `/grupo?from=${grupoColeccionObtenido._id}&type=group`
      })
    }).lean()
  }

  // Se obtiene la coleccion

  await Coleccion.findOne({_id: grupoColeccionObtenido.adicional.coleccion.toString()}, (error, coleccion) => {
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