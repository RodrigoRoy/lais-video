<!-- Componente que representa la página inicial (home) del proyecto -->
<!-- El diseño principal consiste en un fondo fotográfico, el icono del proyecto, título y la descripción del proyecto -->

<template>
  <v-container>
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
          <v-btn color="primary" elevation="6" large to="/proyectos">Ver colección</v-btn>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
  export default {
    name: 'Inicio', // Nombre del componente actual

    data: () => ({
      // Espacio reservado para variables en caso de ser necesarias
    }),
  }
</script>
