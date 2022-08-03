<template>
  <div>
    <!-- En caso de contraseña incorrecta -->
    <v-alert dismissible type="error" v-if="error">
      <v-row align-item="center">
        <v-col class="grow">
          {{ error }}
        </v-col>
      </v-row>
    </v-alert>

    <v-form ref="formulario" v-model="valid" lazy-validation v-on:submit.prevent="onSubmit">
      <v-text-field v-model="usuario.username" :rules="rules.username" label="Nombre de usuario" required ></v-text-field>
      <v-text-field v-model="usuario.password" :rules="rules.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" label="Contraseña" required></v-text-field>
  
      <v-btn type="submit" :disabled="!valid" color="primary" class="mr-4"> Iniciar sesión </v-btn>
    </v-form>
  </div>
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
      },
      // Determina si la contraseña es incorrecta
      error: false,
    };
  },
  methods: {
    onSubmit: async function(/*event*/){
      // event.preventDefault(); // equivalent to use v-on:submit.prevent
      if(!this.$refs.formulario.validate()) // Si el formulario no es válido
        return;
      const user = this.usuario;
      try {
        await auth.login(user);
        this.$router.push({name: 'home'});
      } catch (error) {
        this.error = 'Usuario y/o contraseña incorrecta'
      }
    }
  }
}
</script>
