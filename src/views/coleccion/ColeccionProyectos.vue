<template>
  <v-container>
    <h2 class="text-h3 text-center">Proyectos de investigación</h2>
    <v-breadcrumbs :items="items" class="justify-center"></v-breadcrumbs>

    <v-row no-gutters align="start" justify="start">
      <v-col cols="12" md="3" v-for="(coleccion, i) in colecciones" :key="i">
      <!-- <v-col cols="12" md="3" v-for="n in 16" :key="n"> -->
        <v-card class="ma-4 pa-4" outlined tile @click="goTo()">
          <v-img :src="require('@/assets/Caratulas_Proyectos/' + coleccion.adicional.imagen)" height="150px"></v-img>
          <v-card-title class="text-center justify-center">
            <div class="d-none d-md-block">
              {{ coleccion.identificacion.titulo | truncate(35) }}
            </div>
            <div class="text-truncate d-md-none">
              {{ coleccion.identificacion.titulo}}
            </div>
            <!-- <div>
              {{ coleccion.identificacion. }}
            </div> -->
          </v-card-title>
          <v-card-subtitle class="pb-0 text-center">
            {{ coleccion.identificacion.codigoReferencia }}
          </v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click.stop.prevent="goTo()">
              <v-icon>mdi-folder-open</v-icon>
            </v-btn>
            <v-btn icon @click.stop.prevent="openDialog(coleccion)">
              <v-icon>mdi-open-in-new</v-icon>
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
            <v-toolbar-title>{{ currentColection ? currentColection.identificacion.titulo : coleccion.identificacion.titulo }}</v-toolbar-title>
          </v-toolbar>
          <v-row>
            <v-col xs="12" sm="12" md="7">
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
            <v-col xs="12" sm="12" md="5">
              <p>
                <v-img :src="currentColection && currentColection.adicional.imagen ? require('@/assets/Caratulas_Proyectos/' + currentColection.adicional.imagen) : require('@/assets/Foto_Acervo1.png')" height="220px" contain></v-img>
              </p>
              <!-- Presentación -->
              <vue-markdown breaks linkify :source="currentColection && currentColection.adicional.presentacion ? currentColection.adicional.presentacion : coleccion.adicional.presentacion"></vue-markdown>
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
import VueMarkdown from 'vue-markdown'

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
        },
        adicional: {
          presentacion: `**Lorem ipsum dolor sit amet**
          Lorem ipsum dolor sit amet, _consectetur adipiscing elit_. Sed quis eleifend mi. Vestibulum id ex sit amet felis finibus tristique eu eu purus. Donec varius neque velit, sit amet tincidunt orci ullamcorper et. Ut ut eros cursus, auctor risus congue, convallis nulla. In laoreet in nisl sit amet pretium. In vehicula ipsum vel mauris pellentesque tincidunt. Proin eu bibendum enim. Praesent sit amet consequat orci.
          Cras lobortis pharetra purus, vitae feugiat turpis iaculis sit amet. Fusce euismod justo ut lacus imperdiet vulputate. Donec viverra quam vel urna varius, ac euismod leo fringilla. Phasellus sed arcu id diam blandit cursus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras aliquet consectetur enim, eget feugiat dolor ornare eu. Ut posuere maximus augue vel euismod.
          https://www.npmjs.com/package/vue-markdown`
        }
      },
      colecciones: [
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-1',
            titulo: 'Un Pueblo en la Memoria'
          },
          adicional: {
            imagen: 'Un pueblo 1.png',
            presentacion: '*Un pueblo en la memoria, historia oral de Mixcoac* (1993-1994)\n\nEste proyecto buscó la realización de una exposición y un documental. Para ello iniciaron los registros fotográficos y audiovisuales en 1993 y duraron aproximadamente un año, en varias zonas y domicilios de Mixcoac. Jaime Navarro realizaba los primeros y Lourdes Roca los segundos, con una cámara Canon Hi-8. La exposición y el documental Un pueblo en la memoria fueron presentados en otoño de 1994 en el Instituto Mora. Las investigadoras de la historia oral de Mixcoac que había iniciado unos años antes fueron Patricia Pensado y Leonor Correa, y la postproducción se hizo en las instalaciones de la Unidad de Producciones Audiovisuales de CONACULTA, en tiempos que la institución nos cedió en horarios nocturnos. Fue el primer documental producido por el Instituto y proyectado varias veces el día de su presentación, debido a la gran concurrencia vecinal que acudió a verlo. Todo el proyecto fue realizado en el marco del proyecto CONACYT de historia oral de la ciudad de México, coordinado por Graciela de Garay. La realizadora del documental fue Lourdes Roca.'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-2',
            titulo: 'Tradición o Modernidad: Reto de una Generación. Testimonios del Arquitecto Luis Ortiz Macedo'
          },
          adicional: {
            imagen: 'Tradición o modernidad 1.png',
            presentacion: '*Tradición o modernidad: reto de una generación* (1994-1995)\n\nEste proyecto fue coordinado por Graciela de Garay y contempló la realización de un documental y un libro. Abordó la historia de vida y obra del arquitecto Luis Ortiz Macedo e implicó entrevistas a profundidad realizadas por Graciela de Garay y una amplia investigación iconográfica, realizada por Fernando Aguayo y Lourdes Roca. Los tres realizaron el documental Tradición o modernidad: reto de una generación (1996), producido por el Instituto, en el marco del proyecto CONACYT de historia oral de la ciudad de México, coordinado por Graciela de Garay.'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-3',
            titulo: 'El Buen Restaurador Ama Lo Antiguo. Testimonios del Arquitecto Ricardo de Robina'
          },
          adicional: {
            imagen: 'El Buen Restaurador  1.png',
            presentacion: '*El buen restaurador ama lo antiguo* (1996-1997)\n\nEste proyecto fue coordinado por Graciela de Garay y contempló la realización de un documental y un libro. Abordó la historia de vida y obra del arquitecto Ricardo de Robina e implicó entrevistas a profundidad realizadas por Graciela de Garay y una amplia investigación iconográfica, realizada por Fernando Aguayo y Lourdes Roca. Los tres realizaron el documental El buen restaurador ama lo antiguo (1997), producido por el Instituto, en el marco del proyecto CONACYT de historia oral de la ciudad de México, coordinado por Graciela de Garay. La mayoría de los registros audiovisuales fueron hechos por Carlos Hernández Marines.'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-4',
            titulo: 'Cuando la Rumba Nos Conoció...'
          },
          adicional: {
            imagen: 'Cuando la Rumba Nos Conoció 1.png',
            presentacion: 'Cuando la Rumba nos conoció\n\nEs un proyecto de documental derivado de los registros en video creados por Carlos Hernández y Humberto Galarza durante su participación en un Taller de Cine Documental impartido en la Escuela Internacional de Cine y Televisión de San Antonio de los Baños, Cuba.\nSe incluyen registros hechos con algunas comparsas en la ciudad de La Habana, así como entrevistas hechas en los lugares donde se interpretaban piezas musicales y se bailaba.\nTambién existen registros hechos en distintos centros de entretenimiento donde se puede ver la interpretación musical de varios géneros característicos de la isla.\nDerivado de este trabajo se produjo el documental *Cuando la Rumba Nos Conoció…* (1998)'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-5',
            titulo: 'Más vale paso que dure...'
          },
          adicional: {
            imagen: 'Foto_Acervo1.png',
            presentacion: '*Más vale paso que dure* (1995-1997)\n\nEste proyecto de investigación sobre la estatua ecuestre del Caballito y las transformaciones del espacio urbano entre la Glorieta Juárez-Reforma-Bucareli y el Zócalo capitalino, fue realizada por Fernando Aguayo y Lourdes Roca entre 1995 y 1997, como becarios del proyecto de historia oral de la ciudad de México, coordinado por Graciela de Garay. El corto documental resultante se llama Más vale paso que dure, realizado y producido por Fernando Aguayo y Lourdes Roca. No fue publicado y su uso se limitó a fines docentes. Los registros son básicamente de material gráfico de más de dos siglos de representaciones y capturas de estos céntricos espacios de la ciudad.'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-6',
            titulo: 'Mi Multi es Mi Multi. Historia del Multifamiliar Miguel Alemán'
          },
          adicional: {
            imagen: 'Mi multi 2.png',
            presentacion: '*Mi Multi es mi Multi, historia oral del Multifamiliar Miguel Alemán* (1996-1999)\n\nFue un proyecto de investigación colectivo, encabezado por Graciela de Garay y con la participación de Lourdes Roca, Patricia Pensado, Gerardo Necoechea y Blanca Olivia Peña, en el marco del proyecto Historia oral de la ciudad de México. Contempló dos libros y un documental, Mi Multi es mi Multi (1999). Sus registros audiovisuales están integrados por las entrevistas videograbadas, diversos aspectos del trabajo de campo y algunas reproducciones de materiales gráficos y audiovisuales de varios archivos, tanto públicos como particulares. La mayoría de registros audiovisuales fueron realizados por Carlos Hernández Marines en formato Betacam y algunos por Lourdes Roca en formato Hi 8.  Este es el primer documental donde la documentación fílmica diversa fue integrada como fuente de investigación.'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-7',
            titulo: 'Km. C-62 Un nómada del riel'
          },
          adicional: {
            imagen: 'Km_1.png',
            presentacion: '*Km. C-62 Un nómada del riel* (1996-2000)\n\nFue un proyecto de investigación doctoral en antropología de Lourdes Roca por la ENAH-INAH, sobre los ferrocarriles nacionales y una historia de vida de un jefe de estación. Tuvo el apoyo del Instituto y del FONCA para la realización del documental y libro de mismo nombre, Km. C-62 Un nómada del riel (2000), además de la tesis de doctorado. El grupo documental integra registros de campo realizados desde inicios de los noventa en la estación protagónica, Cima (alcaldía Tlalpan) por Lourdes Roca, los de trabajo de campo realizado en varios estados del norte y centro del país en 1999 y diversas reproducciones de varios archivos públicos y particulares. Los registros fueron hechos por Carlos Hernández y Lourdes Roca. Este proyecto también incorporó una amplia investigación fílmica, poco presente en el documental, pero retomada en varias publicaciones escritas de la autora.'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-8',
            titulo: 'El Arte de Hacer Ciudad. Testimonios del Arquitecto Mario Pani'
          },
          adicional: {
            imagen: 'El arte de hacer_2.png',
            presentacion: '*El arte de hacer ciudad*\n\nEs un proyecto de investigación que aborda la vida del arquitecto Mario Pani. Un trabajo coordinado por Graciela de Garay, realizado en conjunto con Carlos Hernández, Paris García y Felipe Morales Leal.\nParte fundamental del proyecto son las entrevistas a profundidad realizadas a una serie de arquitectos conocedores de la vida y obra de Mario Pani, complementadas por algunas otras hechas a familiares y especialistas en el tema.\nSe cuenta con videograbaciones de las entrevistas, además de registros en video de las principales obras del arquitecto Pani.\nDerivado de esta investigación se produjo el documental *El arte de hacer ciudad* (2001).'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-9',
            titulo: 'Revelando el Rollo'
          },
          adicional: {
            imagen: 'Revelando el rollo_1.png',
            presentacion: '*Revelando el rollo* (2001-2002)\n\nEste grupo documental lo integran los registros realizados para el docudrama Revelando el rollo (2002), realizado como resultado del proyecto de investigación CONACYT “Los usos de lo visual en la investigación social”, coordinado por Lourdes Roca. Los registros incluyen puestas en escena, entrevista a profundidad con especialistas y reproducción de material gráfico utilizado para la producción, corealizada por Fernando Aguayo, Paris García, Carlos Hernández, Felipe Morales y Lourdes Roca. El proyecto y el documental constituyeron el antecedente directo de la creación del proyecto de creación del Laboratorio Audiovisual de Investigación Social que se fundó en 2002.'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-10',
            titulo: 'De dolor y esperanza. El asilo un pasado presente'
          },
          adicional: {
            imagen: 'De dolor y esperanza.jpg',
            presentacion: '*De dolor y esperanza. El asilo un pasado presente*: Silvia Dutrénit Bielous, Carlos Hernández Marines y Guadalupe Rodríguez de Ita, Instituto Mora, 1997, 60 min.\n\nEl proyecto de investigación institucional *Dictaduras y asilo. Experiencias en las embajadas mexicanas en el Cono Sur*, coordinado por Silvia Dutrénit Bielous y Guadalupe Rodríguez de Ita, estuvo dedicado a conocer y analizar el fenómeno del asilo diplomático durante las décadas de los 70 y de los 80 del siglo XX.\nEn esas décadas Argentina, Chile y Uruguay vivieron bajo dictaduras de carácter militar o cívico militar. En esas circunstancias, las representaciones diplomáticas mexicanas en los  países sureños, desempeñaron un papel de vital importancia al otorgar asilo. Su puesta en práctica permitió la protección de un número muy considerable de perseguidos políticos.\nEl proyecto contó para algunas de sus publicaciones con el apoyo del Archivo Histórico Diplomático de la SREM y de la Secretaría de Cultura del Gobierno de la Ciudad. Uno de los resultados de esta investigación, que cuenta en particular con 33 registros videograbados, es el documental *De dolor y esperanza…* (1997).\nEl documental tiene como foco de atención la aplicación de la política de asilo y el efecto que su práctica tuvo tanto en los funcionarios diplomáticos como en los asilados. Para su realización se utilizaron diferentes fuentes orales, documentales y fotográficas. Las entrevistas a los protagonistas del asilo resultan material destacado así como una serie fotográfica y otra documental.'
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
            titulo: 'El Triángulo de Tacubaya. Historia del Cine Hipódromo Condesa'
          },
          adicional: {
            imagen: 'Triángulo_1.png',
            presentacion: '*El triángulo de Tacubaya*\n\nEs una investigación original hecha por Felipe Morales Leal para obtener el grado en la licenciatura en Ciencias de la Comunicación de la UNAM, el tema principal es la historia del cine Hipódromo Condesa ubicado en el barrio de Tacubaya, en la ciudad de México.\nLa investigación entrelaza la historia del Edificio Ermita, lugar donde se ubica la sala de proyección, los cambios en el barrio y la historia de la exhibición cinematográfica durante el siglo XX. Se trabajó con diversas fuentes documentales, fotográficas y audiovisuales. El proyecto cuenta con registros hechos durante el proceso de investigación, existen imágenes del exterior e interior del cine Hipódromo, registros de fachadas de otros cines a inicios del siglo XX, tomas de la ciudad de México y videograbaciones de 7 entrevistas.\nDerivado de este trabajo se produjo el documental *El triángulo de Tacubaya* (2005), además de la tesis de grado.'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-13',
            titulo: 'Ciudad Olimpia: El Año que Fuimos Modernos'
          },
          adicional: {
            imagen: 'Ciudad Olimpia_2.png',
            presentacion: '*Ciudad Olimpia, el año que fuimos modernos* (2003-2005)\n\nFue el proyecto de investigación de tesis de licenciatura en historia de Daniel Inclán, becario entonces del LAIS. Los registros fueron realizados por Carlos Hernández y están hechos sobre todo a partir de materiales gráficos y audiovisuales de la época. El documental Ciudad Olimpia (2005) fue producido por el Instituto Mora.'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-14',
            titulo: 'De la Tele a la Boca… Una Reflexión sobre Desarrollo Infantil y Salud'
          },
          adicional: {
            imagen: 'De la TV_1.png',
            presentacion: '*De la tele a la boca. Una reflexión sobre desarrollo infantil y salud* (2003-2008)\n\nEste documental y varios artículos resultaron de una investigación colectiva sobre desarrollo infantil y salud, realizada con el preescolar Gabriela Mistral de Ciudad Nezahualcoyotl, entre 2003 y 2008. Coordinado por Fernando Aguayo y Lourdes Roca, fue una corealización con Carlos Hernández y Felipe Morales Leal en 2008. El grupo documental consta de registros en campo, registros de entrevistas y reproducción de algunos materiales gráficos. Además del documental, se publicaron varios artículos sobre esta investigación y se realizó también un material interactivo para la web, ¿Cómo la ves? Infancia y televisión. Tuvo un impacto considerable en materia de políticas de salud, sobre todo a través de la asociación El Poder del Consumidor, que le dio bastante cobertura y difusión. El interactivo estuvo basado en una exposición física que se presentó en el Instituto e itineró durante tres años por escuelas primarias y secundarias de la CDMX y el estado de Morelos.'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-15',
            titulo: 'Más allá del reglamento. Avatares de un embajador mexicano, Vicente Muñiz arroyo 1974-1977'
          },
          adicional: {
            imagen: 'Mas alla del reglamento.jpg',
            presentacion: '*Más allá del reglamento: avatares de un embajador mexicano: Vicente Muñiz Arroyo. 1974-1977.* Ana Buriano, Silvia Dutrénit Bielous y Carlos Hernández Marines.\n\nEl proyecto de investigación *El embajador Vicente Muñiz Arroyo*, de Ana Buriano Castro y Silvia Dutrénit Bielous, tuvo como objetivo historiar a este embajador mexicano a través de su biografía y sus contextos. En particular, la atención fue puesta en su desempeño como diplomático responsable de la embajada mexicana en Montevideo durante los primeros años de una represión muy extendida (1974-1977) y como servidor público en otras responsabilidades del gobierno mexicano.\nMuñiz Arroyo nacido en Churintzio, Michoacán, dejó huella en la historia diplomática de América Latina. Embajador durante algunos años de la dictadura en Uruguay, en el marco de la Operación Cóndor, otorgó refugio a cientos de perseguidos. Su convicción de cumplir el sentido del derecho de asilo, su valentía personal en circunstancias de intensa represión y su solidaridad con los asilados, lo ubican como un diplomático excepcional que fue “más allá del reglamento” para proteger a los perseguidos.\nEn el desarrollo de la investigación se llevaron a cabo distintas actividades que enriquecieron el conocimiento de un personaje muy entrañable para asilados, integrantes del cuerpo diplomático y colaboradores o colegas en distintas actividades de sector público. En los diferentes foros fue posible entrevistar a muchas de esas personas cuyos testimonios están guardados en registros audiovisuales.\nEl documental es un producto destacado del proyecto en donde convergen miradas sobre sus desafiantes acciones inmersas en tiempos difíciles. Múltiples recuerdos se recrean e incitan al afecto y la alegría, así como el dolor que conlleva la recreación. Como fuentes principales del documental están los registros audiovisuales de las entrevistas y foros, documentos de época y fotografías'
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
            imagen: 'Region transfronteriza.jpg'
          }
        },
        {
          identificacion: {
            codigoReferencia: 'MXIM-AV-2-18',
            titulo: 'Desaparición forzada y equipos de antropología forense: Diálogos en América Latina'
          },
          adicional: {
            imagen: 'Desaparicion forzada.jpg',
            presentacion: '*Desaparición forzada y equipos de antropología forense: Diálogo en América Latina*. Realización: Silvia Dutrénit Bielous y Araceli Leal Castillo, México, Instituto Mora-LAIS/CONACyT, 2019, 76 min.\n\nEl proyecto Conacyt-Mora (clave CB 2012/177295) titulado *El trabajo de los equipos de Antropología Forense en América Latina: otra ruta de acceso al conocimiento de la represión y violencia políticas*, cuya responsable fue Silvia Dutrénit Bielous, contó con la participación de colegas de México y la región con un enfoque interdisciplinario.\nLa mirada investigativa dio cuenta de los sucesos que, a partir de los años 80 del siglo XX, con el despuntar de algunas transiciones a la democracia algunos países de la región, dieron lugar al proceso de constitución de Equipos de Antropología Forense. Equipos o grupos independientes de los Estados, con una concepción humanitaria, relacionada con las violaciones a los derechos humanos, y con una integración interdisciplinaria.\nEl estudio realizado en varios países hizo posible historiar el nacimiento, la integración, la metodología, los retos, los logros y las limitaciones de estos equipos. Es de destacar que durante la investigación se llevaron a cabo 32 entrevistas videograbadas en los países de estudio (Argentina, Chile, Guatemala, México y Uruguay).\nEl documental *Desaparición Forzada…* (2019), es fruto de esta investigación y uno de los productos que de ella derivaron. En el mismo se presenta un diálogo donde confluyen las voces de antropólogos forenses, familiares, jueces y activistas de derechos humanos, en torno a las estrategias de búsqueda de desaparecidos y ejecutados, así como los procesos de identificación, entrega de los restos a los familiares y acerca de los desafíos para dar cumplimiento al derecho a la verdad y a la reparación.\nDurante la realización se trabajó con diversas fuentes orales, documentales, fotográficas y audiovisuales.  En especial los registros audiovisuales de las entrevistas, una serie fotográfica y otra documental.'
          }
        }
      ],
      currentColection: null,
      items: [],
      dialog: false,
    }
  },
  methods: {
    goTo: function(){
      this.$router.push({name: 'coleccion-projects1'});
    },
    openDialog: function(colection){
      this.dialog = true;
      this.currentColection = colection;
    }
  },
  components: {
    VueMarkdown
  }
}
</script>
