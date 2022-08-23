/**
 * Servicio para hacer llamadas al API acerca de registros en video
 */

import {http} from './HttpService'

/**
 * Obtiene la lista de todos los registros en video
 * @returns objeto con la lista de todos los registros en video
 */
export function getAllVideos(){
  return http().get('/video');
}

/**
 * Obtiene la información de un registro de video específico
 * @param {string} id - Id del registro de video
 * @returns objeto con todas las propiedades del video especificado
 */
export function getVideoById(id){
  return http().get(`/video/${id}`);
}

/**
 * Crea o guarda un nuevo registro de video
 * @param {Object} video - Objeto con propiedades que definen a un registro de video
 * @returns objeto con mensaje de éxito o error al almacenar el registro de video
 */
export function createVideo(video){
  return http().post('/video', video);
}

/**
 * Elimina o borra un registro de video específico
 * @param {string} id - Id del registro de video
 * @returns objeto con mensaje de éxito o error al borrar el registro de video
 */
export function deleteVideo(id){
  return http().delete(`/video/${id}`);
}

/**
 * Actualiza un registro de video
 * Sobreescribe el anterior registro de video con el nuevo dado como parámetro
 * @param {Object} video - Objecto con nuevas y/o actualizadas propiedades del registro de video
 * @returns objeto con mensaje de éxito o error al actualizar el registro de video
 */
export function updateVideo(video){
  return http().put('/video', video);
}

/**
 * Obtiene los videos contenidos en un grupo particular
 * @param {string} fromId - Id del grupo documental
 * @returns objecto que enlista los videos segun los parámetros
 */
 export function filter(fromId){
  return http().get('/video/filter', {params: {'from': fromId}});
}

/**
 * Obtiene la lista de navegación del video (breadcrumbs)
 * @param {string} videoId - Id del registro de video
 * @returns objecto con propiedad breadcrumbs que representa la lista de navegación como objetos
 * usando la sintaxis definida por Vuetify (https://vuetifyjs.com/en/components/breadcrumbs/)
 */
 export function breadcrumbs(videoId){
  return http().get(`/video/breadcrumbs/${videoId}`);
}