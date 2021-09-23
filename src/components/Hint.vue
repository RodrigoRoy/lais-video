<!-- Componente para un hint -->

<template>
    <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
            <v-icon small v-bind="attrs" v-on="on">
                mdi-information
            </v-icon>
        </template>
        <span>{{ hint }}</span>
    </v-tooltip>
</template>

<script>
export default {
  name: 'Hint',
  props: { // Propiedades (sólo lectura) o argumentos para el componente
    hint: { type: String } // Mensaje contenido en el hint
  }
}
</script>