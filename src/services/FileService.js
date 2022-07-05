/**
 * Servicio para hacer llamadas al API para subir y administrar archivos
 */

import {http} from './HttpService'

/**
 * 
 * @param {Object} imageData - Objeto FormData que contiene un objeto File entre sus propiedades, i.e. el archivo de imagen
 * @returns objeto con mensaje de éxito o error al subir una imagen
 */
export function uploadImage(imageData){
    return http().post('/upload/image', imageData);
}