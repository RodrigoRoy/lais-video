<template>
  <header>
    <v-app-bar app absolute dark scroll-target="#app-container" color="primary" :hide-on-scroll="true">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline">
        Registros en video
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text v-if="!$store.state.isLoggedIn">
        <router-link to="/registrar" class="nav-link" exact>Registrar</router-link>
      </v-btn>
      <v-btn text v-if="!$store.state.isLoggedIn">
        <router-link to="/login" class="nav-link" exact>Entrar</router-link>
      </v-btn>
      <v-btn text v-if="$store.state.isLoggedIn">
        <a v-on:click.prevent="logout()" class="nav-link" href="#">Salir</a>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Registros en video
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
              <router-link to="/video" exact>Ver registro</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link >
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/coleccion" exact>Ver colección</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link >
          <v-list-item-icon>
            <v-icon>mdi-video-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/video/nuevo" exact>Nuevo registro</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link >
          <v-list-item-icon>
            <v-icon>mdi-folder-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/coleccion/nuevo" exact>Nueva colección</router-link>
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
