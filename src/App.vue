<template>
  <v-app>
    <Navbar />
    <v-main id="app-container">
      <router-view/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Vue from 'vue'
import VueSnip from 'vue-snip'

Vue.use(VueSnip)

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  beforeCreate: function(){
    this.$store.dispatch('authenticate');
  }
};
</script>

<style scope>
#app-container{
  background-size: cover;

  font-family: 'Roboto', 'Open Sans', serif;
  font-size: 22px !important;
  
  background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('./assets/background2.jpg') no-repeat center center fixed;
  
}
.v-application *  {
  /* Calibri */
  /* font-family: Calibri, 'Gill Sans', 'Gill Sans MT', 'Trebuchet MS', sans-serif; */

  /* Montserrat */
  /* font-family: 'Montserrat', sans-serif; */

  /* Gandhi */
  /* font-family: 'Gandhi Sans', arial; */
  
  /* Candara */
  /* font-family: Candara,Calibri,Segoe,Segoe UI,Optima,Arial,sans-serif;  */
}
</style>
