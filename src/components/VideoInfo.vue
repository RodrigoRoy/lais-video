<!-- Componente que representa una ventana emergente (dialog) para una unidad documental -->
<template>
  <div>
    <!-- Título -->
    <v-toolbar flat color="primary" dark>
      <v-toolbar-title>{{ video.identificacion.codigoReferencia }}</v-toolbar-title>
    </v-toolbar>

    <!-- Uso de filas y columnas para dividir la información en áreas, campos e información adicional (imagen, video, documentos) -->
    <v-row>
      <v-col xs="12" sm="12" md="8">
        <!-- $vuetify.breakpoint.xs permite cambiar layout cuando la pantalla es muy pequeña (dispositivos móviles) -->
        <v-tabs :class="{'v-tabs--vertical': !$vuetify.breakpoint.xs}" show-arrows>
          <v-tab class="align-left-tab" v-if="video.identificacion">
            <v-icon left>mdi-film</v-icon>
            Identificación
          </v-tab>
          <v-tab class="align-left-tab" v-if="video.contenidoEstructura">
            <v-icon left>mdi-book-open-page-variant</v-icon>
            Contenido y <br>
            estructura
          </v-tab>
          <v-tab class="align-left-tab" v-if="video.accesoUso">
            <v-icon left>mdi-key</v-icon>
            Acceso y uso
          </v-tab>
          <v-tab class="align-left-tab" v-if="video.documentacionAsociada">
            <v-icon left>mdi-paperclip</v-icon>
            Documentación <br>
            asociada
          </v-tab>
          <v-tab class="align-left-tab" v-if="video.notas">
            <v-icon left>mdi-lead-pencil</v-icon>
            Notas
          </v-tab>
          <v-tab class="align-left-tab" v-if="video.controlDescripcion">
            <v-icon left>mdi-account-details</v-icon>
            Control de<br>
            la descripción
          </v-tab>

          <!-- Información de los campos del registro de video -->
          <v-tab-item v-if="video.identificacion">
            <v-card flat>
              <v-card-text>
                <p v-if="video.identificacion.codigoReferencia">
                  <span class="font-weight-bold">Código de referencia</span>
                    <hint hint="Código alfanumérico separado por guines. Ejemplo: MXIM-AV-2-3-1"></hint>
                    {{ video.identificacion.codigoReferencia }}
                </p>
                <p v-if="video.identificacion.fecha">
                  <span class="font-weight-bold">Fecha</span>
                  <hint hint="Fecha en que se hizo el registro"></hint>
                  {{ video.identificacion.fecha | date}}
                </p>
                <p v-if="video.identificacion.pais">
                  <span class="font-weight-bold">País</span>
                  <hint hint="País o países de producción del registro en video"></hint>
                  {{ video.identificacion.pais }}
                </p>
                <p v-if="video.identificacion.lugar">
                  <span class="font-weight-bold">Lugar de registro</span>
                  <hint hint="Nombre del lugar o lugares, donde se llevó a cabo el registro, partiendo de lo particular a lo general"></hint>
                  {{ video.identificacion.lugar }}
                </p>
                <p v-if="video.identificacion.duracion">
                  <span class="font-weight-bold">Duración</span>
                  <hint hint="Se consigna la duración del registro en minutos"></hint>
                  {{ video.identificacion.duracion }} minutos
                </p>
                <p v-if="video.identificacion.personasEntrevistadas">
                  <span class="font-weight-bold">Persona entrevistada</span>
                  <hint hint="Persona que entabla un diálogo con la persona que dirige la entrevista"></hint>
                  {{ video.identificacion.personasEntrevistadas }}
                </p>
                <p v-if="video.identificacion.entrevistador">
                  <span class="font-weight-bold">Persona que entrevista</span>
                  <hint hint="Persona encargada de realizar la entrevista"></hint>
                  {{ video.identificacion.entrevistador }}
                </p>
                <p v-if="video.identificacion.camara">
                  <span class="font-weight-bold">Cámara</span>
                  <hint hint="Persona encargada de operar la cámara de video"></hint>
                  {{ video.identificacion.camara }}
                </p>
                <p v-if="video.identificacion.asistente">
                  <span class="font-weight-bold">Asistente</span>
                  <hint hint="Persona o personas encargadas de apoyar en diversas labores técnicas"></hint>
                  {{ video.identificacion.asistente }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item v-if="video.contenidoEstructura">
            <v-card flat>
              <v-card-text>
                <p v-if="video.contenidoEstructura.descripcionGeneral">
                  <span class="font-weight-bold">Descripción general</span>
                  <hint hint="Contenido del material. Se describen los lugares, personas y/o acciones registradas, según tipos de plano, emplazamientos y movimientos"></hint>
                  {{ video.contenidoEstructura.descripcionGeneral }}
                </p>
                <p v-if="video.contenidoEstructura.estructuraFormal">
                  <span class="font-weight-bold">Estructura formal</span>
                  <hint hint="Tipo de registro: grabación en campo, registro con entrevista o registro de materiales"></hint>
                  {{ video.contenidoEstructura.estructuraFormal }}
                </p>
                <p v-if="video.contenidoEstructura.descriptorOnomastico">
                  <span class="font-weight-bold">Descriptor onomástico</span>
                  <hint hint="Nombres de las personas (nombre y apellido) que aparecen el registro"></hint>
                  {{ video.contenidoEstructura.descriptorOnomastico }}

                </p>
                <p v-if="video.contenidoEstructura.descriptorToponimico">
                  <span class="font-weight-bold">Descriptor toponímico</span>
                  <hint hint="Nombres de las localidades o sitios que aparecen en el registro"></hint>
                  {{ video.contenidoEstructura.descriptorToponimico }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item v-if="video.accesoUso">
            <v-card flat>
              <v-card-text>
                <p v-if="video.accesoUso.idiomaOriginal">
                  <span class="font-weight-bold">Idioma original</span>
                  <hint hint="Idioma o idiomas originales del registro"></hint>
                  {{ video.accesoUso.idiomaOriginal }}
                </p>
                <p v-if="video.accesoUso.soporte">
                  <span class="font-weight-bold">Soporte original</span>
                  <hint hint="Soporte del material: Betacam, Hi8, DVCAM, MiniDV o Archivo digital."></hint>
                  {{ video.accesoUso.soporte }}
                </p>
                <p v-if="video.accesoUso.sistemaGrabacion">
                  <span class="font-weight-bold">Sistema de grabación</span>
                  <hint hint="Sistema de grabación y reproducción de los registros: NTSC, PAL o SECAM."></hint>
                  {{ video.accesoUso.sistemaGrabacion }}
                </p>
                <p v-if="video.accesoUso.resolucionGrabacion">
                  <span class="font-weight-bold">Resolución de grabación</span>
                  <hint hint="Número de píxeles que puede mostrar el registro en video."></hint>
                  {{ video.accesoUso.resolucionGrabacion }}
                </p>
                <p v-if="video.accesoUso.formatoVideoDigital">
                  <span class="font-weight-bold">Formato de video digital</span>
                  <hint hint="Formato de archivo que almacena los datos del video digital en una computadora."></hint>
                  {{ video.accesoUso.formatoVideoDigital }}
                </p>
                <p v-if="video.accesoUso.numeroCasetes">
                  <span class="font-weight-bold">Número de casetes</span>
                  <hint hint="Número de casetes que conforman la entrevista."></hint>
                  {{ video.accesoUso.numeroCasetes }}
                </p>
                <p v-if="video.accesoUso.color">
                  <span class="font-weight-bold">Color</span>
                  <hint hint="Se consigna si el registro es a color o blanco y negro."></hint>
                  {{ video.accesoUso.color }}
                </p>
                <p v-if="video.accesoUso.audio">
                  <span class="font-weight-bold">Audio</span>
                  <hint hint="Sistema de audio en que se encuentra la producción."></hint>
                  {{ video.accesoUso.audio }}
                </p>
                <p v-if="video.accesoUso.requisitosTecnicos">
                  <span class="font-weight-bold">Requisitos técnicos</span>
                  <hint hint="Equipo de reproducción o software que se requiere para visionar el material"></hint>
                  {{ video.accesoUso.requisitosTecnicos }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item v-if="video.documentacionAsociada">
            <v-card flat>
              <v-card-text>
                <p v-if="video.documentacionAsociada.unidadesDescripcionRelacionadas">
                  <span class="font-weight-bold">Unidades de descripción relacionadas</span>
                  <hint hint="Relación que existe entre dos o más unidades de la misma colección a partir de coincidencias temáticas o conceptuales"></hint>
                  {{ video.documentacionAsociada.unidadesDescripcionRelacionadas }}
                </p>
                <p v-if="video.documentacionAsociada.documentosAsociados">
                  <span class="font-weight-bold">Documentos asociados</span>
                  <hint hint="Publicación o documento que tenga relación directa con la producción catalogada. La relación puede ser temática, autoral, etc."></hint>
                  {{ video.documentacionAsociada.documentosAsociados }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item v-if="video.notas">
            <v-card flat>
              <v-card-text>
                <p v-if="video.notas.notas">
                  <span class="font-weight-bold">Notas</span>
                  <hint hint="Información que se considere relevante y que no pudo ser indexada en algún otro campo"></hint>
                  {{ video.notas.notas }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item v-if="video.controlDescripcion">
            <v-card flat>
              <v-card-text>
                <p v-if="video.controlDescripcion.nombreArchivero">
                  <span class="font-weight-bold">Nombre del archivero</span>
                  <hint hint="Nombre completo de la persona que elaboró la ficha de la unidad"></hint>
                  {{ video.controlDescripcion.nombreArchivero }}
                </p>
                <!-- Nota: Este campo podría cambiar o eliminarse en el futuro -->
                <!-- <p v-if="video.controlDescripcion.notaArchivero">
                  <span class="font-weight-bold">Nota del archivero</span>
                  <hint hint=""></hint>
                  {{ video.controlDescripcion.notaArchivero }}
                </p> -->
                <p v-if="video.controlDescripcion.fechaDescripcion">
                  <span class="font-weight-bold">Fecha de descripción</span>
                  <hint hint="Fecha en que se elaboró la ficha de la unidad"></hint>
                  {{ video.controlDescripcion.fechaDescripcion | date}}
                </p>
                <p v-if="video.controlDescripcion.fechaActualizacion">
                  <span class="font-weight-bold">Fecha de actualización</span>
                  <hint hint="Fecha de la última modificación a la ficha de la unidad"></hint>
                  {{ video.controlDescripcion.fechaActualizacion | date}}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-col>

      <!-- Última columna con la información adicional de documentos -->
      <v-col xs="12" sm="12" md="4">
        <!-- Imagen @TODO cambiar por video.adicional.imagen -->
        <div :v-if="true">
          <p class="font-weight-bold">
            <v-icon left>mdi-image</v-icon>Imagen
          </p>
          <p>
            <v-img :src="require('@/assets/videopreview2.png')" height="220px"  contain></v-img>
          </p>
        </div>

        <!-- Video @TODO cambiar por video.adicional.video -->
        <div :v-if="true">
          <p class="font-weight-bold">
            <v-icon left>mdi-video</v-icon>Fragmento del registro
          </p>
          <p>
            <video width="100%" height="240px" controls>
              <source :src="require('@/assets/videoplayback2.mp4')" type="video/mp4">
              Tu navegador web no soporta la reproducción de video
            </video>
          </p>
        </div>

        <!-- Calificación @TODO cambiar por video.adicional.calificacion -->
        <p :v-if="true">
          <a href="Calificacion_preview.pdf" target="_blank" class="font-weight-bold"><v-icon left>mdi-file-document</v-icon>Calificación</a>
        </p>
      </v-col>
    </v-row>
  </div>
</template>


<script>
import Hint from '@/components/Hint.vue'

export default {
  name: 'VideoInfo',
  components: {
    Hint
  },
  props: { // Propiedades (sólo lectura) o argumentos para el componente
    video: { type: Object } // archivo audiovisual organizado por áreas
  }
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
