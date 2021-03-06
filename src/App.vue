<template>
  <v-app>
    <Navbar />
    <v-content id="app-container">
      <router-view/>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

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
