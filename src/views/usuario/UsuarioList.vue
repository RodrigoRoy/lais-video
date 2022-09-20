<!-- Vista para navegar y ver las colecciones -->

<template>
  <div>
    <!-- En caso de error/advertencia/información -->
    <v-alert prominent :type="myAlert.type" v-if="myAlert.active">
      <v-row align="center">
        <v-col class="grow">
          {{ myAlert.message }}
        </v-col>
        <v-col
          class="shrink"
          v-for="(button, index) in myAlert.buttons"
          :key="index"
        >
          <v-btn :href="button.href">{{ button.text }}</v-btn>
        </v-col>
      </v-row>
    </v-alert>

    <v-container v-else>
      <!-- Título -->
      <h2 class="text-h3 text-center">Lista de Usuarios</h2>

      <!-- Organización del espacio en filas y columnas de recuadros (cards) donde cada uno representa un conjunto o grupo -->
      <v-list>
        <!-- <v-list-item-group> -->
          <v-list-item v-for="usuario in usuarios" :key="usuario._id" class="p-4">
            <!-- Informción del usuario -->
            <v-list-item-content>
              <v-list-item-title>
                <h3 v-if="usuario.active">{{ usuario.fullname }}</h3>
                <h3 v-else class="grey--text">{{ usuario.fullname }}</h3>
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-row no-gutters>
                  <v-col>
                    <p>{{ usuario.username }}</p>
                  </v-col>
                  <v-col>
                    <p>{{ usuario.email }}</p>
                  </v-col>
                </v-row>
              </v-list-item-subtitle>
            </v-list-item-content>

            <!-- Acciones -->
            <v-list-item-content>
              <v-list-item-icon class="d-flex justify-space-around">
                <v-icon :class="{invisible: !usuario.admin}" color="blue"> mdi-star </v-icon>
                <v-icon :color="usuario.operation.create ? 'green' : 'grey'"> mdi-plus-circle </v-icon>
                <v-icon :color="usuario.operation.update ? 'green' : 'grey'"> mdi-pencil-circle </v-icon>
                <v-icon :color="usuario.operation.delete ? 'green' : 'grey'"> mdi-delete-circle </v-icon>
              </v-list-item-icon>
              <v-list-item-icon>
                <!-- <v-icon v-else color="pink"> mdi-star </v-icon> -->
              </v-list-item-icon>
            </v-list-item-content>

            <v-spacer></v-spacer>

            <!-- Botón de editar -->
            <v-list-item-content class="justify-center">
              <v-btn color="primary" @click="goToEdit(usuario)">
                Editar
              </v-btn>
            </v-list-item-content>
          </v-list-item>
        <!-- </v-list-item-group> -->
      </v-list>
    </v-container>
  </div>
</template>

<script>
import * as usuarioService from "../../services/UsuarioService";

export default {
  name: "usuarios",
  data: () => ({
    // Ruta del directorio "public"
    publicPath: process.env.BASE_URL,
    // El objeto colecciones (en plural) tiene la información mínima de todos los subconjuntos que contiene el conjunto actual
    usuarios: [],
    // Texto y tipo de mensaje de v-alert
    myAlert: {
      active: false,
    },
  }),

  // Obtención de información desde API, antes de renderizar vista
  beforeMount() {
    usuarioService.getAllUsers()
      .then((res) => {
        this.usuarios = res.data.usuarios;
        if (this.usuarios.length === 0) {
          this.setAlert("No hay usuarios", "info", [
            { text: "Crear usuario", href: "/registrar" },
          ]);
        }
      })
      .catch((error) => {
        this.setAlert(error, "error", [{ text: "Ir a inicio", href: "/" }]);
      });
  },

  methods: {
    // Recibe un objeto de la lista "colecciones" como parámetro
    // Permite abrir una ventana emergente (dialog) de forma programática mostrando la información dada como parámetro
    openDialog: function (colection) {
      this.dialog = true;
      this.coleccion = colection;
    },
    // Cierra el cuadro de dialogo actual
    closeDialog() {
      this.video = null;
      this.dialog = false;
    },
    /**
     * Configura las propiedades a usar en v-alert
     * @param {string} message - Texto a mostrar
     * @param {string} type - Tipo de alerta: success, error, warning, info
     * @param {Object[]} buttons - Lista de propiedades para crear botones que acompañan la alerta. ejemplo: [{text: 'My text', href: '/some/path'}]
     */
    setAlert(message, type = "info", buttons = []) {
      this.myAlert = {
        active: true,
        message: message,
        type: type,
        buttons: buttons,
      };
    },
    /**
     * Envia a la ruta URL de edición del usuario actual
     * @param {Object} usuario - representa el usuario, debe contener el atributo "_id"
     */
     goToEdit(usuario){
      this.$router.push({name: 'usuario-edit', params: {id: usuario._id}});
    },
  },
};
</script>

<style scoped>
/* Ocultar elementos (conservando espaciado) */
.invisible {
  visibility: hidden;
}
</style>