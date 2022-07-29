<!-- Componente que representa la página inicial (home) del proyecto -->
<!-- El diseño principal consiste en un fondo fotográfico, el icono del proyecto, título y la descripción del proyecto -->

<template>

	<div>
    <div id="animation-template">
      
    </div>
    <v-container class="relative">
      <!-- Uso de filas para organizar -->
      <v-row class="text-justify">

        <!-- Logo -->
        <v-col cols="6" class="mt-12">
          <v-img :src="require('../assets/AVLAIS_logo.png')" class="mb-4" contain height="300" />
        </v-col>

        <!-- Título -->
        <v-col cols="12">
          <h1 class="display-2 font-weight-bold mb-6">
            Colección de Registros en Video del LAIS
          </h1>

          <!-- Descripción del proyecto -->
          <p class="headline font-weight-regular">
            Esta colección da cuenta de los diversos registros audiovisuales que documentaron varios proyectos de investigación desde los años noventa. Proyectos de investigación social donde se desplegaron las posibilidades de documentación fotográfica y audiovisual, apostando a la construcción de fuentes en campo que integraran informaciones visuales y sonoras que seguido escapan a la investigación.
          </p>

          <!-- Acceso directo a los proyectos -->
          <p class="mt-3">
            <v-btn color="primary" elevation="6" large to="/video/all">Ver colección</v-btn>
          </p>
        </v-col>
      </v-row>
    </v-container>
    
  </div>
</template>


<script>
  export default {
    name: 'Inicio', // Nombre del componente actual

    data: () => ({
      // Espacio reservado para variables en caso de ser necesarias
    }),
  }
</script>

<style scope>
#animation-template{
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute; 
  animation: bg_transition 54s linear infinite;
}
.relative{
  position: relative;
}
/* Animación de transición de imágenes automático. */
@keyframes bg_transition {
	/** Primera imagen */
  0% {
    opacity: 0;
    animation-timing-function: ease-in;
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('../assets/background1.jpg') no-repeat center center fixed;
  }
  4% {
    opacity: 1;
    animation-timing-function: ease-out;
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('../assets/background1.jpg') no-repeat center center fixed;
  }
  8% {
    opacity: 1;
    animation-timing-function: ease-out;
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('../assets/background1.jpg') no-repeat center center fixed;
  }
  12% {
    opacity: 0;
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('../assets/background1.jpg') no-repeat center center fixed;
  }
  16% {
    opacity: 0;
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('../assets/background1.jpg') no-repeat center center fixed;
  }
  /** Segunda imagen */
  20% {
    opacity: 0;
    animation-timing-function: ease-in;
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('../assets/background6.jpg') no-repeat center center fixed;
  }
  24% {
    opacity: 1;
    animation-timing-function: ease-out;
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('../assets/background6.jpg') no-repeat center center fixed;
  }
  28% {
    opacity: 1;
    animation-timing-function: ease-out;
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('../assets/background6.jpg') no-repeat center center fixed;
  }
  32% {
    opacity: 0;
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('../assets/background6.jpg') no-repeat center center fixed;
  }
  36% {
    opacity: 0;
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('../assets/background6.jpg') no-repeat center center fixed;
  }
  /* Tercera imagen */
  40% {
    opacity: 0;
    animation-timing-function: ease-in;
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('../assets/background3.jpg') no-repeat center center fixed;
  }
  44% {
    opacity: 1;
    animation-timing-function: ease-out;
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('../assets/background3.jpg') no-repeat center center fixed;
  }
  48% {
    opacity: 1;
    animation-timing-function: ease-out;
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('../assets/background3.jpg') no-repeat center center fixed;
  }
  52% {
    opacity: 0;
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('../assets/background3.jpg') no-repeat center center fixed;
  }
  56% {
    opacity: 0;
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('../assets/background3.jpg') no-repeat center center fixed;
  }
  /* Cuarta imagen */
  60% {
    opacity: 0;
    animation-timing-function: ease-in;
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('../assets/background4.jpg') no-repeat center center fixed;
  }
  64% {
    opacity: 1;
    animation-timing-function: ease-out;
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('../assets/background4.jpg') no-repeat center center fixed;
  }
  68% {
    opacity: 1;
    animation-timing-function: ease-out;
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('../assets/background4.jpg') no-repeat center center fixed;
  }
  72% {
    opacity: 0;
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('../assets/background4.jpg') no-repeat center center fixed;
  }
  76% {
    opacity: 0;
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('../assets/background4.jpg') no-repeat center center fixed;
  }
  /* Quinta imagen */
  60% {
    opacity: 0;
    animation-timing-function: ease-in;
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('../assets/background4.jpg') no-repeat center center fixed;
  }
  64% {
    opacity: 1;
    animation-timing-function: ease-out;
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('../assets/background4.jpg') no-repeat center center fixed;
  }
  68% {
    opacity: 1;
    animation-timing-function: ease-out;
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('../assets/background4.jpg') no-repeat center center fixed;
  }
  72% {
    opacity: 0;
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('../assets/background4.jpg') no-repeat center center fixed;
  }
  76% {
    opacity: 0;
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('../assets/background4.jpg') no-repeat center center fixed;
  }
  100% {
    opacity: 0;
		background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url('../assets/background1.jpg') no-repeat center center fixed;
  }
}

</style>
