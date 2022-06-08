<!-- Vista para navegar y ver los grupos -->
<template>
    <div>
        <!-- En caso de error en petición al API -->
        <v-alert prominent type="error" v-if="error">
            <v-row align="center">
                <v-col class="grow">
                    {{ error }}
                </v-col>
                <v-col class="shrink">
                    <v-btn href="/home">Ir a inicio</v-btn>
                </v-col>
            </v-row>
        </v-alert>

        <v-container v-else>
            <!-- Encabezado con título del conjunto y el camino dentro del grupo (breadcrumbs) en caso de tener -->
            <h2 class="text-h3 text-center">Grupos</h2>
            <!-- <v-breadcrumbs :items="breadcrumbs" class="justify-center"></v-breadcrumbs> -->

            <!-- Organización del espacio en filas y columnas de recuadros (cards) donde cada uno representa un conjunto o grupo -->
            <v-row no-gutters align="start" justify="start">
                <v-col cols="12" md="3" v-for="(grupo, i) in grupos" :key="i">
                    <v-card class="ma-4 pa-4" outlined tile>
                        <v-img :src="require('@/assets/Caratulas_Proyectos/Foto_Acervo1.png')" height="150px"></v-img>
                        <v-card-title class="text-center justify-center">
                            <p v-snip="2">
                                {{ grupo.identificacion.titulo }}
                            </p>
                            <p class="font-weight-thin my-n2">
                                {{ grupo.identificacion.fecha | date }}
                            </p>
                        </v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn icon @click.stop.prevent="openDialog(grupo)">
                                <v-icon>mdi-open-in-new</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Diseño de la ventana emergente (dialog) que muestra toda la información del grupo -->
            <!-- El diseño se basa en usar un elemento card con pestañas (tabs) -->
            <v-dialog v-model="dialog" overlay-opacity="0.80">
                <v-card>
                    <!-- <v-card-title class="headline">Información completa</v-card-title> -->
                    <v-card-text>
                        <grupo-info v-bind:grupo="currentSelection"></grupo-info>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <!-- <v-btn @click="printPDF()">Ficha <v-icon>mdi-file-pdf-box</v-icon></v-btn> -->
                        <v-btn @click="dialog = false">Cerrar <v-icon>mdi-close</v-icon></v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
    </div>
</template>

<script>
import GrupoInfo from '@/components/GrupoInfo.vue'
import * as grupoService from '../../services/GrupoService'

export default {
  name: 'GrupoBrowse',
  components: {
    GrupoInfo // Información dentro de v-dialog
  },
  data: () => ({
    // El objeto grupos (en plural) tiene la información mínima de todos los subconjuntos que contiene el grupo actual
    grupos: [],

    // Auxiliar para copiar la información de un objeto de la lista "grupos". Se emplea en grupos con el método openDialog
    currentSelection: null,

    // Representación jerárquica de los grupos a los que pertenecen las unidades documentales
    // breadcrumbs: [],

    // Auxiliar que representa si la ventana de dialogo con la información del video se muestra (true) o no (false)
    dialog: false,

    // Texto de error, en caso de haber
    error: null,
  }),

  // Obtención de información desde API, antes de renderizar vista
  beforeRouteEnter(to, from, next){
    // En caso de editar un registro existente:
    grupoService.getAllGroups().then(res => {
      next(vm => { // vm es necesario para asignaciones, "this" no existe en este contexto
        let grupos = res.data.grupos;
        console.log(grupos);
        vm.grupos = grupos;
        // En caso de que no haya grupos
        if (grupos.length === 0){
          vm.error = 'Grupo vacío'
        }
      });
    })
    // En caso de error (400 HTTP status code)
    .catch(error => {
      next(vm => {
        vm.error = error.message;
        vm.grupos = null;
      })
    });
  },

  methods: {
    // Permite de manera programática ir a una ubicación definida en el archivo router.js
    // Recibe como parámetro el nombre dado en router
    // goTo: function(routerName){
    //   this.$router.push({name: routerName});
    // },

    // Recibe un objeto de la lista "grupos" como parámetro
    // Permite abrir una ventana emergente (dialog) de forma programática mostrando la información dada como parámetro
    openDialog: function(grupo){
      this.dialog = true;
      this.currentSelection = grupo;
    },

  }

}
</script>
