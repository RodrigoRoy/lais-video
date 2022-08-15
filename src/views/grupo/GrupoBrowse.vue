<!-- Vista para navegar y ver los grupos documentales (conjuntos de registros en video) -->
<template>
    <div>
        <!-- En caso de error en petición al API -->
        <v-alert prominent type="error" v-if="error">
            <v-row align="center">
                <v-col class="grow">
                    {{ error }}
                </v-col>
            </v-row>
        </v-alert>

        <v-container v-else>
            <!-- Encabezado con título del conjunto y el camino dentro del grupo (breadcrumbs) en caso de tener -->
            <h2 class="text-h3 text-center">Grupos</h2>
            <!-- <v-breadcrumbs :items="breadcrumbs" class="justify-center"></v-breadcrumbs> -->

            <!-- Organización del espacio en filas y columnas de recuadros (cards) donde cada uno representa un conjunto o grupo -->
            <v-row no-gutters align="start" justify="start">
                <v-col cols="12" md="3" v-for="grupo in grupos" :key="grupo._id">
                    <v-card class="ma-4 pa-4" outlined tile>
                        <v-img :src="`${publicPath}files/image/${grupo.adicional.imagen}`" height="150px"></v-img>
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
                        <!-- Componente para el render de la información del grupo -->
                        <grupo-info :grupo="grupo"></grupo-info>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="goToEdit(grupo)" class="mr-2">Editar <v-icon>mdi-pencil</v-icon> </v-btn>
                        <v-btn @click="remove(grupo)" class="mr-2">Borrar <v-icon>mdi-delete</v-icon> </v-btn>
                        <v-btn @click="goToURL(grupo)" class="mr-2">URL <v-icon>mdi-link</v-icon> </v-btn>
                        <!-- <v-btn @click="printPDF()">Ficha <v-icon>mdi-file-pdf-box</v-icon></v-btn> -->
                        <v-btn @click="closeDialog()">Cerrar <v-icon>mdi-close</v-icon></v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
    </div>
</template>

<script>
import GrupoInfo from '@/components/GrupoInfo.vue'
import * as grupoService from '../../services/GrupoService' // servicio para llamadas al 

export default {
  name: 'GrupoBrowse',
  props: { from: String, type: String },
  components: {
    GrupoInfo // Información dentro de v-dialog
  },
  data: () => ({
    // Ruta del directorio "public"
    publicPath: process.env.BASE_URL,
    // El objeto grupos (en plural) tiene la información mínima de todos los subconjuntos que contiene el grupo actual
    grupos: [],
    // Auxiliar para copiar la información de un objeto de la lista "grupos". Se emplea en grupos con el método openDialog
    grupo: null,
    // Auxiliar que representa si la ventana de dialogo con la información del video se muestra (true) o no (false)
    dialog: false,
    // Texto de error, en caso de haber
    error: null,
    // Representación jerárquica de los grupos a los que pertenecen las unidades documentales
    // breadcrumbs: [],
  }),

  // Obtención de información desde API, antes de renderizar vista
  beforeRouteEnter(to, from, next){
    grupoService.getAllGroups().then(res => {
      next(vm => { // vm es necesario para asignaciones, "this" no existe en este contexto
        vm.grupos = res.data.grupos;
        // En caso de que no haya grupos
        if (vm.grupos.length === 0){
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

  // TODO Corregir sintaxis para enviar datos en petición al API (con Axios)
  // beforeMount() {
  //   console.log('this.from: ', this.from)
  //   grupoService.getGroupsByCollection(this.from).then(res => {
  //     console.log('res.data: ', res.data)
  //     this.grupos = res.data.grupos;
  //     if(this.grupos.length === 0)
  //       this.error = 'Grupo vacío'
  //   })
  //   .catch(error => {
  //     this.error = error;
  //     this.grupos = null;
  //   });
  // },

  methods: {
    // @TODO Permite de manera programática ir a una ubicación definida en el archivo router.js
    // Recibe como parámetro el nombre dado en router
    // goTo: function(routerName){
    //   this.$router.push({name: routerName});
    // },

    /**
     * Abre un cuadro de dialogo y muestra la información del registro
     * @param Object - información que representa un grupo documental
     */
    openDialog(grupoData) {
      this.grupo = grupoData;
      this.dialog = true;
    },
    // Cierra el cuadro de dialogo actual
    closeDialog(){
      this.grupo = null;
      this.dialog = false;
    },
    /**
     * Envia a la ruta URL de edición del registro del grupo actual
     * @param Object - representa el grupo documental, debe contener el atributo "_id"
     */
    goToEdit(grupo){
      this.$router.push({name: 'grupo-edit', params: {id: grupo._id}});
    },
    /**
     * Envia a la ruta URL de vista individual del registro del grupo actual
     * @param Object - representa el grupo documental, debe contener el atributo "_id"
     */
    goToURL(grupo){
      this.$router.push({name: 'grupo-view', params: {id: grupo._id}});
    },
    /**
     * Elimina o remueve el registro del grupo actual
     * @param Object - representa el grupo documental, debe contener el atributo "_id"
     */
    async remove(grupo){
      try {
        const response = await grupoService.deleteGroup(grupo._id);
        this.message = response.data.message;
        this.$router.go(); // recargar ruta actual
      } catch (error) {
        this.error = error;
        this.closeDialog();
      }
    },

  }

}
</script>
