<!-- Componente que representa la barra superior y lateral que está siempre presente en todas las páginas del proyecto -->
<!-- Hay dos elementos principales: la barra superior (app-bar) y el menú laterial auxiliar (navigation-drawer) -->

<template>
  <header>
    <v-app-bar app absolute dark scroll-target="#app-container" color="#5c6bc088" :hide-on-scroll="true"> <!-- color="primary" -->
      <!-- Iconos del lado izquierdo -->
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
      <a href="https://www.institutomora.edu.mx/" target="_blank"><img class="mr-3" :src="require('../assets/moraEscalado.png')" height="40"/></a>
      <a href="http://lais.mora.edu.mx/" target="_blank"><img class="mr-3" :src="require('../assets/lais_logo.png')" height="40"/></a>
      <!-- <v-toolbar-title class="headline">
        Registros en video
      </v-toolbar-title> -->
      <v-spacer></v-spacer>

      <!-- Botones y opciones principales -->
      <v-btn rounded color="transparent">
        <router-link to="/" exact>Inicio<v-icon>mdi-home</v-icon></router-link>
      </v-btn>

      <v-btn rounded color="transparent">
        <router-link to="/acerca" exact>Acerca de<v-icon>mdi-information</v-icon></router-link>
      </v-btn>

      <v-btn rounded color="transparent">
        <router-link to="/coleccion" exact>Colección<v-icon>mdi-apps</v-icon></router-link>
      </v-btn>

      <!-- Barra de búsqueda -->
      <v-text-field hide-details placeholder="Buscar" single-line dense filled rounded class="shrink"></v-text-field>
      <v-btn icon>
        <router-link to="/search" exact><v-icon>mdi-magnify</v-icon></router-link>
      </v-btn>

      <!-- Menú situado a la derecha para registro e inicio de sesión -->
      <v-menu bottom left open-on-hover>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="yellow" v-bind="attrs" v-on="on" >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <!-- Contenido del menu para registro e inicio de sesión -->
        <v-list>
          <!-- <v-subheader>Menú principal</v-subheader> -->
          <v-list-item v-if="$store.state.isLoggedIn">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{this.$store.state.fullname ? this.$store.state.fullname : ''}}
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-chip v-if="$store.state.admin" outlined x-small color="green" class="mr-2 text-caption"> Admin </v-chip>
                <v-chip v-if="!$store.state.active" outlined x-small color="red" class="mr-2 text-caption"> Bloqueado <v-icon>mdi-lock</v-icon></v-chip>
                <v-tooltip bottom>
                  <template v-slot:activator="{on, attrs}">
                    <v-icon v-bind="attrs" v-on="on" dense :color="$store.state.operation.create ? 'green' : 'grey'">mdi-plus-circle</v-icon>
                  </template>
                  <span>Permiso de creación</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{on, attrs}">
                    <v-icon v-bind="attrs" v-on="on" dense :color="$store.state.operation.update ? 'green' : 'grey'">mdi-pencil-circle</v-icon>
                  </template>
                  <span>Permiso de actualización</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{on, attrs}">
                    <v-icon v-bind="attrs" v-on="on" dense :color="$store.state.operation.delete ? 'green' : 'grey'">mdi-delete-circle</v-icon>
                  </template>
                  <span>Permiso de borrado</span>
                </v-tooltip>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <!-- <v-divider></v-divider> -->

          <v-list-item-group>            
            <v-list-item v-if="$store.state.isLoggedIn && $route.name === 'coleccion-browse'">
              <v-list-item-icon>
                <v-icon>mdi-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  <router-link :to="{path: '/coleccion/nuevo'}" class="nav-link">Crear colección</router-link>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="$store.state.isLoggedIn && $route.name === 'grupo-browse'">
              <v-list-item-icon>
                <v-icon>mdi-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  <router-link :to="{path: '/grupo/nuevo', query: {from: $route.query.from, type: $route.query.type}}" class="nav-link">Crear grupo</router-link>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="$store.state.isLoggedIn && $route.name === 'video-browse'">
              <v-list-item-icon>
                <v-icon>mdi-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  <router-link :to="{path: '/video/nuevo', query: {from: $route.query.from, type: $route.query.type}}" class="nav-link">Crear registro</router-link>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider v-if="$store.state.isLoggedIn"></v-divider>

            <v-list-item v-if="!$store.state.isLoggedIn">
              <v-list-item-icon>
                <v-icon>mdi-account-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  <router-link to="/registrar" class="nav-link" exact>Registrar</router-link>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="!$store.state.isLoggedIn">
              <v-list-item-icon>
                <v-icon>mdi-login</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  <router-link to="/login" class="nav-link" exact>Iniciar sesión</router-link>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="$store.state.isLoggedIn">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  <a v-on:click.prevent="logout()" class="nav-link" href="#">Cerrar sesión</a>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>

    </v-app-bar>

    <!-- Contenido del menú laterial auxiliar -->
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-content>
          <!-- Título -->
          <v-list-item-title class="title">
            Accesos directos
          </v-list-item-title>
          <!-- Nombre de usuario -->
          <v-list-item-subtitle>
            {{this.$store.state.fullname ? this.$store.state.fullname : ''}}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <!-- Accesos directos del menú lateral -->
      <v-list dense nav>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/" exact>Inicio</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link >
          <v-list-item-icon>
            <v-icon>mdi-video</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/video" exact>Unidad documental</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- <v-list-item link >
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/proyectos" exact>Proyectos</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->

        <v-list-item link >
          <v-list-item-icon>
            <v-icon>mdi-folder-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/coleccion/nuevo" exact>Formulario colección</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      
        <v-list-item link >
          <v-list-item-icon>
            <v-icon>mdi-folder-multiple-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/grupo/nuevo" exact>Formulario grupo documental</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link >
          <v-list-item-icon>
            <v-icon>mdi-video-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/video/nuevo" exact>Formulario unidad simple</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-content>
            <!-- Título -->
            <v-list-item-title class="subtitle-1">
              Demos
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link >
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/proyectos" exact>Lista de proyectos</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link >
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/proyectos/1" exact>Proyecto</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link >
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/proyectos/2" exact>Entrevista</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link >
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/videos" exact>Entrevista controlada</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>

    </v-navigation-drawer>
  </header>
</template>


<script>
import * as auth from '../services/AuthService'; // servicio global para autentificación de usuarios

export default {
  name: 'Navbar', // Nombre del componente actual
  data: () => ({
    // Auxiliar para indicar en que momento el menú lateral (navigation-drawer) está activo/visible o no
    drawer: null,
  }),

  methods: {
    // Funcionalidad al cerrar sesión
    logout: function(){
      auth.logout();
      this.$router.push({name: 'home'}); // Enviar a página inicial
    }
  }
}
</script>


<style scoped>
/* Quita el efecto subrayado en enlaces de la barra superior (app-bar) */
.v-application a {
  color: inherit;
  text-decoration: none;
}
</style>
