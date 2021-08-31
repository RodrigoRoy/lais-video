<template>
  <v-app>
    <Navbar />
    <v-main id="app-container">
      <router-view/>
    </v-main>
    <!-- <Footer /> -->
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
// import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    // Footer
  },
  beforeCreate: function(){
    this.$store.dispatch('authenticate');
  }
};
</script>

<style scope>
#app-container{
  background-size: cover;

  font-family: 'Roboto', 'Open Sans', serif !important;
  font-size: 22px !important;
  
  background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('./assets/background2.jpg') no-repeat center center fixed;
  
}
</style>
