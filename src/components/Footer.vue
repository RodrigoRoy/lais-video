<!-- Componente para representar el pie de página (footer) que está siempre presente en la parte inferior del proyecto -->

<template>
  <v-footer padless>
    <v-card flat tile width="100%" class="text-center" color="primary">

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date() | year }} — <strong>Laboratorio Audiovisual de Investigación Social</strong>
      </v-card-text>
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
