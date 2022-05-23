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
import VideoCreate from './views/video/VideoCreate.vue'
import VideoView from './views/video/VideoView.vue'
import VideoViewTemplate from './views/video/VideoViewTemplate.vue'
import ColeccionCreate from './views/coleccion/ColeccionCreate.vue'
import ColeccionView from './views/coleccion/ColeccionView.vue'
import ColeccionProyectos from './views/coleccion/ColeccionProyectos.vue'
import ColeccionProyectos1 from './views/coleccion/ColeccionProyectos1.vue'
import ColeccionProyectos2 from './views/coleccion/ColeccionProyectos2.vue'
import GrupoCreate from './views/grupo/GrupoCreate.vue'
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
      name: 'video-create',
      component: VideoCreate,
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
      component: ColeccionCreate,
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
      // Crear nuevo grupo (requiere autentificación)
      path: '/grupo/nuevo',
      name: 'grupo-create',
      component: GrupoCreate,
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
      path: '/video/',
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
      path: '/coleccion',
      name: 'coleccion-view',
      component: ColeccionView
    },
    {
      // Cualquier otra ruta, enviar a inicio
      path: '*',
      redirect: '/'
    }
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
