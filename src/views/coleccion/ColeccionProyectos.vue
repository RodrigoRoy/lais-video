<template>
  <v-container>
    <h2 class="text-h3 text-center">Proyectos de investigación</h2>
    <v-breadcrumbs :items="items" class="justify-center"></v-breadcrumbs>

    <v-row no-gutters align="center" justify="start">
      <v-col cols="12" md="3" v-for="(coleccion, i) in colecciones" :key="i">
      <!-- <v-col cols="12" md="3" v-for="n in 16" :key="n"> -->
        <v-card class="ma-4 pa-4" outlined tile @click="goTo()">
          <v-img :src="require('@/assets/Caratulas_Proyectos/' + coleccion.adicional.imagen)" height="150px"></v-img>
          <v-card-title class="justify-center">
            <div class="text-truncate">
              {{ coleccion.identificacion.titulo }}
            </div>
          </v-card-title>
          <v-card-subtitle class="pb-0 text-center">
            {{ coleccion.identificacion.codigoReferencia }}
          </v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click.stop.prevent="dialog = true">
              <v-icon>mdi-more</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
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
            <v-col xs="12" sm="12" md="8">
              <v-tabs vertical>
                <v-tab>
                  <v-icon left>mdi-film</v-icon>
                  Identificación
                </v-tab>
                <v-tab>
                  <v-icon left>mdi-account-multiple</v-icon>
                  Contexto
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
                        <span class="font-weight-bold">País</span>
                        <br>
                        {{ coleccion.identificacion.pais }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Fecha</span>
                        <br>
                        {{ coleccion.identificacion.fecha }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Proyecto de investigación</span>
                        <br>
                        {{ coleccion.identificacion.proyectoInvestigacion }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Investigación</span>
                        <br>
                        {{ coleccion.identificacion.investigacion }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Coordinación del proyecto</span>
                        <br>
                        {{ coleccion.identificacion.coordinacionProyecto }}
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
                        {{ coleccion.contexto.historiaInstitucional }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Semblanza biográfica</span>
                        <br>
                        {{ coleccion.contexto.semblanzaBiografica }}
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
                        {{ coleccion.contenidoEstructura.alcanceContenido }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Valoración, selección y eliminación</span>
                        <br>
                        {{ coleccion.contenidoEstructura.valoracionSeleccionEliminacion }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Nuevos ingresos</span>
                        <br>
                        {{ coleccion.contenidoEstructura.nuevosIngresos }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Organización</span>
                        <br>
                        {{ coleccion.contenidoEstructura.organizacion }}
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
                        {{ coleccion.accesoUso.condicionesAcceso }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Condiciones de reproducción</span>
                        <br>
                        {{ coleccion.accesoUso.condicionesReproduccion }}
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
                        <span class="font-weight-bold">Documentalistas</span>
                        <br>
                        {{ coleccion.controlDescripcion.documentalistas }}
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
            <v-col xs="12" sm="12" md="4">
              <p>
                <v-img :src="require('@/assets/Foto_Acervo1.png')" height="220px"  contain></v-img>
              </p>
              <!-- Presentación -->
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis eleifend mi. Vestibulum id ex sit amet felis finibus tristique eu eu purus. Donec varius neque velit, sit amet tincidunt orci ullamcorper et. Ut ut eros cursus, auctor risus congue, convallis nulla. In laoreet in nisl sit amet pretium. In vehicula ipsum vel mauris pellentesque tincidunt. Proin eu bibendum enim. Praesent sit amet consequat orci.
              </p>
              <p>
                Cras lobortis pharetra purus, vitae feugiat turpis iaculis sit amet. Fusce euismod justo ut lacus imperdiet vulputate. Donec viverra quam vel urna varius, ac euismod leo fringilla. Phasellus sed arcu id diam blandit cursus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras aliquet consectetur enim, eget feugiat dolor ornare eu. Ut posuere maximus augue vel euismod.
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
        }
      },
      colecciones: [
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-1',
            titulo: 'Un Pueblo en la Memoria'
          },
          adicional: {
            imagen: 'Un pueblo 1.png'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-2',
            titulo: 'Tradición o Modernidad: Reto de una Generación. Testimonios del Arquitecto Luis Ortiz Macedo'
          },
          adicional: {
            imagen: 'Tradición o modernidad 1.png'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-3',
            titulo: 'El Buen Restaurador Ama Lo Antiguo. Testimonios del Arquitecto Ricardo de Robina'
          },
          adicional: {
            imagen: 'El Buen Restaurador  1.png'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-4',
            titulo: 'Cuando la Rumba Nos Conoció...'
          },
          adicional: {
            imagen: 'Cuando la Rumba Nos Conoció 1.png'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-5',
            titulo: 'Más vale paso que dure...'
          },
          adicional: {
            imagen: 'Foto_Acervo1.png'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-6',
            titulo: 'Mi Multi es Mi Multi. Historia del Multifamiliar Miguel Alemán'
          },
          adicional: {
            imagen: 'Mi multi 2.png'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-7',
            titulo: 'Km. C-62 Un nómada del riel'
          },
          adicional: {
            imagen: 'Km_1.png'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-8',
            titulo: 'El Arte de Hacer Ciudad. Testimonios del Arquitecto Mario Pani'
          },
          adicional: {
            imagen: 'El arte de hacer_2.png'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-9',
            titulo: 'Revelando el Rollo'
          },
          adicional: {
            imagen: 'Revelando el rollo_1.png'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-10',
            titulo: 'De dolor y esperanza. El asilo un pasado presente'
          },
          adicional: {
            imagen: 'Foto_Acervo1.png'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-11',
            titulo: 'Proyecto: Rudos vs. Técnicos/imágenes exitosas'
          },
          adicional: {
            imagen: 'Foto_Acervo1.png'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-12',
            titulo: 'El Triángulo de Tacubaya. Historia de Cine Hipódromo Condesa'
          },
          adicional: {
            imagen: 'Triángulo_1.png'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-13',
            titulo: 'Ciudad Olimpia: El Año que Fuimos Modernos'
          },
          adicional: {
            imagen: 'Ciudad Olimpia_2.png'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-14',
            titulo: 'De la Tele a la Boca… Una Reflexión sobre Desarrollo Infantil y Salud'
          },
          adicional: {
            imagen: 'De la TV_1.png'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-15',
            titulo: 'Más allá del reglamento. Avatares de un embajador mexicano, Vicente Muñiz arroyo 1974-1977'
          },
          adicional: {
            imagen: 'Foto_Acervo1.png'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-16',
            titulo: 'Trinchera sonora. Voces y miradas de Radio Venceremos'
          },
          adicional: {
            imagen: 'Trinchera_1.png'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-17',
            titulo: 'Región Transfronteriza México-Guatemala'
          },
          adicional: {
            imagen: 'Foto_Acervo1.png'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-18',
            titulo: 'Desaparición forzada y equipos de antropología forense: Diálogos en América Latina'
          },
          adicional: {
            imagen: 'Foto_Acervo1.png'
          }
        }
      ],
      items: [],
      dialog: false,
    }
  },
  methods: {
    goTo: function(){
      this.$router.push({name: 'coleccion-projects1'});
    },
  }
}
</script>
