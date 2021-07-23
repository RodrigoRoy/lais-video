<template>
  <v-container>
    <v-form ref="formulario" v-model="valid" lazy-validation v-on:submit.prevent="onSubmit">
      <v-text-field v-model="username" :rules="rules.username" :counter="16" label="Nombre de usuario" required ></v-text-field>
      <v-text-field v-model="fullname" :rules="rules.fullname" label="Nombre" required ></v-text-field>
      <v-text-field v-model="email" :rules="rules.email" label="Correo electrónico" required ></v-text-field>
      <v-text-field v-model="password" :rules="rules.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" label="Contraseña" counter @click:append="show1 = !show1"></v-text-field>
      <v-text-field :rules="rules.passwordVerification" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :type="show2 ? 'text' : 'password'" label="Confirmar contraseña" class="input-group--focused" counter @click:append="show2 = !show2"></v-text-field>
      <v-checkbox v-model="admin" label="Registrar como administrador"></v-checkbox>

      <v-btn type="submit" :disabled="!valid" color="primary" class="mr-4"> Registrar </v-btn>
    </v-form>
  </v-container>
</template>

<script>
// import * as auth from '../../services/AuthService'

export default{
  name: 'register',
  data: function(){
    return {
      username: '',
      fullname: '',
      email: '',
      password: '',
      admin: false,
      valid: true,
      show1: false,
      show2: false,
      rules: {
        username: [
          value => !!value || 'El nombre de usuario es necesario',
          value => (value && value.length <= 16) || 'El nombre de usuario no debe ser mayor a 16 caracteres',
          value => (value && value.length >= 3) || 'El nombre de usuario debe tener al menos 3 caracteres',
        ],
        fullname: [
          value => !!value || 'El nombre es necesario',
          value => (value && value.length >= 3) || 'El nombre debe tener al menos 3 caracteres',
        ],
        email: [
          value => !!value || 'El correo electrónico es necesario',
          value => /.+@.+\..+/.test(value) || 'El correo electrónico debe ser válido',
        ],
        password: [
          value => !!value || 'La contraseña es necesaria',
        ],
        passwordVerification: [
          value => !!value || 'Es necesario repetir la misma contraseña',
          value => value === this.password || 'La contraseña no coincide',
        ]
      }
    };
  },
  methods: {
    // onSubmit: async function(){
    //   const user = {
    //     username: this.username,
    //     password: this.password,
    //     first: this.first,
    //     last: this.last
    //   };
    //   const registerPromise = auth.registerUser(user);
    //   const loginPromise = auth.login(user);
    //   await Promise.all([registerPromise, loginPromise]);
    //   this.$router.push({name: 'home'});
    // }
    onSubmit: function(){
      if(!this.$refs.formulario.validate()) // Se activa validación del formulario
        return;
      // const user = {
      //   username: this.username,
      //   fullname: this.fullname,
      //   email: this.email,
      //   password: this.password,
      //   admin: this.admin
      // };
      // console.log('Enviando formulario...');
      // console.log(user);

      // const registerPromise = auth.registerUser(user);
      // console.log('registrado');
      // const loginPromise = auth.login(user);
      // console.log('logeado');
      // await Promise.all([registerPromise, loginPromise]);
      // console.log('promises');
      // this.$router.push({name: 'home'});
    }
  }
}
</script>
