<!-- Componente para representar el pie de página (footer) que está siempre presente en la parte inferior del proyecto -->

<template>
  <v-footer>
    <v-card flat tile width="100%" class="text-center">
      <v-divider>
      </v-divider>
      <div>
        
        <div>
          <p>Poussin #45 Col. Mixcoac C.P. 03730 México CDMX</p>
          <p>Tel. conmutador 5598-3777</p>
        </div>
        
        <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Licencia de Creative Commons" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png">
          <img alt="Licencia de Creative Commons" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png">
        </a>
        <br>
        Este sitio está bajo una 
        <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">licencia de Creative Commons Reconocimiento-NoComercial 4.0 Internacional</a>
        <br>
        
      </div>
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

<style scope>
ul {
  list-style: none;
}
.redes-sociales {
  display: flex;
  justify-content: space-between;
  width: 25%;
  margin: 1rem auto;
}
</style>
