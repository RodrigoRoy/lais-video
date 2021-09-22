<!-- Componente que representa una ventana emergente (dialog) para una unidad documental -->
<template>
  <div>
    <!-- Título -->
    <v-toolbar flat color="primary" dark>
      <v-toolbar-title>{{ video.identificacion.titulo }}</v-toolbar-title>
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
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon small v-bind="attrs" v-on="on">
                          mdi-information
                        </v-icon>
                      </template>
                      <span>Código alfanumérico separado por guiones. Ejemplo: MXIM-AV-2-3-1-2</span>
                    </v-tooltip>
                    {{ video.identificacion.codigoReferencia }}

                </p>
                <p>
                  <span class="font-weight-bold">Título</span>
                  {{ video.identificacion.titulo }}
                </p>
                <p>
                  <span class="font-weight-bold">Fecha</span>
                  {{ video.identificacion.fecha | date}}
                  <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon small v-bind="attrs" v-on="on">
                          mdi-information
                        </v-icon>
                      </template>
                      <span>Fecha en que se hizo el registro</span>
                    </v-tooltip>
                </p>
                <p>
                  <span class="font-weight-bold">País</span>
                  {{ video.identificacion.pais }}
                  <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon small v-bind="attrs" v-on="on">
                          mdi-information
                        </v-icon>
                      </template>
                      <span>País o países de producción del registro en video</span>
                    </v-tooltip>
                </p>
                <p>
                  <span class="font-weight-bold">Lugar de registro</span>
                  {{ video.identificacion.lugar }}
                  <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon small v-bind="attrs" v-on="on">
                          mdi-information
                        </v-icon>
                      </template>
                      <span>Nombre del lugar o lugares, donde se llevó a cabo el registro, partiendo de lo particular a lo general</span>
                    </v-tooltip>
                </p>
                <p>
                  <span class="font-weight-bold">Duración</span>
                  {{ video.identificacion.duracion }} minutos
                  <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon small v-bind="attrs" v-on="on">
                          mdi-information
                        </v-icon>
                      </template>
                      <span>Se consigna la duración del registro en minutos</span>
                    </v-tooltip>
                </p>
                <p>
                  <span class="font-weight-bold">Persona entrevistada</span>
                  {{ video.identificacion.personasEntrevistadas }}
                  <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon small v-bind="attrs" v-on="on">
                          mdi-information
                        </v-icon>
                      </template>
                      <span>Persona que entabla un diálogo con la persona que dirige la entrevista</span>
                    </v-tooltip>
                </p>
                <p>
                  <span class="font-weight-bold">Persona que entrevista</span>
                  {{ video.identificacion.entrevistador }}
                  <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon small v-bind="attrs" v-on="on">
                          mdi-information
                        </v-icon>
                      </template>
                      <span>Persona encargada de realizar la entrevista</span>
                    </v-tooltip>
                </p>
                <p>
                  <span class="font-weight-bold">Cámara</span>
                  {{ video.identificacion.camara }}
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon small v-bind="attrs" v-on="on">
                          mdi-information
                        </v-icon>
                      </template>
                    <span>Persona encargada de operar la cámara de video</span>
                  </v-tooltip>
                </p>
                <p>
                  <span class="font-weight-bold">Asistente</span>
                  {{ video.identificacion.asistente }}
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon small v-bind="attrs" v-on="on">
                          mdi-information
                        </v-icon>
                      </template>
                    <span>Persona o personas encargadas de apoyar en diversas labores técnicas</span>
                  </v-tooltip>
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  <span class="font-weight-bold">Descripción general</span>
                  {{ video.contenidoEstructura.descripcionGeneral }}
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon small v-bind="attrs" v-on="on">
                          mdi-information
                        </v-icon>
                      </template>
                    <span>Contenido del material. Se describen los lugares, personas y/o acciones registradas, según tipos de plano, emplazamientos y movimientos</span>
                  </v-tooltip>
                </p>
                <p>
                  <span class="font-weight-bold">Estructura formal</span>
                  {{ video.contenidoEstructura.estructuraFormal }}
                </p>
                <p>
                  <span class="font-weight-bold">Descriptor onomástico</span>
                  {{ video.contenidoEstructura.descriptorOnomastico }}
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon small v-bind="attrs" v-on="on">
                          mdi-information
                        </v-icon>
                      </template>
                    <span>Nombres de las personas (nombre y apellido) que aparecen el registro</span>
                  </v-tooltip>

                </p>
                <p>
                  <span class="font-weight-bold">Descriptor toponímico</span>
                  {{ video.contenidoEstructura.descriptorToponimico }}
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon small v-bind="attrs" v-on="on">
                          mdi-information
                        </v-icon>
                      </template>
                    <span>Nombres de las localidades o sitios que aparecen en el registro</span>
                  </v-tooltip>

                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  <span class="font-weight-bold">Idioma original</span>
                  {{ video.accesoUso.idiomaOriginal }}
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon small v-bind="attrs" v-on="on">
                          mdi-information
                        </v-icon>
                      </template>
                    <span>Idioma o idiomas originales del registro</span>
                  </v-tooltip>
                </p>
                <p>
                  <span class="font-weight-bold">Soporte original</span>
                  {{ video.accesoUso.soporte }}
                </p>
                <p>
                  <span class="font-weight-bold">Sistema de grabación</span>
                  {{ video.accesoUso.sistemaGrabacion }}
                </p>
                <p>
                  <span class="font-weight-bold">Resolución de grabación</span>
                  {{ video.accesoUso.resolucionGrabacion }}
                </p>
                <p>
                  <span class="font-weight-bold">Formato de video digital</span>
                  {{ video.accesoUso.formatoVideoDigital }}
                </p>
                <p>
                  <span class="font-weight-bold">Número de casetes</span>
                  {{ video.accesoUso.numeroCasetes }}
                </p>
                <p>
                  <span class="font-weight-bold">Color</span>
                  {{ video.accesoUso.color }}
                </p>
                <p>
                  <span class="font-weight-bold">Audio</span>
                  {{ video.accesoUso.audio }}
                </p>
                <p>
                  <span class="font-weight-bold">Requisitos técnicos</span>
                  {{ video.accesoUso.requisitosTecnicos }}
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon small v-bind="attrs" v-on="on">
                          mdi-information
                        </v-icon>
                      </template>
                    <span>Equipo de reproducción o software que se requiere para visionar el material</span>
                  </v-tooltip>

                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  <span class="font-weight-bold">Unidades de descripción relacionadas</span>
                  {{ video.documentacionAsociada.unidadesDescripcionRelacionadas }}
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon small v-bind="attrs" v-on="on">
                          mdi-information
                        </v-icon>
                      </template>
                    <span>Relación que existe entre dos o más unidades de la misma colección a partir de coincidencias temáticas o conceptuales</span>
                  </v-tooltip>
                </p>
                <p>
                  <span class="font-weight-bold">Documentos asociados</span>
                  {{ video.documentacionAsociada.documentosAsociados }}
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon small v-bind="attrs" v-on="on">
                          mdi-information
                        </v-icon>
                      </template>
                    <span>Publicación o documento que tenga relación directa con la producción catalogada. La relación puede ser temática, autoral, etc.</span>
                  </v-tooltip>

                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  <span class="font-weight-bold">Notas</span>
                  {{ video.notas.notas }}
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon small v-bind="attrs" v-on="on">
                          mdi-information
                        </v-icon>
                      </template>
                    <span>Información que se considere relevante y que no pudo ser indexada en algún otro campo</span>
                  </v-tooltip>
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  <span class="font-weight-bold">Nombre del archivero</span>
                  {{ video.controlDescripcion.nombreArchivero }}
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon small v-bind="attrs" v-on="on">
                          mdi-information
                        </v-icon>
                      </template>
                    <span>Nombre completo de la persona que elaboró la ficha de la unidad</span>
                  </v-tooltip>
                </p>
                <!-- Nota: Este campo podría cambiar o eliminarse en el futuro -->
                <!-- <p>
                  <span class="font-weight-bold">Nota del archivero</span>
                  {{ video.controlDescripcion.notaArchivero }}
                </p> -->
                <p>
                  <span class="font-weight-bold">Fecha de descripción</span>
                  {{ video.controlDescripcion.fechaDescripcion | date}}
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon small v-bind="attrs" v-on="on">
                          mdi-information
                        </v-icon>
                      </template>
                    <span>Fecha en que se elaboró la ficha de la unidad</span>
                  </v-tooltip>
                </p>
                <p>
                  <span class="font-weight-bold">Fecha de actualización</span>
                  {{ video.controlDescripcion.fechaActualizacion | date}}
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon small v-bind="attrs" v-on="on">
                          mdi-information
                        </v-icon>
                      </template>
                    <span>Fecha de la última modificación a la ficha de la unidad</span>
                  </v-tooltip>
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
          <a href="Calificacion_preview.pdf" target="_blank"><v-icon left>mdi-file-document</v-icon>Documento de calificación</a>
        </p>
      </v-col>
    </v-row>
  </div>
</template>


<script>
export default {
  name: 'VideoInfo',
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
</style>
