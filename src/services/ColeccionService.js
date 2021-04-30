import {http} from './HttpService'

export function getAllColections(){
  return http().get('/coleccion');
}

export function getColectionById(id){
  return http().get(`/coleccion/${id}`);
}

export function createColection(coleccion){
  return http().post('/coleccion', coleccion);
}

export function deleteColection(id){
  return http().delete(`/coleccion/${id}`);
}

export function updateColection(coleccion){
  return http().put('/coleccion', coleccion);
}
