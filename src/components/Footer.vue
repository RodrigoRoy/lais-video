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
import moment from 'moment'

export default {
  name: 'Footer',
  data: () => ({
    // data
  }),
  filters: {
    year: function(value){
      if (!value)
        return '';
      return moment(value).format('YYYY');
    }
  }
}
</script>
