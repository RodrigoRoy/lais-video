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
                  <h1>
                    Acerca del sitio
                  </h1>
                  <p>
                    Nam sagittis nisi at elementum dapibus. Proin et lacinia nulla. In efficitur eros id mauris malesuada molestie. Ut eros purus, euismod scelerisque aliquet sit amet, interdum faucibus tellus. Sed est augue, volutpat ac ex nec, dignissim commodo tortor. Pellentesque ut eleifend massa. Vivamus sagittis eleifend magna sed varius. Aliquam semper pellentesque metus non gravida. Donec interdum mattis justo, vel tempus dolor vehicula a. Etiam sed risus eu ex aliquet cursus.
                  </p>
                  <!-- <p>
                    Duis rhoncus tortor quis sagittis blandit. Donec luctus sit amet massa sed congue. Vestibulum vitae lectus mattis, gravida nibh vel, lobortis mauris. Proin porta magna pellentesque, rutrum nisl et, fermentum felis. Curabitur orci quam, rhoncus at consectetur non, rutrum eget sapien. Sed posuere interdum pulvinar. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec accumsan leo a ligula placerat pulvinar. Suspendisse lacus felis, eleifend a lacus eu, finibus gravida dolor. Proin et porttitor ante. In semper egestas ullamcorper.
                  </p> -->
                  <h1>
                    La colección de registros en video
                  </h1>
                  <p>
                    Nam sagittis nisi at elementum dapibus. Proin et lacinia nulla. In efficitur eros id mauris malesuada molestie. Ut eros purus, euismod scelerisque aliquet sit amet, interdum faucibus tellus. Sed est augue, volutpat ac ex nec, dignissim commodo tortor. Pellentesque ut eleifend massa. Vivamus sagittis eleifend magna sed varius. Aliquam semper pellentesque metus non gravida. Donec interdum mattis justo, vel tempus dolor vehicula a. Etiam sed risus eu ex aliquet cursus.
                  </p>
                  <p>
                    Duis rhoncus tortor quis sagittis blandit. Donec luctus sit amet massa sed congue. Vestibulum vitae lectus mattis, gravida nibh vel, lobortis mauris. Proin porta magna pellentesque, rutrum nisl et, fermentum felis. Curabitur orci quam, rhoncus at consectetur non, rutrum eget sapien. Sed posuere interdum pulvinar. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec accumsan leo a ligula placerat pulvinar. Suspendisse lacus felis, eleifend a lacus eu, finibus gravida dolor. Proin et porttitor ante. In semper egestas ullamcorper.
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
