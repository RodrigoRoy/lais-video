/**
 * Servicio para hacer llamadas al API acerca de los grupos documentales
 */

import {http} from './HttpService'

/**
 * Obtener todos los grupos documentales
 * @returns objecto que enlista todos los grupos documentales
 */
export function getAllGroups(){
  return http().get('/grupo');
}

/**
 * Obtiene la información de un grupo documental específico
 * @param {string} id - Id del grupo documental
 * @returns objeto con todas las propiedades del grupo documental específico
 */
export function getGroupById(id){
  return http().get(`/grupo/${id}`);
}

/**
 * Crea o guarda un nuevo grupo documental
 * @param {Object} grupo - Objeto con propiedades que definen a un grupo documental
 * @returns objeto con mensaje de éxito o error al almacenar el grupo documental
 */
export function createGroup(grupo){
  return http().post('/grupo', grupo);
}

/**
 * Elimina o borra un grupo documental específico
 * @param {string} id - Id del grupo documental
 * @returns objeto con mensaje de éxito o error al borrar el grupo documental
 */
export function deleteGroup(id){
  return http().delete(`/grupo/${id}`);
}

/**
 * Actualiza un grupo documental
 * Sobreescribe el anterior grupo documental con el nuevo dado como parámetro
 * @param {Object} grupo - Objecto con nuevas y/o actualizadas propiedades del grupo documental
 * @returns objeto con mensaje de éxito o error al actualizar el grupo documental
 */
export function updateGroup(grupo){
  return http().put('/grupo', grupo);
}

/**
 * Obtiene los grupos documentales contenidos en una colección o grupo particular
 * @param {string} fromId - Id de la colección o grupo documental
 * @param {string} type - Tipo de dato/documento: 'collection' 'group'
 * @returns objecto que enlista los grupos documentales segun los parámetros
 */
 export function filter(fromId, type){
  return http().get('/grupo/filter', {params: {'from': fromId, 'type': type}});
}

/**
 * Obtiene la lista de navegación del grupo (breadcrumbs)
 * @param {string} grupoId - Id del grupo documental
 * @returns objecto con propiedad breadcrumbs que representa la lista de navegación como objetos
 * usando la sintaxis definida por Vuetify (https://vuetifyjs.com/en/components/breadcrumbs/)
 */
 export async function breadcrumbs(grupoId){
  return await http().get(`/grupo/breadcrumbs/${grupoId}`);
}