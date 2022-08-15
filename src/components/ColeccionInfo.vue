<!-- Componente que representa una ventana emergente (dialog) para un conjunto documental (coleccion) -->
<template>
  <div>
    <!-- Título -->
    <v-toolbar flat color="primary" dark v-if="coleccion.identificacion && coleccion.identificacion.titulo">
      <v-toolbar-title>{{ coleccion.identificacion.titulo }}</v-toolbar-title>
    </v-toolbar>

    <!-- Uso de filas y columnas para dividir la información en áreas, campos e información adicional (imagen, presentación) -->
    <v-row>
      <v-col xs="12" sm="12" md="7">
        <!-- $vuetify.breakpoint.xs permite cambiar layout cuando la pantalla es muy pequeña (dispositivos móviles) -->
        <v-tabs :class="{'v-tabs--vertical': !$vuetify.breakpoint.xs}" show-arrows>
          <v-tab class="align-left-tab" v-if="coleccion.identificacion">
            <v-icon left>mdi-film</v-icon>
            Identificación
          </v-tab>
          <v-tab class="align-left-tab" v-if="coleccion.contexto">
            <v-icon left>mdi-account-multiple</v-icon>
            Contexto
          </v-tab>
          <v-tab class="align-left-tab" v-if="coleccion.contenidoEstructura">
            <v-icon left>mdi-book-open-page-variant</v-icon>
            Contenido y <br>
             estructura
          </v-tab>
          <v-tab class="align-left-tab" v-if="coleccion.accesoUso">
            <v-icon left>mdi-key</v-icon>
            Acceso y uso
          </v-tab>
          <v-tab class="align-left-tab" v-if="coleccion.notas">
            <v-icon left>mdi-lead-pencil</v-icon>
            Notas
          </v-tab>
          <v-tab class="align-left-tab" v-if="coleccion.controlDescripcion">
            <v-icon left>mdi-account-details</v-icon>
            Control de<br>
             la descripción
          </v-tab>

          <!-- Información de los campos del conjunto documental -->
          <v-tab-item v-if="coleccion.identificacion">
            <v-card flat>
              <v-card-text>
                <p v-if="coleccion.identificacion.codigoReferencia">
                  <span class="font-weight-bold">Código de referencia</span>
                  <hint hint="Código alfanumérico separado por guines. Ejemplo: MXIM-AV-2-3-1"></hint>
                  <br>
                  {{ coleccion.identificacion.codigoReferencia }}
                </p>
                <p v-if="coleccion.identificacion.titulo">
                  <span class="font-weight-bold">Título</span>
                  <hint hint="Título de la colección"></hint>
                  <br>
                  {{ coleccion.identificacion.titulo }}
                </p>
                <p v-if="coleccion.identificacion.pais">
                  <span class="font-weight-bold">País</span>
                  <hint hint="País o países de producción del registro en video"></hint>
                  <br>
                  {{ coleccion.identificacion.pais }}
                </p>
                <p v-if="coleccion.identificacion.fecha">
                  <span class="font-weight-bold">Fecha</span>
                  <hint hint="Fecha en que se hizo el registro"></hint>
                  <br>
                  {{ coleccion.identificacion.fecha | date}}
                </p>
                <p v-if="coleccion.identificacion.nivelDescripcion">
                  <span class="font-weight-bold">Nivel de descripcion</span>
                  <!-- TODO @EmmanuelCruz descripcion -->
                  <hint hint="Colección. Se considera como una colección dado que es un conjunto de documentos que tienen características comunes en su producción."></hint>
                  <br>
                  {{ coleccion.identificacion.nivelDescripcion }}
                </p>
                <p v-if="coleccion.identificacion.coordinacion">
                  <span class="font-weight-bold">Coordinación del proyecto</span>
                  <hint hint="Se consigna a la persona coordinadora del proyecto de investigación para el que se realizaron los registros a documentar."></hint>
                  <br>
                  {{ coleccion.identificacion.coordinacion }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item v-if="coleccion.contexto">
            <v-card flat>
              <v-card-text>
                <p v-if="coleccion.contexto.historiaInstitucional">
                  <span class="font-weight-bold">Historia institucional</span>
                  <hint hint="Datos sobre el origen, evolución y desarrollo de la entidad productora de la colección"></hint>
                  <br>
                  {{ coleccion.contexto.historiaInstitucional }}
                </p>
                <p v-if="coleccion.contexto.historiaArchivistica">
                  <span class="font-weight-bold">Historia Archivistica</span>
                  <!-- TODO @EmmanuelCruz descripcion -->
                  <hint hint="La historia y el desarrollo de la colección, indicando aquellos hechos que han contribuido a conformar su estructura y organización actual. También refiere si los materiales fueron utilizados con otros fines"></hint> 
                  <br>
                  {{ coleccion.contexto.historiaArchivistica }}
                </p>
                <p v-if="coleccion.contexto.semblanzaBiografica">
                  <span class="font-weight-bold">Semblanza biográfica</span>
                  <hint hint="Los básicos curriculares de las personas encargadas de la investigación y de la coordinación de la colección"></hint>
                  <br>
                  {{ coleccion.contexto.semblanzaBiografica }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item v-if="coleccion.contenidoEstructura">
            <v-card flat>
              <v-card-text>
                <p v-if="coleccion.contenidoEstructura.alcanceContenido">
                  <span class="font-weight-bold">Alcance y contenido</span>
                  <hint hint="Se describe el valor potencial del proyecto y se señala para quiénes puede ser útil"></hint>
                  <br>
                  {{ coleccion.contenidoEstructura.alcanceContenido }}
                </p>
                <p v-if="coleccion.contenidoEstructura.valoracionSeleccionEliminacion">
                  <span class="font-weight-bold">Valoración, selección y eliminación</span>
                  <hint hint="Se señala el criterio de selección y depuración de los materiales."></hint>
                  <br>
                  {{ coleccion.contenidoEstructura.valoracionSeleccionEliminacion }}
                </p>
                <p v-if="coleccion.contenidoEstructura.nuevosIngresos">
                  <span class="font-weight-bold">Nuevos ingresos</span>
                  <hint hint="Se señala si es una colección abierta a nuevos ingresos o si se encuentra cerrada a su contenido actual."></hint>
                  <br>
                  {{ coleccion.contenidoEstructura.nuevosIngresos }}
                </p>
                <p v-if="coleccion.contenidoEstructura.organizacion">
                  <span class="font-weight-bold">Organización</span>
                  <hint hint="Se establece la forma en que se organiza la colección."></hint>
                  <br>
                  {{ coleccion.contenidoEstructura.organizacion }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item v-if="coleccion.accesoUso">
            <v-card flat>
              <v-card-text>
                <p v-if="coleccion.accesoUso.condicionesAcceso">
                  <span class="font-weight-bold">Condiciones de acceso</span>
                  <hint hint="Posibles usos del material que pueden hacer las personas usuarias: Usos reservados para consulta in situ, Usos no lucrativos, Usos lucrativos."></hint>
                  <br>
                  {{ coleccion.accesoUso.condicionesAcceso }}
                </p>
                <p v-if="coleccion.accesoUso.condicionesReproduccion">
                  <span class="font-weight-bold">Condiciones de reproducción</span>
                  <hint hint="Se consigna si el registro original se puede reproducir o no, de acuerdo al tipo de solicitud."></hint>
                  <br>
                  {{ coleccion.accesoUso.condicionesReproduccion }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item v-if="coleccion.notas">
            <v-card flat>
              <v-card-text>
                <p v-if="coleccion.notas.notas">
                  <span class="font-weight-bold">Notas</span>
                  <hint hint="Información que se considere relevante y que no pudo ser indexada en algún otro campo"></hint>
                  <br>
                  {{ coleccion.notas.notas }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item v-if="coleccion.controlDescripcion">
            <v-card flat>
              <v-card-text>
                <p v-if="coleccion.controlDescripcion.documentalistas">
                  <span class="font-weight-bold">Documentalistas</span>
                  <hint hint="Se consignan los nombres de las personas que realizaron la descripción."></hint>
                  <br>
                  {{ coleccion.controlDescripcion.documentalistas.join(', ') }}
                </p>
                <p v-if="coleccion.createdAt">
                  <span class="font-weight-bold">Fecha de descripción</span>
                  <hint hint="Fecha en que se elaboró la ficha de la unidad"></hint>
                  <br>
                  {{ coleccion.createdAt | date }}
                </p>
                <p v-if="coleccion.updatedAt">
                  <span class="font-weight-bold">Fecha de actualización</span>
                  <hint hint="Fecha de la última modificación a la ficha de la unidad"></hint>
                  <br>
                  {{ coleccion.updatedAt | date }}
                </p>
                <p v-if="coleccion.controlDescripcion.reglasNormas">
                  <span class="font-weight-bold">Reglas o normas</span>
                  <!-- TODO @EmmanuelCruz descripcion -->
                  <hint hint="Las normas que se utilizaron para la elaboración de la ficha."></hint>
                  <br>
                  {{ coleccion.controlDescripcion.reglasNormas }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-col>

      <!-- Última columna con la información adicional -->
      <v-col xs="12" sm="12" md="5">
        <div v-if="coleccion.adicional">
          <div :v-if="coleccion.adicional.imagen">
            <p>
              <v-img :src="`${publicPath}files/image/${coleccion.adicional.imagen}`" height="220px" contain></v-img>
            </p>
          </div>

          <!-- Presentación -->
          <div :v-if="coleccion.adicional.presentacion">
            <vue-markdown breaks linkify :source="coleccion.adicional.presentacion" class="text-justify"></vue-markdown>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>


<script>
import VueMarkdown from 'vue-markdown' // rendeer para sintaxis en markdown
import Hint from '@/components/Hint.vue' // Componente para hints

export default {
  name: 'ColeccionInfo',
  components: {
    VueMarkdown,
    Hint
  },
  data: () => ({
    // Ruta del directorio "public"
    publicPath: process.env.BASE_URL,
  }),
  props: { // Propiedades (sólo lectura) o argumentos para el componente
    coleccion: { type: Object } // colección audiovisual organizada por áreas
  },
}
</script>


<style scoped>
/* Estilo adicional para alinear el menu lateral con los nombres de las áreas (identificaión, contenido y estructura, etc) */
.align-left-tab{
  justify-content: left;
  text-align: left
}
/* Enlaces de color gris (blanco con transparencia) */
a {
  color: rgba(255, 255, 255, 0.7) !important;
}
</style>
