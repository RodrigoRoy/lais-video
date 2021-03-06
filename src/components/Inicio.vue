<template>
  <v-container>
    <v-row class="text-center">
      <!-- <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col> -->

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Colección de Registros en Video
        </h1>

        <h2 class="font-weight-bold mb-3">
          Laboratorio Audiovisual de Investigación Social
        </h2>

        <p class="subheading font-weight-regular">
          Conformada por los registros realizados en video por el Laboratorio Audiovisual de Investigación Social (LAIS) desde 1993, año en que inicia la producción del primer documental, <em>Un pueblo en la memoria</em>.
        </p>
      </v-col>

      <v-col
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
      </v-col>
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
