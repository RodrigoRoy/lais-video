import {http} from './HttpService'

export function getAllVideos(){
  return http().get('/video');
}

export function getVideoById(id){
  return http().get(`/video/${id}`);
}

export function createVideo(video){
  return http().post('/video', video);
}

export function deleteVideo(id){
  return http().delete(`/video/${id}`);
}

export function updateVideo(video){
  return http().put('/video', video);
}
