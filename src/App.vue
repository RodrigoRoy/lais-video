<template>
  <v-app>
    <Navbar />
    <v-content id="app-container">
      <router-view/>
    </v-content>
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

<style scoped>
#app-container{
  background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('./assets/background2.jpg') no-repeat center center fixed !important;
  background-size: cover;
}
</style>
