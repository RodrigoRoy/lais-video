<!-- Vista de un usuario -->
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

    <!-- Usar v-if/v-else evita advertencias/errores en consola al renderizar -->
    <v-container v-else>
      <h1>Información personal</h1>
      <v-card v-if="usuario">
        <v-card-title>{{ usuario.fullname }}</v-card-title>
        <v-card-text>
          <div class="d-flex align-start">
            <v-icon class="pr-3" color="white"> mdi-account </v-icon>
            <p>{{ usuario.username }}</p>
          </div>
          <div class="d-flex align-start">
            <v-icon class="pr-3" color="white"> mdi-email-open-outline </v-icon>
            <p>{{ usuario.email }}</p>
          </div>

          <v-btn @click="goToEdit(usuario)" color="primary" block elevation="6" x-large>
            <span>Editar Perfil</span>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-container>

    <v-container>
      <v-data-iterator
        :items="items"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
      >
        <template v-slot:header>
          <v-toolbar color="primary" class="mb-1">
            <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Buscar"
            ></v-text-field>
            <template v-if="$vuetify.breakpoint.mdAndUp">
              <v-spacer></v-spacer>
              <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-magnify"
                label="Ordenar por"
              ></v-select>
              <v-spacer></v-spacer>
              <v-btn-toggle v-model="sortDesc" mandatory>
                <v-btn large depressed color="primary" :value="false">
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn large depressed color="primary" :value="true">
                  <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
              </v-btn-toggle>
            </template>
          </v-toolbar>
        </template>

        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="item in props.items"
              :key="item.titulo"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card>
                <v-card-title class="subheading font-weight-bold">
                  {{ item.titulo }}
                </v-card-title>

                <v-divider></v-divider>

                <v-list dense>
                  <v-list-item>
                    <!-- Tipo -->
                    <v-list-item-content
                      :class="{ 'blue--text': sortBy === 'Tipo' }"
                    >
                      Tipo:
                    </v-list-item-content>
                    <v-list-item-content
                      class="align-end"
                      :class="{ 'blue--text': sortBy === 'Tipo' }"
                    >
                      {{ item.tipo }}
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <!-- Código -->
                    <v-list-item-content
                      :class="{ 'blue--text': sortBy === 'Codigo' }"
                    >
                      Código:
                    </v-list-item-content>
                    <v-list-item-content
                      class="align-end"
                      :class="{ 'blue--text': sortBy === 'Codigo' }"
                    >
                      {{ item.codigo }}
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <!-- Tipo -->
                    <v-list-item-content
                      :class="{ 'blue--text': sortBy === 'Fecha' }"
                    >
                      Fecha:
                    </v-list-item-content>
                    <v-list-item-content
                      class="align-end"
                      :class="{ 'blue--text': sortBy === 'Fecha' }"
                    >
                      {{ parseDate(item.fecha) }}
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <!-- Tipo -->
                    <v-list-item-content
                      :class="{ 'blue--text': sortBy === 'Update' }"
                    >
                      Update:
                    </v-list-item-content>
                    <v-list-item-content
                      class="align-end"
                      :class="{ 'blue--text': sortBy === 'Update' }"
                    >
                      {{ parseDate(item.update) }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </template>

        <template v-slot:footer>
          <v-row class="mt-2" align="center" justify="center">
            <span class="grey--text">Datos por página</span>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  text
                  color="primary"
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ itemsPerPage }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="updateItemsPerPage(number)"
                >
                  <v-list-item-title>{{ number }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-spacer></v-spacer>

            <span class="mr-4 grey--text">
              Page {{ page }} of {{ numberOfPages }}
            </span>
            <v-btn
              fab
              color="primary"
              class="mr-1"
              @click="formerPage"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              fab
              color="primary"
              class="ml-1"
              @click="nextPage"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
  </div>
</template>


<script>
import * as usuarioService from "../../services/UsuarioService"; // servicio para llamadas al API

export default {
  name: "UsuarioView",

  // components: {
  //   GrupoInfo,
  // },

  data: () => ({
    // El objeto grupo representa una unidad documental, es decir, un registro audiovisual organizado por áreas
    usuario: null,
    // Mensaje de error, en caso de haber
    error: null,

    itemsPerPageArray: [6, 12, 24],
    search: "",
    filter: {},
    sortDesc: false,
    page: 1,
    itemsPerPage: 6,
    sortBy: "titulo",
    keys: [
      "Titulo",
      "Tipo",
      "Codigo",
      "Fecha",
      "Update",
    ],
    items: [],
  }),

  // Obtención de información desde API, antes de renderizar vista
  beforeRouteEnter(to, from, next) {
    usuarioService
      .getUsuarioById(to.params.id)
      .then((res) => {
        // :id en URL es to.params.id
        next((vm) => {
          // vm es necesario para asignaciones, this no existe en este contexto
          let usuario = res.data.usuario;

          usuarioService.getAllItems(to.params.id).then(result => {
            vm.items = result.data.data;
          }).catch(error => {
            next((vm) => {
              vm.error = error.message;
            });
          })

          // Asignación final
          vm.usuario = usuario;
        });
      })
      // En caso de error (400 HTTP status code)
      .catch((error) => {
        next((vm) => {
          vm.error = error.message;
          vm.usuario = null;
        });
      });
  },

  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Código de Referencia");
    },
  },

  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    parseDate(date) {
      return new Date(date).toLocaleDateString('es-ES')
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
