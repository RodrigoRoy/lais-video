<template>
  <v-form ref="formulario" v-model="valid" lazy-validation v-on:submit.prevent="onSubmit">
    <v-text-field v-model="usuario.username" :rules="rules.username" label="Nombre de usuario" required ></v-text-field>
    <v-text-field v-model="usuario.password" :rules="rules.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" label="Contraseña" required></v-text-field>

    <v-btn type="submit" :disabled="!valid" color="primary" class="mr-4"> Iniciar sesión </v-btn>
  </v-form>
</template>

<script>
import * as auth from '../../services/AuthService'

export default{
  name: 'login',
  data: function(){
    return {
      usuario: {
        username: '',
        password: ''
      },
      valid: false,
      show1: false,
      rules: {
        username: [
          value => !!value || 'El nombre de usuario es necesario',
        ],
        password: [
          value => !!value || 'La contraseña es necesaria',
        ],
      }
    };
  },
  methods: {
    onSubmit: async function(/*event*/){
      // event.preventDefault(); // equivalent to use v-on:submit.prevent
      if(!this.$refs.formulario.validate()) // Si el formulario no es válido
        return;
      const user = this.usuario;
      await auth.login(user);
      this.$router.push({name: 'home'});
    }
  }
}
</script>
