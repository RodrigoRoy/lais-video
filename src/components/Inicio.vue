<template>
  <v-container>
    <v-row class="text-justify">
      <v-col cols="6" class="mt-12">
        <v-img :src="require('../assets/AVLAIS_logo.png')" class="mb-4" contain height="300" />
      </v-col>

      <v-col cols="12">
        <h1 class="display-2 font-weight-bold mb-6">
          Colección de Registros de Video del LAIS
        </h1>

        <!-- <h2 class="font-weight-bold mb-3">
          Laboratorio Audiovisual de Investigación Social
        </h2> -->

        <p class="headline font-weight-regular">
          Esta colección da cuenta de los diversos registros audiovisuales que documentaron varios proyectos de investigación desde los años noventa. Proyectos de investigación social donde se desplegaron las posibilidades de documentación fotográfica y audiovisual, apostando a la construcción de fuentes en campo que integraran informaciones visuales y sonoras que seguido escapan a la investigación.
        </p>

        <p class="mt-3">
          <v-btn color="primary" elevation="6" large to="/coleccion">Ver colección</v-btn>
        </p>
      </v-col>

      <!-- <v-col
        class="mb-5"
        cols="12"
      >
        <v-row justify="center">
          <v-btn elevation="6" to="/coleccion/proyectos">Ver proyectos</v-btn>
        </v-row>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Populares
        </h2>

        <v-row justify="center">
          <a
            v-for="(registro, i) in populares"
            :key="i"
            :href="registro.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ registro.text }}
          </a>
        </v-row>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Recien agregados
        </h2>

        <v-row justify="center">
          <a
            v-for="(registro, i) in recientes"
            :key="i"
            :href="registro.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ registro.text }}
          </a>
        </v-row>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Acerca del sitio
        </h2>

        <v-row justify="center">
          <a
            v-for="(link, i) in acercaDe"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </v-row>
      </v-col> -->

    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      populares: [
        {
          text: 'Registro en video 1',
          href: '/'
        },
        {
          text: 'Registro en video 2',
          href: '/'
        },
        {
          text: 'Registro en video 3',
          href: '/'
        }
      ],
      recientes: [
        {
          text: 'Registro en video 4',
          href: '/'
        },
        {
          text: 'Registro en video 5',
          href: '/'
        },
        {
          text: 'Registro en video 6',
          href: '/'
        }
      ],
      acercaDe: [
        {
          text: 'Manual de catalogación',
          href: '/'
        },
        {
          text: 'Acerca de los registros en video',
          href: '/'
        },
        {
          text: 'Página del LAIS',
          href: '/'
        }
      ]
    }),
  }
</script>
