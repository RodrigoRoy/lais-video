/**
 * Router que define el contenido de la etiqueta <router-view/> en App.vue
 */

import Vue from 'vue'
import Router from 'vue-router'
import * as auth from './services/AuthService' // servicio de autentificación (evita accesos sin permisos)

// Componentes (vistas):
import Home from './views/Home.vue'
import Login from './views/authentication/Login.vue'
import Register from './views/authentication/Register.vue'
import VideoForm from './views/video/VideoForm.vue'
import VideoView from './views/video/VideoView.vue'
import VideoViewTemplate from './views/video/VideoViewTemplate.vue'
import VideoBrowse from './views/video/VideoBrowse.vue'
import ColeccionBrowse from './views/coleccion/ColeccionBrowse.vue'
import ColeccionForm from './views/coleccion/ColeccionForm'
import ColeccionView from './views/coleccion/ColeccionView.vue'
import ColeccionProyectos from './views/coleccion/ColeccionProyectos.vue'
import ColeccionProyectos1 from './views/coleccion/ColeccionProyectos1.vue'
import ColeccionProyectos2 from './views/coleccion/ColeccionProyectos2.vue'
import GrupoBrowse from './views/grupo/GrupoBrowse.vue'
import GrupoForm from './views/grupo/GrupoForm.vue'
import GrupoView from './views/grupo/GrupoView.vue'
import Usuarios from './views/usuario/UsuarioList.vue'
import UsuarioForm from './views/usuario/UsuarioForm.vue'
import UsuarioView from './views/usuario/UsuarioView.vue'
import Busqueda from './views/Busqueda.vue'
import About from './views/About.vue'

Vue.use(Router)

// Objeto Router con todas las definiciones de rutas, componentes y nombres
const routes = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      // Inicio
      path: '/',
      name: 'home',
      component: Home
    },
    {
      // Sobre el proyecto
      path: '/acerca',
      name: 'acerca-de',
      component: About
    },
    {
      // Crear nuevo registro de video (requiere autentificación)
      path: '/video/nuevo',
      name: 'video-form',
      component: VideoForm,
      props: route => ({ from: route.query.from, type: route.query.type}),
      beforeEnter: (to, from, next) => {
        if(auth.isLoggedIn()){
          next();
        }
        else {
          next('/login');
        }
      }
    },
    {
      path: '/video',
      name: 'video-browse',
      props: route => ({ from: route.query.from, type: route.query.type}),
      component: VideoBrowse
    },
    {
      // Visualizar registro de video (requiere autentificación)
      path: '/video/:id/edit',
      name: 'video-edit',
      component: VideoForm,
      props: route => ({ from: route.query.from, type: route.query.type}),
      beforeEnter: (to, from, next) => {
        if(auth.isLoggedIn()){
          next();
        }
        else {
          next('/login');
        }
      }
    },
    {
      // Visualizar registro de video
      path: '/video/:id',
      name: 'video-view',
      component: VideoView
    },
    {
      // Crear nueva colección (requiere autentificación)
      path: '/coleccion/nuevo',
      name: 'coleccion-create',
      component: ColeccionForm,
      beforeEnter: (to, from, next) => {
        if(auth.isLoggedIn()){
          next();
        }
        else {
          next('/login');
        }
      }
    },
    {
      // Visualizar registro de coleccion (requiere autentificación)
      path: '/coleccion/:id/edit',
      name: 'coleccion-edit',
      component: ColeccionForm,
      beforeEnter: (to, from, next) => {
        if(auth.isLoggedIn()){
          next();
        }
        else {
          next('/login');
        }
      }
    },
    {
      // Visualizar registro de coleccion
      path: '/coleccion/:id',
      name: 'coleccion-view',
      component: ColeccionView
    },
    {
      // Visualizar colecciones
      path: '/coleccion',
      name: 'coleccion-browse',
      component: ColeccionBrowse
    },
    {
      // Crear nuevo grupo (requiere autentificación)
      path: '/grupo/nuevo',
      name: 'grupo-create',
      component: GrupoForm,
      props: route => ({ from: route.query.from, type: route.query.type}),
      beforeEnter: (to, from, next) => {
        if(auth.isLoggedIn()){
          next();
        }
        else {
          next('/login');
        }
      }
    },
    {
      // Visualizar registro de grupo (requiere autentificación)
      path: '/grupo/:id/edit',
      name: 'grupo-edit',
      component: GrupoForm,
      props: route => ({ from: route.query.from, type: route.query.type}),
      beforeEnter: (to, from, next) => {
        if(auth.isLoggedIn()){
          next();
        }
        else {
          next('/login');
        }
      }
    },
    {
      // Visualizar registro de grupo
      path: '/grupo/:id',
      name: 'grupo-view',
      component: GrupoView
    },
    {
      // Visualizar grupos
      path: '/grupo',
      name: 'grupo-browse',
      props: route => ({ from: route.query.from, type: route.query.type}),
      component: GrupoBrowse
    },
    {
      // Busqueda textual de información
      path: '/search',
      name: 'search',
      component: Busqueda
    },
    {
      // Registrar nuevo usuario (requiere que no haya autentificación previa)
      path: '/registrar',
      name: 'register',
      component: Register,
      beforeEnter: (to, from, next) => {
        if(!auth.isLoggedIn()){
          next();
        }
        else {
          next('/');
        }
      }
    },
    {
      // Inicio de sesión (requiere que no haya autentificación previa)
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if(!auth.isLoggedIn()){
          next();
        }
        else {
          next('/');
        }
      }
    },

    // Templates / prototipos (eliminar o actualizar en el futuro)
    {
      path: '/videos/',
      name: 'video-view-template',
      component: VideoViewTemplate
    },
    {
      path: '/coleccion/proyectos/1',
      name: 'coleccion-projects1',
      component: ColeccionProyectos1
    },
    {
      path: '/coleccion/proyectos/2',
      name: 'coleccion-projects2',
      component: ColeccionProyectos2
    },
    {
      path: '/coleccion/proyectos',
      name: 'coleccion-projects',
      component: ColeccionProyectos
    },
    {
      path: '/proyectos',
      name: 'projects',
      component: ColeccionProyectos
    },
    {
      // Cualquier otra ruta, enviar a inicio
      path: '*',
      redirect: '/'
    },

    // Rutas de usuarios
    {
      // Visualizar los usurios enlistados (requiere autentificación)
      path: '/usuarios',
      name: 'usuarios',
      component: Usuarios,
      props: route => ({ from: route.query.from, type: route.query.type}),
      beforeEnter: (to, from, next) => {
        if(auth.isLoggedIn()){
          next();
        }
        else {
          next('/login');
        }
      }
    },
    {
      // Visualizar registro de usario
      path: '/usuario/:id',
      name: 'usuario-view',
      component: UsuarioView
    },
    {
      // Visualizar registro de usuario (requiere autentificación)
      path: '/usuario/:id/edit',
      name: 'usuario-edit',
      component: UsuarioForm,
      props: route => ({ from: route.query.from, type: route.query.type}),
      beforeEnter: (to, from, next) => {
        if(auth.isLoggedIn()){
          next();
        }
        else {
          next('/login');
        }
      }
    },
  ],
  linkActiveClass: 'active'
})

// Aplicar comprobaciones en todas las rutas:
// routes.beforeEach((to, from, next) => {
//   // Evaluate condition
//   // next('/home');
//   // next(false);
//   if(auth.isLoggedIn()){
//     next();
//   }
//   else{
//     next('/login');
//   }
// })

export default routes;
