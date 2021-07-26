<template>
  <v-container>
    <v-row no-gutters align="center" justify="center">
      <v-col cols="10">
        <v-card>
          <v-tabs v-model="tab" centered dark icons-and-text >
            <v-tabs-slider></v-tabs-slider>

            <v-tab href="#tab-1">
              La colección
              <v-icon>mdi-video</v-icon>
            </v-tab>

            <v-tab href="#tab-3">
              Vínculos de interés
              <v-icon>mdi-link-variant</v-icon>
            </v-tab>

            <v-tab href="#tab-2">
              Equipo de trabajo
              <v-icon>mdi-account-group</v-icon>
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item value="tab-1">
              <v-card flat>
                <v-card-text>
                  <h1 class="text-h3 font-weight-bold my-4">
                    Acerca del sitio
                  </h1>
                  <p class="text-body-1">
                    El Acervo Audiovisual del Laboratorio Audiovisual de Investigación Social (LAIS) alberga tres colecciones que corresponden a los documentales reunidos de forma continua desde 1994, los registros audiovisuales propios en el marco de diversos proyectos de investigación del LAIS y los materiales audiovisuales recopilados de diferente procedencia institucional y particular.
                  </p>
                  <p class="text-body-1">
                    Varios de estos títulos, registros y materiales, pueden ser útiles para otras investigaciones y sobre todo impulsar más estudios sobre lo audiovisual, de ahí el propósito central de poner en acceso su documentación y facilitar el camino para indagar con ellos y sobre ellos.
                  </p>

                  <h1 class="text-h3 font-weight-bold mt-8 mb-4">
                    La Colección de Registros en Video
                  </h1>
                  <p class="text-body-1">
                    Esta colección se integra a partir de los registros audiovisuales en video que las/os integrantes del LAIS han realizado desde 1993 para varios proyectos de investigación. Los registros en video inician en 1993, con la primera producción del Instituto: Un Pueblo en la Memoria (Roca, 1994).
                  </p>
                  <p class="text-body-1">
                    Estos proyectos de investigación han sido realizados por diversos equipos de trabajo, siempre con la participación de algún integrante del LAIS. Ya fuera que requerian la realización de un documental o una exposición, o bien la construcción de fuentes visuales y audiovisuales para la investigación, estos proyectos implicaron registros fotográficos y audiovisuales que fueron conformando esta colección con el tiempo, que integra sobre todo registros de entrevistas, registros en campo y también algunas reproducciones digitales de material gráfico.
                  </p>
                  <p class="text-center">
                    <img class="mr-5" :src="require('../assets/moraEscalado.png')" height="70"/>
                    <img class="mr-5" :src="require('../assets/lais_logo.png')" height="70"/>
                    <img class="mr-5" :src="require('../assets/conacyt_logo.png')" height="70"/>
                  </p>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item value="tab-2">
              <v-card flat>
                <v-card-text class="text-center">
                  <h1>
                    Producción del sitio y diseño gráfico
                  </h1>
                  <p>
                    Lourdes Roca <br>
                    Felipe Morales Leal <br>
                    Carlos Hernández Marines <br>
                    Rodrigo Colín Rivera
                  </p>
                  <h1>
                    Desarrollo web
                  </h1>
                  <p>
                    Rodrigo Colín Rivera
                  </p>
                  <h1>
                    Documentación
                  </h1>
                  <p>
                    Cecilia Alcántara Ceja <br>
                    Rafael Briseño <br>
                    Yunuén Carrillo <br>
                    Terpsícore Cruz <br>
                    Elisa Dolores Espinoza <br>
                    Itzia Fernández Escareño <br>
                    Adriana Fonseca <br>
                    Paris García Becerril <br>
                    Lilia García Torres <br>
                    Daniel Guzmán <br>
                    Carlos Hernández Marines <br>
                    Jocelyn Leal Ruiz <br>
                    Alejandra López <br>
                    Guadalupe López Sandoval <br>
                    Úrsula Mares Figueras <br>
                    Jesús Mejía Mendoza <br>
                    Felipe Morales Leal <br>
                    Sergio Ortiz <br>
                    Esmeralda Prado <br>
                    Lourdes Roca <br>
                    Israel Rodríguez Rodríguez <br>
                    Isis Saavedra Luna <br>
                    Citlalli Salazar Torres <br>
                    Angie J. Sandoval <br>
                    Tzutzumatzin Soto Cortés <br>
                    Esteban Terán <br>
                    Penélope Ubaldo <br>
                    María Eréndira Vázquez Arriaga
                  </p>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item value="tab-3">
              <v-card flat>
                <v-card-text class="text-center">
                  <h1>
                    Archivos
                  </h1>
                  <p>
                    <a>Filmoteca UNAM</a> <br>
                    <a>Anarchivia Films</a> <br>
                    <a>Filmoteca de Catalunya</a> <br>
                    <a>Institut National de l’Audiovisuel</a>
                  </p>
                  <h1>
                    Laboratorios y centros
                  </h1>
                  <p>
                    <a>LISA, Laboratório de Imagem e Som em Antropologia</a> <br>
                    <a>LABHOI, Laboratório de Historia Oral e Imagem</a> <br>
                    <a>CEAVI, Centro de Estudios de Antropología Visual</a> <br>
                    <a>CRDI, Centre de Recerca i Difusió de la Imatge</a>
                  </p>
                  <h1>
                    Asociaciones
                  </h1>
                  <p>
                    <a>Rede FotoARQ</a> <br>
                    <a>Grupo de Pesquisa Acervos Fotográficos</a> <br>
                    <a>European Documentary Network</a> <br>
                    <a>The International Documentary Association (IDA)</a> <br>
                    <a>Grupo de Estudios Audiovisuales (GEstA)</a> <br>
                    <a>Documentalistas Argentinos</a> <br>
                    <a>Doctv</a> <br>
                    <a>ProMedios de Comunicación Comunitaria</a> <br>
                    <a>Images en bibliotheques</a> <br>
                    <a>Filmarchives</a>
                  </p>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        tab: null
      }
    },
  }
</script>
