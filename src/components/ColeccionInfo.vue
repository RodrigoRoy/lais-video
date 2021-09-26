<!-- Componente que representa una ventana emergente (dialog) para un conjunto documental (coleccion) -->
<template>
  <div>
    <!-- Título -->
    <v-toolbar flat color="primary" dark>
      <v-toolbar-title>{{ coleccion ? coleccion.identificacion.titulo : dummy.identificacion.titulo }}</v-toolbar-title>
    </v-toolbar>

    <!-- Uso de filas y columnas para dividir la información en áreas, campos e información adicional (imagen, presentación) -->
    <v-row>
      <v-col xs="12" sm="12" md="7">
        <!-- $vuetify.breakpoint.xs permite cambiar layout cuando la pantalla es muy pequeña (dispositivos móviles) -->
        <v-tabs :class="{'v-tabs--vertical': !$vuetify.breakpoint.xs}" show-arrows>
          <v-tab class="align-left-tab">
            <v-icon left>mdi-film</v-icon>
            Identificación
          </v-tab>
          <v-tab class="align-left-tab">
            <v-icon left>mdi-account-multiple</v-icon>
            Contexto
          </v-tab>
          <v-tab class="align-left-tab">
            <v-icon left>mdi-book-open-page-variant</v-icon>
            Contenido y <br>
             estructura
          </v-tab>
          <v-tab class="align-left-tab">
            <v-icon left>mdi-key</v-icon>
            Acceso y uso
          </v-tab>
          <v-tab class="align-left-tab">
            <v-icon left>mdi-lead-pencil</v-icon>
            Notas
          </v-tab>
          <v-tab class="align-left-tab">
            <v-icon left>mdi-account-details</v-icon>
            Control de<br>
             la descripción
          </v-tab>

          <!-- Información de los campos del conjunto documental -->
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  <span class="font-weight-bold">Código de referencia</span>
                  <br>
                  {{ coleccion && coleccion.identificacion ? coleccion.identificacion.codigoReferencia : dummy.identificacion.codigoReferencia }}
                </p>
                <p>
                  <span class="font-weight-bold">Título</span>
                  <br>
                  {{ coleccion && coleccion.identificacion ? coleccion.identificacion.titulo : dummy.identificacion.titulo }}
                </p>
                <p>
                  <span class="font-weight-bold">País</span>
                  <br>
                  {{ coleccion && coleccion.identificacion ? coleccion.identificacion.pais : dummy.identificacion.pais }}
                </p>
                <p>
                  <span class="font-weight-bold">Fecha</span>
                  <br>
                  {{ coleccion && coleccion.identificacion ? coleccion.identificacion.fecha : dummy.identificacion.fecha }}
                </p>
                <p>
                  <span class="font-weight-bold">Proyecto de investigación</span>
                  <br>
                  {{ coleccion && coleccion.identificacion ? coleccion.identificacion.proyectoInvestigacion : dummy.identificacion.proyectoInvestigacion }}
                </p>
                <p>
                  <span class="font-weight-bold">Investigación</span>
                  <br>
                  {{ coleccion && coleccion.identificacion ? coleccion.identificacion.investigacion : dummy.identificacion.investigacion }}
                </p>
                <p>
                  <span class="font-weight-bold">Coordinación del proyecto</span>
                  <br>
                  {{ coleccion && coleccion.identificacion ? coleccion.identificacion.coordinacionProyecto : dummy.identificacion.coordinacionProyecto }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  <span class="font-weight-bold">Historia institucional</span>
                  <br>
                  {{ coleccion && coleccion.contexto ? coleccion.contexto.historiaInstitucional : dummy.contexto.historiaInstitucional }}
                </p>
                <p>
                  <span class="font-weight-bold">Semblanza biográfica</span>
                  <br>
                  {{ coleccion && coleccion.contexto ? coleccion.contexto.semblanzaBiografica : dummy.contexto.semblanzaBiografica }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  <span class="font-weight-bold">Alcance y contenido</span>
                  <br>
                  {{ coleccion && coleccion.contenidoEstructura ? coleccion.contenidoEstructura.alcanceContenido : dummy.contenidoEstructura.alcanceContenido }}
                </p>
                <p>
                  <span class="font-weight-bold">Valoración, selección y eliminación</span>
                  <br>
                  {{ coleccion && coleccion.contenidoEstructura ? coleccion.contenidoEstructura.valoracionSeleccionEliminacion : dummy.contenidoEstructura.valoracionSeleccionEliminacion }}
                </p>
                <p>
                  <span class="font-weight-bold">Nuevos ingresos</span>
                  <br>
                  {{ coleccion && coleccion.contenidoEstructura ? coleccion.contenidoEstructura.nuevosIngresos : dummy.contenidoEstructura.nuevosIngresos }}
                </p>
                <p>
                  <span class="font-weight-bold">Organización</span>
                  <br>
                  {{ coleccion && coleccion.contenidoEstructura ? coleccion.contenidoEstructura.organizacion : dummy.contenidoEstructura.organizacion }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  <span class="font-weight-bold">Condiciones de acceso</span>
                  <br>
                  {{ coleccion && coleccion.accesoUso ? coleccion.accesoUso.condicionesAcceso : dummy.accesoUso.condicionesAcceso }}
                </p>
                <p>
                  <span class="font-weight-bold">Condiciones de reproducción</span>
                  <br>
                  {{ coleccion && coleccion.accesoUso ? coleccion.accesoUso.condicionesReproduccion : dummy.accesoUso.condicionesReproduccion }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  <span class="font-weight-bold">Notas</span>
                  <br>
                  {{ coleccion && coleccion.notas ? coleccion.notas.notas : dummy.notas.notas }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  <span class="font-weight-bold">Documentalistas</span>
                  <br>
                  {{ coleccion && coleccion.controlDescripcion ? coleccion.controlDescripcion.documentalistas : dummy.controlDescripcion.documentalistas }}
                </p>
                <p>
                  <span class="font-weight-bold">Fecha de descripción</span>
                  <br>
                  {{ coleccion && coleccion.controlDescripcion ? coleccion.controlDescripcion.fechaDescripcion : dummy.controlDescripcion.fechaDescripcion }}
                </p>
                <p>
                  <span class="font-weight-bold">Fecha de actualización</span>
                  <br>
                  {{ coleccion && coleccion.controlDescripcion ? coleccion.controlDescripcion.fechaActualizacion : dummy.controlDescripcion.fechaActualizacion }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-col>

      <!-- Última columna con la información adicional -->
      <v-col xs="12" sm="12" md="5">
        <p>
          <v-img :src="coleccion && coleccion.adicional && coleccion.adicional.imagen ? require('@/assets/Caratulas_Proyectos/' + coleccion.adicional.imagen) : require('@/assets/Foto_Acervo1.png')" height="220px" contain></v-img>
        </p>
        <!-- Presentación -->
        <vue-markdown breaks linkify :source="coleccion && coleccion.adicional && coleccion.adicional.presentacion ? coleccion.adicional.presentacion : dummy.adicional.presentacion"></vue-markdown>
      </v-col>
    </v-row>
  </div>
</template>


<script>
import VueMarkdown from 'vue-markdown' // rendeer para sintaxis en markdown

export default {
  name: 'ColeccionInfo',
  components: {
    VueMarkdown
  },
  props: {
    // El objeto coleccion representa un conjunto documental, es decir, un grupo jerarquico dentro de la organización del acervo
    // Nota: el objeto coleccion será obtenido desde la base de datos en futuras iteraciones del código
    coleccion: { type: Object }
  },
  data: () => ({
    // Placeholder que muestra cómo sería representar un objeto coleccion con todas sus propiedades
    dummy: {
      identificacion: {
        codigoReferencia: 'MXIM-AV-2-3',
        titulo: 'Lorem ipsum',
        pais: 'México',
        fecha: new Date().toISOString().substr(0, 10),
        proyectoInvestigacion: 'Consectetur adipiscing elit',
        investigacion: 'Praesent rutrum',
        coordinacionProyecto: 'Malesuada elit',
      },
      contexto: {
        historiaInstitucional: 'In hac habitasse platea dictumst. Mauris ac dapibus neque. Nunc faucibus est eget rhoncus scelerisque. Proin venenatis ante sit amet libero fermentum varius. Donec tempor aliquam pretium',
        semblanzaBiografica: 'Praesent faucibus pharetra nunc, quis venenatis nunc semper at. Suspendisse congue, leo convallis pulvinar convallis, mauris est bibendum felis, sed dignissim urna elit vel nibh',
      },
      contenidoEstructura: {
        alcanceContenido: 'Vestibulum viverra dolor nec tempus ullamcorper',
        valoracionSeleccionEliminacion: 'Pellentesque venenatis velit ligula',
        nuevosIngresos: 'Ac congue diam gravida vel',
        organizacion: 'Por proyecto de investigación',
      },
      accesoUso: {
        condicionesAcceso: 'Usos reservados para consulta in situ',
        condicionesReproduccion: 'Aenean vehicula ultricies euismod',
      },
      notas: {
        notas: 'Vivamus eleifend nisl eu nisi laoreet, tristique sagittis leo tristique. Aliquam vitae diam vel velit posuere lobortis',
      },
      controlDescripcion: {
        documentalistas: 'Duis dictum leo sit',
        fechaDescripcion: new Date().toISOString().substr(0, 10),
        fechaActualizacion: new Date().toISOString().substr(0, 10),
      },
      adicional: {
        presentacion: `**Lorem ipsum dolor sit amet**
        Lorem ipsum dolor sit amet, _consectetur adipiscing elit_. Sed quis eleifend mi. Vestibulum id ex sit amet felis finibus tristique eu eu purus. Donec varius neque velit, sit amet tincidunt orci ullamcorper et. Ut ut eros cursus, auctor risus congue, convallis nulla. In laoreet in nisl sit amet pretium. In vehicula ipsum vel mauris pellentesque tincidunt. Proin eu bibendum enim. Praesent sit amet consequat orci.
        Cras lobortis pharetra purus, vitae feugiat turpis iaculis sit amet. Fusce euismod justo ut lacus imperdiet vulputate. Donec viverra quam vel urna varius, ac euismod leo fringilla. Phasellus sed arcu id diam blandit cursus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras aliquet consectetur enim, eget feugiat dolor ornare eu. Ut posuere maximus augue vel euismod.
        https://www.npmjs.com/package/vue-markdown`
      }
    }
  })
}
</script>


<style scoped>
/* Estilo adicional para alinear el menu lateral con los nombres de las áreas (identificaión, contenido y estructura, etc) */
.align-left-tab{
  justify-content: left;
  text-align: left
}
</style>
