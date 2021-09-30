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
          <v-tab class="align-left-tab">
            <v-icon left>mdi-film</v-icon>
            Identificación
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
            <v-icon left>mdi-paperclip</v-icon>
            Documentación <br>
            asociada
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

          <!-- Información de los campos del registro de video -->
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  <span class="font-weight-bold">Código de referencia</span>
                    <Hint hint="Código alfanumérico separado por guines. Ejemplo: MXIM-AV-2-3-1"></Hint>
                    {{ video.identificacion.codigoReferencia }}
                </p>
                <p>
                  <span class="font-weight-bold">Fecha</span>
                  <Hint hint="Fecha en que se hizo el registro"></Hint>
                  {{ video.identificacion.fecha | date}}
                </p>
                <p>
                  <span class="font-weight-bold">País</span>
                  <Hint hint="País o países de producción del registro en video"></Hint>
                  {{ video.identificacion.pais }}
                </p>
                <p>
                  <span class="font-weight-bold">Lugar de registro</span>
                  <Hint hint="Nombre del lugar o lugares, donde se llevó a cabo el registro, partiendo de lo particular a lo general"></Hint>
                  {{ video.identificacion.lugar }}
                </p>
                <p>
                  <span class="font-weight-bold">Duración</span>
                  <Hint hint="Se consigna la duración del registro en minutos"></Hint>
                  {{ video.identificacion.duracion }} minutos
                </p>
                <p>
                  <span class="font-weight-bold">Persona entrevistada</span>
                  <Hint hint="Persona que entabla un diálogo con la persona que dirige la entrevista"></Hint>
                  {{ video.identificacion.personasEntrevistadas }}
                </p>
                <p>
                  <span class="font-weight-bold">Persona que entrevista</span>
                  <Hint hint="Persona encargada de realizar la entrevista"></Hint>
                  {{ video.identificacion.entrevistador }}
                </p>
                <p>
                  <span class="font-weight-bold">Cámara</span>
                  <Hint hint="Persona encargada de operar la cámara de video"></Hint>
                  {{ video.identificacion.camara }}
                </p>
                <p>
                  <span class="font-weight-bold">Asistente</span>
                  <Hint hint="Persona o personas encargadas de apoyar en diversas labores técnicas"></Hint>
                  {{ video.identificacion.asistente }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  <span class="font-weight-bold">Descripción general</span>
                  <Hint hint="Contenido del material. Se describen los lugares, personas y/o acciones registradas, según tipos de plano, emplazamientos y movimientos"></Hint>
                  {{ video.contenidoEstructura.descripcionGeneral }}
                </p>
                <p>
                  <span class="font-weight-bold">Estructura formal</span>
                  <Hint hint="Tipo de registro: grabación en campo, registro con entrevista o registro de materiales"></Hint>
                  {{ video.contenidoEstructura.estructuraFormal }}
                </p>
                <p>
                  <span class="font-weight-bold">Descriptor onomástico</span>
                  <Hint hint="Nombres de las personas (nombre y apellido) que aparecen el registro"></Hint>
                  {{ video.contenidoEstructura.descriptorOnomastico }}

                </p>
                <p>
                  <span class="font-weight-bold">Descriptor toponímico</span>
                  <Hint hint="Nombres de las localidades o sitios que aparecen en el registro"></Hint>
                  {{ video.contenidoEstructura.descriptorToponimico }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  <span class="font-weight-bold">Idioma original</span>
                  <Hint hint="Idioma o idiomas originales del registro"></Hint>
                  {{ video.accesoUso.idiomaOriginal }}
                </p>
                <p>
                  <span class="font-weight-bold">Soporte original</span>
                  <Hint hint="Soporte del material: Betacam, Hi8, DVCAM, MiniDV o Archivo digital."></Hint>
                  {{ video.accesoUso.soporte }}
                </p>
                <p>
                  <span class="font-weight-bold">Sistema de grabación</span>
                  <Hint hint="Sistema de grabación y reproducción de los registros: NTSC, PAL o SECAM."></Hint>
                  {{ video.accesoUso.sistemaGrabacion }}
                </p>
                <p>
                  <span class="font-weight-bold">Resolución de grabación</span>
                  <Hint hint="Número de píxeles que puede mostrar el registro en video."></Hint>
                  {{ video.accesoUso.resolucionGrabacion }}
                </p>
                <p>
                  <span class="font-weight-bold">Formato de video digital</span>
                  <Hint hint="Formato de archivo que almacena los datos del video digital en una computadora."></Hint>
                  {{ video.accesoUso.formatoVideoDigital }}
                </p>
                <p>
                  <span class="font-weight-bold">Número de casetes</span>
                  <Hint hint="Número de casetes que conforman la entrevista."></Hint>
                  {{ video.accesoUso.numeroCasetes }}
                </p>
                <p>
                  <span class="font-weight-bold">Color</span>
                  <Hint hint="Se consigna si el registro es a color o blanco y negro."></Hint>
                  {{ video.accesoUso.color }}
                </p>
                <p>
                  <span class="font-weight-bold">Audio</span>
                  <Hint hint="Sistema de audio en que se encuentra la producción."></Hint>
                  {{ video.accesoUso.audio }}
                </p>
                <p>
                  <span class="font-weight-bold">Requisitos técnicos</span>
                  <Hint hint="Equipo de reproducción o software que se requiere para visionar el material"></Hint>
                  {{ video.accesoUso.requisitosTecnicos }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  <span class="font-weight-bold">Unidades de descripción relacionadas</span>
                  <Hint hint="Relación que existe entre dos o más unidades de la misma colección a partir de coincidencias temáticas o conceptuales"></Hint>
                  {{ video.documentacionAsociada.unidadesDescripcionRelacionadas }}
                </p>
                <p>
                  <span class="font-weight-bold">Documentos asociados</span>
                  <Hint hint="Publicación o documento que tenga relación directa con la producción catalogada. La relación puede ser temática, autoral, etc."></Hint>
                  {{ video.documentacionAsociada.documentosAsociados }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  <span class="font-weight-bold">Notas</span>
                  <Hint hint="Información que se considere relevante y que no pudo ser indexada en algún otro campo"></Hint>
                  {{ video.notas.notas }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  <span class="font-weight-bold">Nombre del archivero</span>
                  <Hint hint="Nombre completo de la persona que elaboró la ficha de la unidad"></Hint>
                  {{ video.controlDescripcion.nombreArchivero }}
                </p>
                <!-- Nota: Este campo podría cambiar o eliminarse en el futuro -->
                <!-- <p>
                  <span class="font-weight-bold">Nota del archivero</span>
                  {{ video.controlDescripcion.notaArchivero }}
                </p> -->
                <p>
                  <span class="font-weight-bold">Fecha de descripción</span>
                  <Hint hint="Fecha en que se elaboró la ficha de la unidad"></Hint>
                  {{ video.controlDescripcion.fechaDescripcion | date}}
                </p>
                <p>
                  <span class="font-weight-bold">Fecha de actualización</span>
                  <Hint hint="Fecha de la última modificación a la ficha de la unidad"></Hint>
                  {{ video.controlDescripcion.fechaActualizacion | date}}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-col>

      <!-- Última columna con la información adicional de documentos -->
      <v-col xs="12" sm="12" md="4">
        <p class="font-weight-bold">
          <v-icon left>mdi-image</v-icon>Imagen
        </p>
        <p>
          <v-img :src="require('@/assets/videopreview2.png')" height="220px"  contain></v-img>
        </p>
        <p class="font-weight-bold">
          <v-icon left>mdi-video</v-icon>Fragmento del registro
        </p>
        <p>
          <video width="100%" height="240px" controls>
            <source :src="require('@/assets/videoplayback2.mp4')" type="video/mp4">
            Tu navegador web no soporta la reproducción de video
          </video>
        </p>
        <p>
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
