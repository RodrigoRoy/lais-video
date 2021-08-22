<template>
  <header>
    <v-app-bar app absolute dark scroll-target="#app-container" color="#5c6bc088" :hide-on-scroll="true"> <!-- color="primary" -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <a href="https://www.institutomora.edu.mx/" target="_blank"><img class="mr-3" :src="require('../assets/moraEscalado.png')" height="40"/></a>
      <a href="http://lais.mora.edu.mx/" target="_blank"><img class="mr-3" :src="require('../assets/lais_logo.png')" height="40"/></a>
      <!-- <v-toolbar-title class="headline">
        Registros en video
      </v-toolbar-title> -->
      <v-spacer></v-spacer>
      <!-- <v-btn text v-if="!$store.state.isLoggedIn">
        <router-link to="/registrar" class="nav-link" exact>Registrar</router-link>
      </v-btn>
      <v-btn text v-if="!$store.state.isLoggedIn">
        <router-link to="/login" class="nav-link" exact>Entrar</router-link>
      </v-btn>
      <v-btn text v-if="$store.state.isLoggedIn">
        <a v-on:click.prevent="logout()" class="nav-link" href="#">Salir</a>
      </v-btn> -->


      
      <v-btn rounded color="transparent">
        <router-link to="/" exact>Inicio<v-icon>mdi-home</v-icon></router-link>
      </v-btn>
      
      <v-btn rounded color="transparent">
        <router-link to="/acerca" exact>Acerca de<v-icon>mdi-information</v-icon></router-link>
      </v-btn>
      
      <v-btn rounded color="transparent">
        <router-link to="/proyectos" exact>Colección<v-icon>mdi-apps</v-icon></router-link>
      </v-btn>

      <v-text-field hide-details placeholder="Buscar" single-line dense filled rounded class="shrink"></v-text-field>
      <v-btn icon>
        <router-link to="/search" exact><v-icon>mdi-magnify</v-icon></router-link>
      </v-btn>

      <v-menu bottom left >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="yellow" v-bind="attrs" v-on="on" >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-if="!$store.state.isLoggedIn">
            <v-list-item-title>
              <router-link to="/registrar" class="nav-link" exact>Registrar</router-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="!$store.state.isLoggedIn">
            <v-list-item-title>
              <router-link to="/login" class="nav-link" exact>Entrar</router-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="$store.state.isLoggedIn">
            <v-list-item-title>
              <a v-on:click.prevent="logout()" class="nav-link" href="#">Salir</a>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Accesos directos
          </v-list-item-title>
          <v-list-item-subtitle>
            {{this.$store.state.username ? this.$store.state.username : ''}}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

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

        <v-list-item link >
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/proyectos" exact>Proyectos</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link >
          <v-list-item-icon>
            <v-icon>mdi-video-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/video/nuevo" exact>Formulario unidad documental</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link >
          <v-list-item-icon>
            <v-icon>mdi-folder-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/coleccion/nuevo" exact>Formulario conjunto documental</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script>
import * as auth from '../services/AuthService';

export default {
  name: 'Navbar',
  data: () => ({
    drawer: null, // navigation-drawer
  }),
  methods: {
    logout: function(){
      auth.logout();
      this.$router.push({name: 'home'});
    }
  }
}
</script>

<style scoped>
.v-application a {
  color: inherit;
  text-decoration: none;
}

</style>
