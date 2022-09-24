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
  // Representación ordenada del grupo hasta la colección de origen (i.e. desde un nodo hasta la raiz)
  let breadcrumbs = [] 
  // Determina si el grupo actual no tiene más referencias a otro grupo
  let isLastGroup = false
  // Referencia al (id del) grupo actual
  let idGrupo = req.params.id // inicializado con valor proporcionado

  // Iterar en busca de grupos hasta determinar que es la última referencia
  while (!isLastGroup) {
    await Grupo.findOne({_id: idGrupo}, (error, grupo) => {
      // Casos de error
      if(error){
        return res.status(500).json({message: error});
      }
      if(!grupo){
        return res.status(400).json({message: `El registro con id ${idGrupo} no existe`});
      }

      let hrefText = ''
      // Comprobar referencia a un grupo
      if(grupo.adicional && grupo.adicional.grupo){
        hrefText = `/grupo?from=${grupo.adicional.grupo}&type=group`
        idNode = grupo.adicional.grupo // actualizar referencia para continuar iterando
      }
      // Comprobar referencia a una colección (en vez de grupo)
      else if (grupo.adicional && grupo.adicional.coleccion) {
        hrefText = `/grupo?from=${grupo.adicional.coleccion}&type=collection`
        // idNode = grupo.adicional.coleccion // actualizar referencia
        isLastGroup = true // terminar de iterar, se ha llegado a una colección
      }
  
      // Agregar nuevo item en breadcrumbs
      breadcrumbs.unshift({
        text: grupo.identificacion.codigoReferencia,
        disabled: breadcrumbs.length === 0 ? true : false,
        href: hrefText,
      })
    })
  }

  // Agregar último elemento porque se ha alcanzado la raiz (nivel de colección)
  breadcrumbs.unshift({
    text: "Inicio",
    disabled: false,
    href: '/coleccion'
  })

  return res.status(200).json({breadcrumbs: breadcrumbs})
}

/**
 * Obtiene la profundidad de un grupo.
 * @param {Object} req - Petición (request) recibida por http que incluye el id del grupo
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con un mensaje de error o éxito de cákculo de profundidad.
 */
 export async function getDepth(req, res){

  // Profundidad o nivel de anidación de grupos
  let profundidad = 1 // inicializado en valor mínimo
  // Determina si el grupo actual no tiene más referencias a otro grupo
  let isLastGroup = false
  // Referencia al (id del) grupo actual
  let idGrupo = req.params.id // inicializado con valor proporcionado

  // Iterar en busca de grupos hasta determinar que es la última referencia
  while (!isLastGroup) {
    await Grupo.findOne({_id: idGrupo}, (error, grupo) => {
      // Casos de error
      if(error){
        return res.status(500).json({message: error});
      }
      if(!grupo){
        return res.status(400).json({message: `El registro con id ${idGrupo} no existe`});
      }
      
      // Si existe una referencia a otro grupo
      if(grupo.adicional && grupo.adicional.grupo){
        profundidad++ // aumentar profundidad en un nivel
        idGrupo = grupo.adicional.grupo // actualizar referencia para buscar recursivamente
      }
      else // si no hay más referencia a otro grupo, terminar iteración
        isLastGroup = true
    })
  }

  return res.status(200).json({depth: profundidad})
}