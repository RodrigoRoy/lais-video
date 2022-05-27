<!-- Componente que representa una ventana emergente (dialog) para un conjunto documental (coleccion) -->
<template>
  <div>
    <!-- Título -->
    <v-toolbar flat color="primary" dark v-if="grupo.identificacion && grupo.identificacion.titulo">
      <v-toolbar-title>{{ grupo.identificacion.titulo }}</v-toolbar-title>
    </v-toolbar>

    <!-- Uso de filas y columnas para dividir la información en áreas, campos e información adicional (imagen, presentación) -->
    <v-row>
      <v-col xs="12" sm="12" md="7">
        <!-- $vuetify.breakpoint.xs permite cambiar layout cuando la pantalla es muy pequeña (dispositivos móviles) -->
        <v-tabs :class="{'v-tabs--vertical': !$vuetify.breakpoint.xs}" show-arrows>
          <v-tab class="align-left-tab" v-if="grupo.identificacion">
            <v-icon left>mdi-film</v-icon>
            Identificación
          </v-tab>
          <v-tab class="align-left-tab" v-if="grupo.contexto">
            <v-icon left>mdi-account-multiple</v-icon>
            Contexto
          </v-tab>
          <v-tab class="align-left-tab" v-if="grupo.contenidoEstructura">
            <v-icon left>mdi-book-open-page-variant</v-icon>
            Contenido y <br>
             estructura
          </v-tab>
          <v-tab class="align-left-tab" v-if="grupo.accesoUso">
            <v-icon left>mdi-key</v-icon>
            Acceso y uso
          </v-tab>
          <v-tab class="align-left-tab" v-if="grupo.notas">
            <v-icon left>mdi-lead-pencil</v-icon>
            Notas
          </v-tab>
          <!-- <v-tab class="align-left-tab" v-if="grupo.controlDescripcion">
            <v-icon left>mdi-account-details</v-icon>
            Control de<br>
             la descripción
          </v-tab> -->

          <!-- Información de los campos del conjunto documental -->
          <v-tab-item v-if="grupo.identificacion">
            <v-card flat>
              <v-card-text>
                <p v-if="grupo.identificacion && grupo.identificacion.codigoReferencia">
                  <span class="font-weight-bold">Código de referencia</span>
                  <hint hint="Código alfanumérico separado por guines. Ejemplo: MXIM-AV-2-3-1"></hint>
                  <br>
                  {{ grupo.identificacion.codigoReferencia }}
                </p>
                <p v-if="grupo.identificacion && grupo.identificacion.fecha">
                  <span class="font-weight-bold">Fecha</span>
                  <hint hint="Fecha en que se hizo el registro"></hint>
                  <br>
                  {{ grupo.identificacion.fecha }}
                </p>
                <p v-if="grupo.identificacion && grupo.identificacion.entidadProductora">
                  <span class="font-weight-bold">Entidad productora</span>
                  <hint hint="Entidad productora"></hint>
                  <br>
                  {{ grupo.identificacion.entidadProductora }}
                </p>
                <p v-if="grupo.identificacion && grupo.identificacion.proyectoInvestigacion">
                  <span class="font-weight-bold">Proyecto de investigación</span>
                  <hint hint="Se refiere al proyecto de investigación para el cual fueron realizados los registros a documentar."></hint>
                  <br>
                  {{ grupo.identificacion.proyectoInvestigacion }}
                </p>
                <p v-if="grupo.identificacion && grupo.identificacion.investigacion">
                  <span class="font-weight-bold">Investigación</span>
                  <hint hint="Se consigna el nombre completo de la persona responsable de la investigación para la que se realizaron los registros a documentar."></hint>
                  <br>
                  {{ grupo.identificacion.investigacion }}
                </p>
                <p v-if="grupo.identificacion && grupo.identificacion.coordinacionProyecto">
                  <span class="font-weight-bold">Coordinación del proyecto</span>
                  <hint hint="Se consigna a la persona coordinadora del proyecto de investigación para el que se realizaron los registros a documentar."></hint>
                  <br>
                  {{ grupo.identificacion.coordinacionProyecto }}
                </p>
                <p v-if="grupo.identificacion && grupo.identificacion.coordinacionProduccionAudiovisual">
                  <span class="font-weight-bold">Coordinacion de Produccion Audiovisual</span>
                  <hint hint="Coordinacion de Produccion Audiovisual."></hint>
                  <br>
                  {{ grupo.identificacion.coordinacionProduccionAudiovisual }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item v-if="grupo.contexto">
            <v-card flat>
              <v-card-text>
                <p v-if="grupo.contexto && grupo.contexto.semblanzaBiografica">
                  <span class="font-weight-bold">Semblanza biográfica</span>
                  <hint hint="Los básicos curriculares de las personas encargadas de la investigación y de la coordinación de la colección"></hint>
                  <br>
                  {{ grupo.contexto.semblanzaBiografica }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item v-if="grupo.contenidoEstructura">
            <v-card flat>
              <v-card-text>
                <p v-if="grupo.contenidoEstructura && grupo.contenidoEstructura.alcanceContenido">
                  <span class="font-weight-bold">Alcance y contenido</span>
                  <hint hint="Se describe el valor potencial del proyecto y se señala para quiénes puede ser útil"></hint>
                  <br>
                  {{ grupo.contenidoEstructura.alcanceContenido }}
                </p>
                <p v-if="grupo.contenidoEstructura && grupo.contenidoEstructura.valoracionSeleccionEliminacion">
                  <span class="font-weight-bold">Valoración, selección y eliminación</span>
                  <hint hint="Se señala el criterio de selección y depuración de los materiales."></hint>
                  <br>
                  {{ grupo.contenidoEstructura.valoracionSeleccionEliminacion }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item v-if="grupo.accesoUso">
            <v-card flat>
              <v-card-text>
                <p v-if="grupo.accesoUso && grupo.accesoUso.condicionesAcceso">
                  <span class="font-weight-bold">Condiciones de acceso</span>
                  <hint hint="Posibles usos del material que pueden hacer las personas usuarias: Usos reservados para consulta in situ, Usos no lucrativos, Usos lucrativos."></hint>
                  <br>
                  {{ grupo.accesoUso.condicionesAcceso }}
                </p>
                <p v-if="grupo.accesoUso && grupo.accesoUso.condicionesReproduccion">
                  <span class="font-weight-bold">Condiciones de reproducción</span>
                  <hint hint="Se consigna si el registro original se puede reproducir o no, de acuerdo al tipo de solicitud."></hint>
                  <br>
                  {{ grupo.accesoUso.condicionesReproduccion }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item v-if="grupo.notas">
            <v-card flat>
              <v-card-text>
                <p v-if="grupo.notas && grupo.notas.notas">
                  <span class="font-weight-bold">Notas</span>
                  <hint hint="Información que se considere relevante y que no pudo ser indexada en algún otro campo"></hint>
                  <br>
                  {{ grupo.notas.notas }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item v-if="grupo.controlDescripcion">
            <v-card flat>
              <v-card-text>
                <p v-if="grupo.controlDescripcion && grupo.controlDescripcion.documentalista">
                  <span class="font-weight-bold">Documentalistas</span>
                  <hint hint="Se consignan los nombres de las personas que realizaron la descripción."></hint>
                  <br>
                  {{ grupo.controlDescripcion.documentalistas }}
                </p>
                <p v-if="grupo.controlDescripcion && grupo.controlDescripcion.fechaDescripcion">
                  <span class="font-weight-bold">Fecha de descripción</span>
                  <hint hint="Fecha en que se elaboró la ficha de la unidad"></hint>
                  <br>
                  {{ grupo.controlDescripcion.fechaDescripcion }}
                </p>
                <p v-if="grupo.controlDescripcion && grupo.controlDescripcion.fechaActualizacion">
                  <span class="font-weight-bold">Fecha de actualización</span>
                  <hint hint="Fecha de la última modificación a la ficha de la unidad"></hint>
                  <br>
                  {{ grupo.controlDescripcion.fechaActualizacion }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-col>

      <!-- Última columna con la información adicional -->
      <v-col xs="12" sm="12" md="5">
        <div v-if="grupo.adicional">
          <!-- Imagen @TODO cambiar por grupo.adicional.imagen -->
          <div :v-if="true">
            <p>
              <v-img :src="require('@/assets/Foto_Acervo1.png')" height="220px" contain></v-img>
            </p>
          </div>

          <!-- Presentación -->
          <div :v-if="grupo.adicional.presentacion">
            <vue-markdown breaks linkify :source="grupo.adicional.presentacion" class="text-justify"></vue-markdown>
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
  name: 'GrupoInfo',
  components: {
    VueMarkdown,
    Hint
  },
  props: {
    // El objeto coleccion representa un conjunto documental, es decir, un grupo jerarquico dentro de la organización del acervo
    // Nota: el objeto coleccion será obtenido desde la base de datos en futuras iteraciones del código
    grupo: { type: Object }
  },
  data: () => ({
    // Variables locales
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
