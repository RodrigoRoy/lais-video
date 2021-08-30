<!-- Archivo de prueba para separar en un componente toda la ventana emergente (dialog) -->

<template>
  <v-container>
    <h2 class="text-h3 text-center">Proyectos</h2>
    <v-breadcrumbs :items="items" class="justify-center"></v-breadcrumbs>

    <v-row no-gutters align="center" justify="start">
      <v-col cols="12" md="3" v-for="(coleccion, i) in colecciones" :key="i">
        <v-card class="ma-4 pa-4" outlined tile @click="goTo()">
          <v-img :src="require('@/assets/Foto_Acervo1.png')" height="150px"></v-img>
          <v-card-title class="justify-center">
            <div class="text-truncate">
              {{ coleccion.identificacion.titulo }}
            </div>
          </v-card-title>
          <v-card-subtitle class="pb-0 text-center">
            {{ coleccion.identificacion.codigoReferencia }}
          </v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click.stop.prevent="dialog = true">
              <v-icon>mdi-more</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <ColeccionDialog />
  </v-container>
</template>

<script>
  import ColeccionDialog from '../../components/ColeccionDialog.vue'
  export default {
    name: 'Prueba',
    components: {
      ColeccionDialog,
    },
    data () {
      return {
        colecciones: [
          {
            identificacion: {
              codigoReferencia: 'MXIM-AV-2-7-2-1-1',
              titulo: 'Aleida Núñez. Colonia La Aceitera'
            }
          },
          {
            identificacion: {
              codigoReferencia: 'MXIM-AV-2-7-2-1-2',
              titulo: 'Martha Núñez. Colonia La aceitera'
            }
          },
          {
            identificacion: {
              codigoReferencia: 'MXIM-AV-2-7-2-1-3',
              titulo: 'Sr. Hernández. El Motorcito'
            }
          },
          {
            identificacion: {
              codigoReferencia: 'MXIM-AV-2-7-2-1-4',
              titulo: 'Pay'
            }
          },
          {
            identificacion: {
              codigoReferencia: 'MXIM-AV-2-7-2-1-5',
              titulo: 'Memo Ochoa'
            }
          },
        ],
        items: [],
        dialog: false,
      }
    },
    methods: {
      goTo: function(){
        this.$router.push({name: 'coleccion-view'});
      },
    }
  }
</script>
