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

<style scoped>
#app-container{
  background-size: cover;

  /* font-family: 'Roboto', 'Open Sans', serif !important;
  font-size: 22px !important; */
  
  animation: bg_transition 34s infinite;
}

/* Animación de transición de imágenes automático. */
@keyframes bg_transition {
	0% {
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('./assets/background1.jpg') no-repeat center center fixed;
  }
  11% {
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('./assets/background1.jpg') no-repeat center center fixed;
  }
  17% {
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('./assets/background2.jpg') no-repeat center center fixed;
  }
  28% {
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('./assets/background2.jpg') no-repeat center center fixed;
  }
  34% {
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('./assets/background3.jpg') no-repeat center center fixed;
  }
  45% {
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('./assets/background3.jpg') no-repeat center center fixed;
  }
  51% {
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('./assets/background4.jpg') no-repeat center center fixed;
  }
  62% {
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('./assets/background4.jpg') no-repeat center center fixed;
  }
  70% {
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('./assets/background5.jpg') no-repeat center center fixed;
  }
  82% {
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('./assets/background5.jpg') no-repeat center center fixed;
  }
  88% {
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('./assets/background6.jpg') no-repeat center center fixed;
  }
  100% {
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('./assets/background6.jpg') no-repeat center center fixed;
  }
  
}

</style>
