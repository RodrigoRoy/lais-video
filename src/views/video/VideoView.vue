<!-- Vista de las unidades documentales (registros en video)
Se reutiliza la misma vista para cualquier conjunto con unidades documentales -->

<template>
  <v-container>
    <!-- Encabezado con título del conjunto y el camino dentro de la colección (breadcrumbs) -->
    <h2 class="text-h3 text-center">Entrevista controlada (ejemplo)</h2>
    <v-breadcrumbs :items="breadcrumbs" class="justify-center"></v-breadcrumbs>

    <!-- Organización del espacio en filas y columnas de recuadros (cards) donde cada uno representa un video -->
    <v-row no-gutters align="center" justify="center">
      <v-col cols="12" md="3" v-for="n in 16" :key="n">
        <v-card class="ma-4 pa-4" outlined tile @click="dialog = true">
          <v-img :src="require('@/assets/videopreview.png')" height="150px"></v-img>
          <v-card-title class="justify-center">
            {{ video.identificacion.titulo }}
          </v-card-title>
          <v-card-subtitle class="pb-0 text-center">
            {{ video.identificacion.codigoReferencia }}-{{n}}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- Diseño de la ventana emergente (dialog) que muestra toda la información del video -->
    <!-- El diseño se basa en usar un elemento card con pestañas (tabs) y una columna adicional con una imagen, video y documentación -->
    <v-dialog v-model="dialog" overlay-opacity="0.80">
      <v-card>
        <!-- <v-card-title class="headline">Información completa</v-card-title> -->
        <v-card-text>
          <v-toolbar flat color="primary" dark>
            <v-toolbar-title>{{ video.identificacion.titulo }}</v-toolbar-title>
          </v-toolbar>
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

                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <p>
                        <span class="font-weight-bold">Código de referencia</span>
                          {{ video.identificacion.codigoReferencia }}
                        <span @mouseover="upHint0 = true" @mouseleave="upHint0 = false">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5c6cc4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <circle cx="12" cy="12" r="9" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                          <polyline points="11 12 12 12 12 16 13 16" />
                          </svg>
                          <span v-show="upHint0">Código alfanumérico separado por guiones. Ejemplo: MXIM-AV-2-3-1-2</span>
                        </span>
                      </p>
                      <p>
                        <span class="font-weight-bold">Título</span>
                        {{ video.identificacion.titulo }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Fecha</span>
                        {{ video.identificacion.fecha | date}}

                        <span @mouseover="upHint1 = true" @mouseleave="upHint1 = false">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5c6cc4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <circle cx="12" cy="12" r="9" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                          <polyline points="11 12 12 12 12 16 13 16" />
                          </svg>
                          <span v-show="upHint1">Fecha en que se hizo el registro</span>
                        </span>
                      </p>
                      <p>
                        <span class="font-weight-bold">País</span>
                        {{ video.identificacion.pais }}

                        <span @mouseover="upHint2 = true" @mouseleave="upHint2 = false">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5c6cc4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <circle cx="12" cy="12" r="9" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                          <polyline points="11 12 12 12 12 16 13 16" />
                          </svg>
                          <span v-show="upHint2">País o países de producción del registro en video</span>
                        </span>
                      </p>
                      <p>
                        <span class="font-weight-bold">Lugar de registro</span>
                        {{ video.identificacion.lugar }}

                        <span @mouseover="upHint3 = true" @mouseleave="upHint3 = false">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5c6cc4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <circle cx="12" cy="12" r="9" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                          <polyline points="11 12 12 12 12 16 13 16" />
                          </svg>
                          <span v-show="upHint3">Nombre del lugar o lugares, donde se llevó a cabo el registro, partiendo de lo particular a lo general</span>
                        </span>
                      </p>
                      <p>
                        <span class="font-weight-bold">Duración</span>
                        {{ video.identificacion.duracion }} minutos

                        <span @mouseover="upHint4 = true" @mouseleave="upHint4 = false">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5c6cc4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <circle cx="12" cy="12" r="9" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                          <polyline points="11 12 12 12 12 16 13 16" />
                          </svg>
                          <span v-show="upHint4">Se consigna la duración del registro en minutos</span>
                        </span>
                      </p>
                      <p>
                        <span class="font-weight-bold">Persona entrevistada</span>
                        {{ video.identificacion.personasEntrevistadas }}

                        <span @mouseover="upHint5 = true" @mouseleave="upHint5 = false">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5c6cc4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <circle cx="12" cy="12" r="9" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                          <polyline points="11 12 12 12 12 16 13 16" />
                          </svg>
                          <span v-show="upHint5">Persona que entabla un diálogo con la persona que dirige la entrevista</span>
                        </span>
                      </p>
                      <p>
                        <span class="font-weight-bold">Persona que entrevista</span>
                        {{ video.identificacion.entrevistador }}

                        <span @mouseover="upHint6 = true" @mouseleave="upHint6 = false">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5c6cc4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <circle cx="12" cy="12" r="9" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                          <polyline points="11 12 12 12 12 16 13 16" />
                          </svg>
                          <span v-show="upHint6">Persona encargada de realizar la entrevista</span>
                        </span>
                      </p>
                      <p>
                        <span class="font-weight-bold">Cámara</span>
                        {{ video.identificacion.camara }}

                        <span @mouseover="upHint7 = true" @mouseleave="upHint7 = false">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5c6cc4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <circle cx="12" cy="12" r="9" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                          <polyline points="11 12 12 12 12 16 13 16" />
                          </svg>
                          <span v-show="upHint7">Persona encargada de operar la cámara de video</span>
                        </span>
                      </p>
                      <p>
                        <span class="font-weight-bold">Asistente</span>
                        {{ video.identificacion.asistente }}

                        <span @mouseover="upHint8 = true" @mouseleave="upHint8 = false">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5c6cc4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <circle cx="12" cy="12" r="9" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                          <polyline points="11 12 12 12 12 16 13 16" />
                          </svg>
                          <span v-show="upHint8">Persona o personas encargadas de apoyar en diversas labores técnicas</span>
                        </span>
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

                        <span @mouseover="upHint9 = true" @mouseleave="upHint9 = false">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5c6cc4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <circle cx="12" cy="12" r="9" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                          <polyline points="11 12 12 12 12 16 13 16" />
                          </svg>
                          <span v-show="upHint9">Contenido del material. Se describen los lugares, personas y/o acciones registradas, según tipos de plano, emplazamientos y movimientos</span>
                        </span>
                      </p>
                      <p>
                        <span class="font-weight-bold">Estructura formal</span>
                        {{ video.contenidoEstructura.estructuraFormal }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Descriptor onomástico</span>
                        {{ video.contenidoEstructura.descriptorOnomastico }}

                        <span @mouseover="upHint10 = true" @mouseleave="upHint10 = false">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5c6cc4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <circle cx="12" cy="12" r="9" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                          <polyline points="11 12 12 12 12 16 13 16" />
                          </svg>
                          <span v-show="upHint10">Nombres de las personas (nombre y apellido) que aparecen el registro</span>
                        </span>
                      </p>
                      <p>
                        <span class="font-weight-bold">Descriptor toponímico</span>
                        {{ video.contenidoEstructura.descriptorToponimico }}

                        <span @mouseover="upHint11 = true" @mouseleave="upHint11 = false">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5c6cc4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <circle cx="12" cy="12" r="9" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                          <polyline points="11 12 12 12 12 16 13 16" />
                          </svg>
                          <span v-show="upHint11">Nombres de las localidades o sitios que aparecen en el registro</span>
                        </span>
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

                        <span @mouseover="upHint12 = true" @mouseleave="upHint12 = false">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5c6cc4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <circle cx="12" cy="12" r="9" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                          <polyline points="11 12 12 12 12 16 13 16" />
                          </svg>
                          <span v-show="upHint12">Idioma o idiomas originales del registro</span>
                        </span>
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

                        <span @mouseover="upHint13 = true" @mouseleave="upHint13 = false">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5c6cc4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <circle cx="12" cy="12" r="9" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                          <polyline points="11 12 12 12 12 16 13 16" />
                          </svg>
                          <span v-show="upHint13">Equipo de reproducción o software que se requiere para visionar el material</span>
                        </span>
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

                        <span @mouseover="upHint14 = true" @mouseleave="upHint14 = false">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5c6cc4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <circle cx="12" cy="12" r="9" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                          <polyline points="11 12 12 12 12 16 13 16" />
                          </svg>
                          <span v-show="upHint14">Relación que existe entre dos o más unidades de la misma colección a partir de coincidencias temáticas o conceptuales</span>
                        </span>
                      </p>
                      <p>
                        <span class="font-weight-bold">Documentos asociados</span>
                        {{ video.documentacionAsociada.documentosAsociados }}

                        <span @mouseover="upHint15 = true" @mouseleave="upHint15 = false">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5c6cc4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <circle cx="12" cy="12" r="9" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                          <polyline points="11 12 12 12 12 16 13 16" />
                          </svg>
                          <span v-show="upHint15">Publicación o documento que tenga relación directa con la producción catalogada. La relación puede ser temática, autoral, etc.</span>
                        </span>
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

                        <span @mouseover="upHint16 = true" @mouseleave="upHint16 = false">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5c6cc4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <circle cx="12" cy="12" r="9" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                          <polyline points="11 12 12 12 12 16 13 16" />
                          </svg>
                          <span v-show="upHint16">Información que se considere relevante y que no pudo ser indexada en algún otro campo</span>
                        </span>
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

                        <span @mouseover="upHint17 = true" @mouseleave="upHint17 = false">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5c6cc4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <circle cx="12" cy="12" r="9" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                          <polyline points="11 12 12 12 12 16 13 16" />
                          </svg>
                          <span v-show="upHint17">Nombre completo de la persona que elaboró la ficha de la unidad</span>
                        </span>
                      </p>
                      <!-- Nota: Este campo podría cambiar o eliminarse en el futuro -->
                      <!-- <p>
                        <span class="font-weight-bold">Nota del archivero</span>
                        {{ video.controlDescripcion.notaArchivero }}
                      </p> -->
                      <p>
                        <span class="font-weight-bold">Fecha de descripción</span>
                        {{ video.controlDescripcion.fechaDescripcion | date}}

                        <span @mouseover="upHint18 = true" @mouseleave="upHint18 = false">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5c6cc4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <circle cx="12" cy="12" r="9" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                          <polyline points="11 12 12 12 12 16 13 16" />
                          </svg>
                          <span v-show="upHint18">Fecha en que se elaboró la ficha de la unidad</span>
                        </span>
                      </p>
                      <p>
                        <span class="font-weight-bold">Fecha de actualización</span>
                        {{ video.controlDescripcion.fechaActualizacion | date}}

                        <span @mouseover="upHint19 = true" @mouseleave="upHint19 = false">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5c6cc4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <circle cx="12" cy="12" r="9" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                          <polyline points="11 12 12 12 12 16 13 16" />
                          </svg>
                          <span v-show="upHint19">Fecha de la última modificación a la ficha de la unidad</span>
                        </span>
                      </p>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </v-col>

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
  data: () => ({
    // El objeto video representa una unidad documental, es decir, un registro audiovisual organizado por áreas
    // Nota: el objeto video será obtenido desde la base de datos en futuras iteraciones del código
    video: {
      identificacion: {
        codigoReferencia: 'MXIM-AV-2-3-4',
        titulo: 'Lorem ipsum',
        fecha: new Date().toISOString().substr(0, 10),
        lugar: 'Nullam ipsum urna, dapibus scelerisque neque quis',
        pais: 'México',
        duracion: '01:18:43',
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

    // Representación jerárquica de los conjuntos a los que pertenecen las unidades documentales
    breadcrumbs: [
      {
        text: 'Proyectos',
        disabled: false,
        href: 'proyectos',
      },
      {
        text: 'Ejemplo Proyecto',
        disabled: false,
        href: 'coleccion/proyectos/1',
      },
      {
        text: 'Entrevista',
        disabled: false,
        href: 'coleccion/proyectos/2',
      },
      {
        text: 'Entrevista controlada',
        disabled: true,
        href: 'video',
      }
    ],

    // Auxiliar que representa si la ventana de dialogo con la información del video se muestra (true) o no (false)
    dialog: false,

    // Auxiliares para el control de los hints.
    upHint0: false,
    upHint1: false,
    upHint2: false,
    upHint3: false,
    upHint4: false,
    upHint5: false,
    upHint6: false,
    upHint7: false,
    upHint8: false,
    upHint9: false,
    upHint10: false,
    upHint11: false,
    upHint12: false,
    upHint13: false,
    upHint14: false,
    upHint15: false,
    upHint16: false,
    upHint17: false,
    upHint18: false,
    upHint19: false,
  }),

  // Espacio reservado para métodos que calculen o transformen la información
  methods: {
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
