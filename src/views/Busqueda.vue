<template>
  <v-container>
    <h2 class="text-h3 text-center">Búsqueda</h2>
    <v-text-field>
      <v-icon slot="append">mdi-magnify</v-icon>
    </v-text-field>

    <v-row no-gutters align="start" justify="start">
      <v-col cols="12" sm="3">
        <p>Menú de opciones</p>
        <v-card flat color="transparent">
          <!-- <v-subheader>Fecha</v-subheader> -->
          <v-card-text>
            <v-row>
              <v-col class="px-4">
                <v-select :items="sort" label="Ordenar por:"></v-select>

                <h3 class="mb-3 mt-8">Fecha</h3>

                <v-range-slider v-model="range" :max="max" :min="min" hide-details class="align-center" >
                  <template v-slot:prepend>
                    <v-text-field :value="range[0]" class="mt-0 pt-0" hide-details single-line type="number" style="width: 60px" @change="$set(range, 0, $event)" ></v-text-field>
                  </template>
                  <template v-slot:append>
                    <v-text-field :value="range[1]" class="mt-0 pt-0" hide-details single-line type="number" style="width: 60px" @change="$set(range, 1, $event)" ></v-text-field>
                  </template>
                </v-range-slider>

                <h3 class="mb-3 mt-8">Estructura formal</h3>

                <v-checkbox label="Entrevista controlada" class="my-0"></v-checkbox>
                <v-checkbox label="Entrevista en campo" class="my-0"></v-checkbox>
                <v-checkbox label="Entrevista con acción" class="my-0"></v-checkbox>
                <v-checkbox label="Entrevista con imágenes" class="my-0"></v-checkbox>
                <v-checkbox label="Grabación de campo" class="my-0"></v-checkbox>

                <h3 class="mb-3 mt-8">Soporte</h3>

                <v-checkbox label="Betacam" class="my-0"></v-checkbox>
                <v-checkbox label="Hi8" class="my-0"></v-checkbox>
                <v-checkbox label="DVCAM" class="my-0"></v-checkbox>
                <v-checkbox label="MiniDV" class="my-0"></v-checkbox>
                <v-checkbox label="Archivo digital" class="my-0"></v-checkbox>

                <h3 class="mb-3 mt-8">Formato de video</h3>

                <v-checkbox label="MOV" class="my-0"></v-checkbox>
                <v-checkbox label="AVCHD" class="my-0"></v-checkbox>
                <v-checkbox label="MTS" class="my-0"></v-checkbox>
                <v-checkbox label="MP4" class="my-0"></v-checkbox>
              </v-col>
            </v-row>


          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="9">
        <v-list two-line nav>
          <!-- <v-subheader>Recent chat</v-subheader> -->

          <v-list-item v-for="n in 16" :key="n" @click="dialog = true" class="my-3 py-0">
            <v-list-item-avatar size="100" tile>
              <v-img :src="require('@/assets/videopreview.png')"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="coleccion.identificacion.titulo"></v-list-item-title>
              <v-list-item-subtitle v-text="coleccion.identificacion.codigoReferencia"></v-list-item-subtitle>
              <v-list-item-subtitle v-text="coleccion.identificacion.fecha"></v-list-item-subtitle>
              <v-list-item-subtitle v-text="coleccion.contenidoEstructura.descripcionGeneral"></v-list-item-subtitle>
            </v-list-item-content>

            <!-- <v-list-item-icon>
              <v-icon>mdi_chat_bubble</v-icon>
            </v-list-item-icon> -->
          </v-list-item>
        </v-list>

        <!-- <v-container>
          <v-row no-gutters align="center" justify="center">
            <v-col cols="12" md="3" v-for="n in 16" :key="n">
              <v-card class="ma-4 pa-4" outlined tile @click="dialog = true">
                <v-img :src="require('@/assets/videopreview.png')" height="150px"></v-img>
                <v-card-title class="justify-center">
                  {{ coleccion.identificacion.titulo }}
                </v-card-title>
                <v-card-subtitle class="pb-0 text-center">
                  {{ coleccion.identificacion.codigoReferencia }}-{{n}}
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-container> -->
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" overlay-opacity="0.80">
      <v-card>
        <!-- <v-card-title class="headline">Información completa</v-card-title> -->
        <v-card-text>
          <v-toolbar flat color="primary" dark>
            <v-toolbar-title>{{ coleccion.identificacion.titulo }}</v-toolbar-title>
          </v-toolbar>
          <v-row>
            <v-col cols="8">
              <v-tabs vertical>
                <v-tab>
                  <v-icon left>mdi-film</v-icon>
                  Identificación
                </v-tab>
                <v-tab>
                  <v-icon left>mdi-book-open-page-variant</v-icon>
                  Contenido y <br>
                  estructura
                </v-tab>
                <v-tab>
                  <v-icon left>mdi-key</v-icon>
                  Acceso y uso
                </v-tab>
                <v-tab>
                  <v-icon left>mdi-paperclip</v-icon>
                  Documentación <br>
                  asociada
                </v-tab>
                <v-tab>
                  <v-icon left>mdi-lead-pencil</v-icon>
                  Notas
                </v-tab>
                <v-tab>
                  <v-icon left>mdi-account-details</v-icon>
                  Control de<br>
                  la descripción
                </v-tab>

                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <p>
                        <span class="font-weight-bold">Código de referencia</span>
                        <br>
                        {{ coleccion.identificacion.codigoReferencia }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Título</span>
                        <br>
                        {{ coleccion.identificacion.titulo }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Fecha</span>
                        <br>
                        {{ coleccion.identificacion.fecha }}
                      </p>
                      <p>
                        <span class="font-weight-bold">País</span>
                        <br>
                        {{ coleccion.identificacion.pais }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Lugar</span>
                        <br>
                        {{ coleccion.identificacion.lugar }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Duración</span>
                        <br>
                        {{ coleccion.identificacion.duracion }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Personas entrevistadas</span>
                        <br>
                        {{ coleccion.identificacion.personasEntrevistadas }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Entrevistador</span>
                        <br>
                        {{ coleccion.identificacion.entrevistador }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Cámara</span>
                        <br>
                        {{ coleccion.identificacion.camara }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Asistencia</span>
                        <br>
                        {{ coleccion.identificacion.asistente }}
                      </p>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <p>
                        <span class="font-weight-bold">Descripción general</span>
                        <br>
                        {{ coleccion.contenidoEstructura.descripcionGeneral }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Estructura formal</span>
                        <br>
                        {{ coleccion.contenidoEstructura.estructuraFormal }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Descriptor onomástico</span>
                        <br>
                        {{ coleccion.contenidoEstructura.descriptorOnomastico }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Descriptor toponímico</span>
                        <br>
                        {{ coleccion.contenidoEstructura.descriptorToponimico }}
                      </p>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <p>
                        <span class="font-weight-bold">Idioma original</span>
                        <br>
                        {{ coleccion.accesoUso.idiomaOriginal }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Soporte original</span>
                        <br>
                        {{ coleccion.accesoUso.soporte }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Sistema de grabación</span>
                        <br>
                        {{ coleccion.accesoUso.sistemaGrabacion }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Resolución de grabación</span>
                        <br>
                        {{ coleccion.accesoUso.resolucionGrabacion }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Formato de video digital</span>
                        <br>
                        {{ coleccion.accesoUso.formatoVideoDigital }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Número de casetes</span>
                        <br>
                        {{ coleccion.accesoUso.numeroCasetes }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Color</span>
                        <br>
                        {{ coleccion.accesoUso.color }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Audio</span>
                        <br>
                        {{ coleccion.accesoUso.audio }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Requisitos técnicos</span>
                        <br>
                        {{ coleccion.accesoUso.requisitosTecnicos }}
                      </p>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <p>
                        <span class="font-weight-bold">Existencia y localización de copias</span>
                        <br>
                        {{ coleccion.documentacionAsociada.existenciaLocalizacionCopias }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Unidades de descripción relacionadas</span>
                        <br>
                        {{ coleccion.documentacionAsociada.unidadesDescripcionRelacionadas }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Documentos asociados</span>
                        <br>
                        {{ coleccion.documentacionAsociada.documentosAsociados }}
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
                        {{ coleccion.notas.notas }}
                      </p>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <p>
                        <span class="font-weight-bold">Nombre del archivero</span>
                        <br>
                        {{ coleccion.controlDescripcion.nombreArchivero }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Nota del archivero</span>
                        <br>
                        {{ coleccion.controlDescripcion.notaArchivero }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Fecha de descripción</span>
                        <br>
                        {{ coleccion.controlDescripcion.fechaDescripcion }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Fecha de actualización</span>
                        <br>
                        {{ coleccion.controlDescripcion.fechaActualizacion }}
                      </p>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </v-col>
            <v-col cols="4">
              <p class="font-weight-bold">
                Portada
              </p>
              <p>
                <v-img :src="require('@/assets/videopreview.png')" height="150px"></v-img>
              </p>
              <p class="font-weight-bold">
                Video
              </p>
              <p>
                <video width="100%" height="250px" controls>
                  <source :src="require('@/assets/videoplayback.mp4')" type="video/mp4">
                  Tu navegador web no soporta la reproducción de video
                </video>
              </p>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      coleccion: {
        identificacion: {
          codigoReferencia: 'MXIM-AV-2-3-4',
          titulo: 'Lorem ipsum',
          fecha: new Date().toISOString().substr(0, 10),
          lugar: 'Nullam ipsum urna, dapibus scelerisque neque quis',
          pais: 'México',
          duración: '01:18:43',
          personasEntrevistadas: 'Sed Magna Sapien, Cras Vitae Lectus, Mollis Bibendum',
          entrevistador: 'Consectetur Adipiscing',
          camara: 'Praesent Rutrum',
          asistente: 'Malesuada Elit',
        },
        contenidoEstructura: {
          descripcionGeneral: 'Cras condimentum purus lectus, id dapibus massa laoreet sit amet. Proin sit amet dapibus justo. Maecenas id tempus arcu. Aliquam luctus eros ipsum, id ornare felis pharetra at.',
          estructuraFormal: 'Entrevista en campo',
          descriptorOnomastico: 'Pellentesque Venenatis, Velit ligula',
          descriptorToponimico: 'Congue Diam Gravida Vel',
        },
        accesoUso: {
          idiomaOriginal: 'Español',
          soporte: 'Hi8',
          numeroCasetes: '2',
          color: 'Color',
          audio: 'Estéreo',
          sistemaGrabacion: 'NTSC',
          resolucionGrabacion: '480p',
          formatoVideoDigital: 'MOV',
          requisitosTecnicos: 'Cras et purus sodales, lacinia neque id',
        },
        documentacionAsociada: {
          existenciaLocalizacionCopias: 'In hac habitasse platea dictumst. Mauris ac dapibus neque. Nunc faucibus est eget rhoncus scelerisque. Proin venenatis ante sit amet libero fermentum varius. Donec tempor aliquam pretium',
          unidadesDescripcionRelacionadas: 'Praesent faucibus pharetra nunc, quis venenatis nunc semper at. Suspendisse congue, leo convallis pulvinar convallis',
          documentosAsociados: 'Donec dapibus posuere maximus. Nam lacus enim, commodo vitae sodales non, sodales sed lacus. Sed eget feugiat nisl, non blandit massa. Mauris metus nisi, hendrerit nec tortor ac, molestie tempor dui. In gravida metus nibh, ut interdum tortor aliquam et. Sed eu sollicitudin dolor. Etiam vel nisl quam. Etiam ac velit id sapien rutrum tincidunt ac sed lorem. Suspendisse egestas consequat lectus ac rutrum. ',
        },
        notas: {
          notas: 'Praesent rutrum malesuada elit sed placerat. In hac habitasse platea dictumst. Mauris ac dapibus neque. Nunc faucibus est eget rhoncus scelerisque. Proin venenatis ante sit amet libero fermentum varius. Donec tempor aliquam pretium. Praesent faucibus pharetra nunc, quis venenatis nunc semper at. Suspendisse congue, leo convallis pulvinar convallis, mauris est bibendum felis, sed dignissim urna elit vel nibh. Vestibulum viverra dolor nec tempus ullamcorper. Pellentesque venenatis velit ligula, ac congue diam gravida vel.',
        },
        controlDescripcion: {
          nombreArchivero: 'Aenean Vehicula',
          notaArchivero: 'Ut vel mi in justo commodo euismod sed non felis. Donec a libero lobortis, hendrerit est ut, porta enim. Duis dictum leo sit amet enim hendrerit semper',
          fechaDescripcion: new Date().toISOString().substr(0, 10),
          fechaActualizacion: new Date().toISOString().substr(0, 10),
        }
      },
      items: [
        {
          text: 'Grupo',
          disabled: false,
          href: 'coleccion',
        },
        {
          text: 'Subgrupo 1',
          disabled: false,
          href: 'coleccion',
        },
        {
          text: 'Subgrupo 2',
          disabled: false,
          href: 'coleccion',
        },
        {
          text: 'Subgrupo 3',
          disabled: true,
          href: 'coleccion',
        }
      ],
      dialog: false,
      full: false,
      min: 1992,
      max: 2020,
      slider: 40,
      range: [1992, 2020],
      sort: [
        'Relevancia',
        'Fecha del video',
        'Fecha de creación',
        'Código de referencia',
      ],
      mode: [
        'Ascendente',
        'Descendente'
      ],
    }
  },
  methods: {

  }
}
</script>
