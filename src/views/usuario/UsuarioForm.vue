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
      <!-- Encabezado con título del conjunto y el camino dentro de la colección (breadcrumbs) en caso de tener -->
      <h2 class="text-h3 text-center">Editar usuario</h2>
      <!-- <v-breadcrumbs :items="breadcrumbs" class="justify-center"></v-breadcrumbs> -->

      <v-form
        ref="videoForm" v-model="validForm" lazy-validation v-on:submit.prevent="onSubmit" enctype="multipart/form-data"
      >
        <div class="d-flex">
          <v-icon color="white"> mdi-account </v-icon>
          <v-text-field
            class="pl-6"
            label="Nombre de usuario"
            v-model="usuario.username"
          ></v-text-field>
        </div>
        <div class="d-flex">
          <v-icon color="white"> mdi-account </v-icon>
          <v-text-field
            class="pl-6"
            label="Nombre completo"
            v-model="usuario.fullname"
          ></v-text-field>
        </div>
        <div class="d-flex">
          <v-icon color="white"> mdi-email-open-outline </v-icon>
          <v-text-field
            class="pl-6"
            label="Correo electrónico"
            v-model="usuario.email"
          ></v-text-field>
        </div>

        <div>
          <div class="pb-6 pt-10">
            <v-row no-gutters>
              <v-col cols="1">
                <v-icon color="white"> mdi-plus </v-icon>
              </v-col>
              <v-col cols="4">
                <p>Creación</p>
              </v-col>
              <v-col cols="4">
                <v-switch
                  v-model="usuario.operation.create"
                ></v-switch>
              </v-col>
            </v-row>
          </div>
          <div class="pb-6">
            <v-row no-gutters>
              <v-col cols="1">
                <v-icon color="white"> mdi-pencil-outline </v-icon>
              </v-col>
              <v-col cols="4">
                <p>Edición</p>
              </v-col>
              <v-col cols="4">
                <v-switch
                  v-model="usuario.operation.update"
                ></v-switch>
              </v-col>
            </v-row>
          </div>
          <div class="pb-6">
            <v-row no-gutters>
              <v-col cols="1">
                <v-icon color="white"> mdi-delete </v-icon>
              </v-col>
              <v-col cols="4">
                <p>Borrado</p>
              </v-col>
              <v-col cols="4">
                <v-switch
                  v-model="usuario.operation.delete"
                ></v-switch>
              </v-col>
            </v-row>
          </div>
          <div class="pb-6">
            <v-row no-gutters>
              <v-col cols="1">
                <v-icon color="white"> mdi-star </v-icon>
              </v-col>
              <v-col cols="4">
                <p>Administración</p>
              </v-col>
              <v-col cols="4">
                <v-switch
                  v-model="usuario.admin"
                ></v-switch>
              </v-col>
            </v-row>
          </div>
          <div class="pb-6">
            <v-row no-gutters>
              <v-col cols="1">
                <v-icon color="white"> mdi-lock-open </v-icon>
              </v-col>
              <v-col cols="4">
                <p>Cuenta activa</p>
              </v-col>
              <v-col cols="4">
                <v-switch
                  v-model="usuario.active"
                ></v-switch>
              </v-col>
            </v-row>
          </div>
        </div>

        <v-list-item-content class="justify-center">
          <v-btn
            type="submit"
            :disable="!validForm"
            color="primary"
            block
            elevation="6"
            x-large
          >
            <span>Actualizar</span>
          </v-btn>
        </v-list-item-content>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import * as usuarioService from "../../services/UsuarioService";

export default {
  name: "usuarios-edit",
  data: () => ({
    // Ruta del directorio "public"
    publicPath: process.env.BASE_URL,
    // El objeto colecciones (en plural) tiene la información mínima de todos los subconjuntos que contiene el conjunto actual
    usuario: {},
    // Texto y tipo de mensaje de v-alert
    myAlert: {
      active: false,
    },
    usuarioId: '',

    // Auxiliar para indicar si todos los campos del formulario son válidos
    validForm: false,
  }),

  // Obtención de información desde API, antes de renderizar vista
  beforeRouteEnter(to, from, next) {
    // En caso de crear nuevo registro:
    if (!to.params.id)
      // no hay :id en URL
      return next();

    // En caso de editar un registro existente:
    usuarioService
      .getUsuarioById(to.params.id)
      .then((res) => {
        next((vm) => {
          // vm es necesario para asignaciones, "this" no existe en este contexto
          let usuario = res.data.usuario;

          // Asignación final
          vm.usuario = usuario;
          vm.editMode = true;
        });
      })
      // En caso de error (400 HTTP status code)
      .catch((error) => {
        next((vm) => {
          vm.error = error.message;
          vm.video = null;
        });
      });
  },
  // Obtención de información desde API, antes de renderizar vista
  beforeMount() {
    usuarioService
      .getAllUsers()
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
    onSubmit: async function(){
      // Validación del formulario
      if(!this.$refs.videoForm.validate()) 
        return;

      try {
        
        // Enviar datos textuales a base de datos
        const request = {
          usuario: this.usuario,
        };
        let myResponse; // objeto res después de creación o edición del registro
        // actualizar registro ya existente o crear uno nuevo:
        myResponse = await usuarioService.updateUsuario(request);
        
        // Notificaciones:
        this.success = true; // subida de registro completada exitosamente
        this.usuarioId = myResponse.data.id; // identificador en base de datos

        // Reenviar a la vista del registro recien creado
        this.$router.push({name: 'usuarios'});
      } catch (err) { // error de conexión
        this.success = false;
        this.error = err;
      }
    },
  },
};
</script>
