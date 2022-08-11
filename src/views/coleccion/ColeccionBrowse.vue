<!-- Vista para navegar y ver las colecciones -->

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
      <!-- Encabezado con título del conjunto y el camino dentro de la colección (breadcrumbs) en caso de tener -->
      <h2 class="text-h3 text-center">Colecciones</h2>
      <!-- <v-breadcrumbs :items="breadcrumbs" class="justify-center"></v-breadcrumbs> -->

      <!-- Organización del espacio en filas y columnas de recuadros (cards) donde cada uno representa un conjunto o grupo -->
      <v-row no-gutters align="start" justify="start">
        <v-col cols="12" md="3" v-for="(coleccion, i) in colecciones" :key="i">
          <v-card class="ma-4 pa-4" outlined tile>
            <v-img :src="(`${publicPath}files/image/${coleccion.adicional.imagen}`)" height="150px" ></v-img>
            <v-card-title class="text-center justify-center">
              <p v-snip="2">
                {{ coleccion.identificacion.titulo }}
              </p>
              <p class="font-weight-thin my-n2">
                {{ coleccion.identificacion.fecha | date }}
              </p>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon @click.stop.prevent="openDialog(coleccion)">
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- Diseño de la ventana emergente (dialog) que muestra toda la información del conjunto -->
      <!-- El diseño se basa en usar un elemento card con pestañas (tabs) -->
      <v-dialog v-model="dialog" overlay-opacity="0.80">
        <v-card>
          <!-- <v-card-title class="headline">Información completa</v-card-title> -->
          <v-card-text>
            <coleccion-info
              v-bind:coleccion="coleccion"
            ></coleccion-info>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <div v-if="coleccion">
              <v-btn @click="goToEdit(coleccion)" class="mr-2">Editar <v-icon>mdi-pencil</v-icon></v-btn>
              <v-btn @click="remove(coleccion)" class="mr-2">Borrar <v-icon>mdi-delete</v-icon></v-btn>
              <v-btn @click="goToURL(coleccion)" class="mr-2">URL <v-icon>mdi-link</v-icon></v-btn>
              <!-- <v-btn @click="printPDF()">Ficha <v-icon>mdi-file-pdf-box</v-icon></v-btn> -->
            </div>
            <!-- <v-btn @click="printPDF()">Ficha <v-icon>mdi-file-pdf-box</v-icon></v-btn> -->
            <v-btn @click="dialog = false">Cerrar <v-icon>mdi-close</v-icon></v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import ColeccionInfo from "@/components/ColeccionInfo.vue";
import * as coleccionService from "../../services/ColeccionService";

export default {
  name: "ColeccionBrowse",
  components: {
    ColeccionInfo, // Información dentro de v-dialog
  },
  data: () => ({
    // Ruta del directorio "public"
    publicPath: process.env.BASE_URL,
    // El objeto colecciones (en plural) tiene la información mínima de todos los subconjuntos que contiene el conjunto actual
    colecciones: [],
    // Auxiliar para copiar la información de un objeto de la lista "colecciones". Se emplea en conjunto con el método openDialog
    coleccion: null,
    // Auxiliar que representa si la ventana de dialogo con la información del video se muestra (true) o no (false)
    dialog: false,
    // Texto de error, en caso de haber
    error: null,
    // Representación jerárquica de los conjuntos a los que pertenecen las unidades documentales
    // breadcrumbs: [],
  }),

  // Obtención de información desde API, antes de renderizar vista
  beforeRouteEnter(to, from, next) {
    // En caso de editar un registro existente:
    coleccionService
      .getAllColections()
      .then((res) => {
        next((vm) => {
          // vm es necesario para asignaciones, "this" no existe en este contexto
          let colecciones = res.data.colecciones;
          console.log("colecciones", colecciones);
          vm.colecciones = colecciones;
          // En caso de que no haya colecciones
          if (colecciones.length === 0) {
            vm.error = "Colección vacía";
          }
        });
      })
      // En caso de error (400 HTTP status code)
      .catch((error) => {
        next((vm) => {
          vm.error = error.message;
          vm.colecciones = null;
        });
      });
  },

  methods: {
    // Permite de manera programática ir a una ubicación definida en el archivo router.js
    // Recibe como parámetro el nombre dado en router
    // goTo: function(routerName){
    //   this.$router.push({name: routerName});
    // },

    // Recibe un objeto de la lista "colecciones" como parámetro
    // Permite abrir una ventana emergente (dialog) de forma programática mostrando la información dada como parámetro
    openDialog: function (colection) {
      this.dialog = true;
      this.coleccion = colection;
    },
    // Cierra el cuadro de dialogo actual
    closeDialog(){
      this.video = null;
      this.dialog = false;
    },
    /**
     * Envia a la ruta URL de edición del registro de coleccion actual
     * @param Object - representa el registro de coleccion, debe contener el atributo "_id"
     */
    goToEdit(coleccion){
      this.$router.push({name: 'coleccion-edit', params: {id: coleccion._id}});
    },
    /**
     * Envia a la ruta URL de vista individual del registro de coleccion actual
     * @param Object - representa el registro de coleccion, debe contener el atributo "_id"
     */
    goToURL(coleccion){
      this.$router.push({name: 'coleccion-view', params: {id: coleccion._id}});
    },
    /**
     * Elimina o remueve el registro de coleccion actual
     * @param Object - representa el registro de coleccion, debe contener el atributo "_id"
     */
    async remove(coleccion){
      try {
        const response = await coleccionService.deleteColection(coleccion._id);
        this.message = response.data.message;
        this.$router.go(); // recargar ruta actual
      } catch (error) {
        this.error = error;
        this.closeDialog();
      }
    }
  },
};
</script>
