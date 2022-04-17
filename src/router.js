import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/authentication/Login.vue'
import Register from './views/authentication/Register.vue'
import TasksAll from './views/tasks/TasksAll.vue'
import TasksCreate from './views/tasks/TasksCreate.vue'
import TasksEdit from './views/tasks/TasksEdit.vue'
import VideoCreate from './views/video/VideoCreate.vue'
import VideoView from './views/video/VideoView.vue'
import ColeccionCreate from './views/coleccion/ColeccionCreate.vue'
import ColeccionView from './views/coleccion/ColeccionView.vue'
// import ColeccionPrueba from './views/coleccion/ColeccionPrueba.vue'
import ColeccionProyectos from './views/coleccion/ColeccionProyectos.vue'
import ColeccionProyectos1 from './views/coleccion/ColeccionProyectos1.vue'
import ColeccionProyectos2 from './views/coleccion/ColeccionProyectos2.vue'
import GrupoCreate from './views/grupo/GrupoCreate.vue'
import Busqueda from './views/Busqueda.vue'
import About from './views/About.vue'
import * as auth from './services/AuthService'

Vue.use(Router)

// export default new Router({
const routes = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/tasks',
      name: 'tasks-all',
      component: TasksAll,
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
      path: '/tasks/new',
      name: 'tasks-create',
      component: TasksCreate,
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
      path: '/tasks/:id',
      name: 'tasks-edit',
      component: TasksEdit,
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
      path: '/acerca',
      name: 'acerca-de',
      component: About
    },
    {
      path: '/video/nuevo',
      name: 'video-create',
      component: VideoCreate,
      // beforeEnter: (to, from, next) => {
      //   if(auth.isLoggedIn()){
      //     next();
      //   }
      //   else {
      //     next('/login');
      //   }
      // }
    },
    {
      path: '/video',
      name: 'video-view',
      component: VideoView
    },
    {
      path: '/coleccion/nuevo',
      name: 'coleccion-create',
      component: ColeccionCreate,
      // beforeEnter: (to, from, next) => {
      //   if(auth.isLoggedIn()){
      //     next();
      //   }
      //   else {
      //     next('/login');
      //   }
      // }
    },
    // {
    //   path: '/coleccion/prueba',
    //   name: 'coleccion-test',
    //   component: ColeccionPrueba
    // },
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
      path: '/grupo/nuevo',
      name: 'grupo-create',
      component: GrupoCreate
    },
    {
      path: '/search',
      name: 'search',
      component: Busqueda
    },
    {
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
    {
      path: '*',
      redirect: '/'
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ],
  linkActiveClass: 'active'
})

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
