<!-- Componente para representar el pie de página (footer) que está siempre presente en la parte inferior del proyecto -->

<template>
  <v-footer>
    <v-card flat tile width="100%" class="text-center" color="primary">
      <v-divider>
      </v-divider>
      <div>
        <ul class="redes-sociales">
          <li>
            <a href="#">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-facebook" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-twitter" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-youtube" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <rect x="3" y="5" width="18" height="14" rx="4" />
              <path d="M10 9l5 3l-5 3z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <polyline points="3 7 12 13 21 7" />
</svg>
            </a>
          </li>
        </ul>
        
        <div>
          <p>Poussin #45 Col. Mixcoac C.P. 03730 México CDMX</p>
          <p>Tel. conmutador 5598-3777</p>
          <a href="https://www.google.com.mx/maps/place/Poussin+45,+San+Juan,+Benito+Ju%C3%A1rez,+03730+San+Juan,+CDMX/@19.376246,-99.1851294,19z/data=!4m5!3m4!1s0x85d1ff86bd815619:0xcbaa008f0a136e18!8m2!3d19.3763093!4d-99.1852528" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <circle cx="12" cy="11" r="3" />
            <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
            </svg>
          </a>
        </div>
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
