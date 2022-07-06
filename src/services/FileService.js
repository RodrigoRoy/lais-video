/**
 * Servicio para hacer llamadas al API para subir y administrar archivos
 */

import {http} from './HttpService'

/**
 * Guarda la imagen en el servidor
 * @param {Object} imageData - Objeto FormData que contiene un objeto File entre sus propiedades, i.e. el archivo de imagen
 * @returns objeto con mensaje de éxito o error al subir una imagen
 */
export function uploadImage(imageData){
    return http().post('/file/image', imageData);
}

/**
 * Guarda un video en el servidor
 * @param {Object} videoData - Objeto FormData que contiene un objeto File entre sus propiedades, i.e. el archivo de video
 * @returns objeto con mensaje de éxito o error al subir un video
 */
 export function uploadVideo(videoData){
    return http().post('/file/video', videoData);
}

/**
 * Guarda un documento de texto (pdf) en el servidor
 * @param {Object} documentData - Objeto FormData que contiene un objeto File entre sus propiedades, i.e. el documento de texto (pdf)
 * @returns objeto con mensaje de éxito o error al subir un video
 */
 export function uploadDocument(documentData){
    return http().post('/file/document', documentData);
}