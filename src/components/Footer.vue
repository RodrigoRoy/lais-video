<!-- Componente para representar el pie de página (footer) que está siempre presente en la parte inferior del proyecto -->

<template>
  <v-footer>
    <!-- uso de color transparente para v-card -->
    <v-card flat tile width="100%" class="text-center mb-n2" color="rgb(0,0,0,0)">
      <div>
        <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">
          <img alt="Licencia de Creative Commons" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png">
        </a>
        <br>
        <p class="text-caption">
          Este sitio está bajo una
          <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">licencia de Creative Commons Reconocimiento-NoComercial 4.0 Internacional</a>
        </p>
      </div>
    </v-card>
  </v-footer>
</template>


<script>
import moment from 'moment' // para formato de fechas

export default {
  name: 'Footer', // nombre del componente actual

  data: () => ({
    // Espacio reservado para uso de variables en caso de ser necesario
  }),

  // Creación de un filtro específico para dar formato personalizado a un texto
  filters: {
    // Función que muestra únicamente el año de una fecha dada como parámetro
    year: function(value){
      if (!value)
        return '';
      return moment(value).format('YYYY');
    }
  }
}
</script>
