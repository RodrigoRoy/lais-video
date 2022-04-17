import {http} from './HttpService'

export function getAllGroups(){
  return http().get('/grupo');
}

export function getGroupById(id){
  return http().get(`/grupo/${id}`);
}

export function createGroup(grupo){
  return http().post('/grupo', grupo);
}

export function deleteGroup(id){
  return http().delete(`/grupo/${id}`);
}

export function updateGroup(grupo){
  return http().put('/grupo', grupo);
}
