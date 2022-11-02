<template>
  <div>
    <!-- En caso de contraseña incorrecta -->
    <v-alert v-model="error" dismissible type="error" v-if="error">
      <v-row align-item="center">
        <v-col class="grow">
          {{ error}}
        </v-col>
      </v-row>
    </v-alert>

    <v-container>
      <v-form ref="formulario" v-model="valid" lazy-validation v-on:submit.prevent="onSubmit">
        <v-text-field v-model="usuario.username" :rules="rules.username" :counter="16" label="Nombre de usuario" hint="Nombre corto y fácil de recordar para iniciar sesión" required ></v-text-field>
        <v-text-field v-model="usuario.fullname" :rules="rules.fullname" label="Nombre completo" hint="Nombre completo que aparecerá en los registros" required ></v-text-field>
        <v-text-field v-model="usuario.email" :rules="rules.email" label="Correo electrónico" required ></v-text-field>
        <v-text-field v-model="usuario.password" :rules="rules.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" label="Contraseña" counter @click:append="show1 = !show1"></v-text-field>
        <v-text-field :rules="rules.passwordVerification" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :type="show2 ? 'text' : 'password'" label="Confirmar contraseña" class="input-group--focused" counter @click:append="show2 = !show2"></v-text-field>
        <!-- TODO @RodrigoRoy Opciones extendidas solo con sesión iniciada y permisos de admin -->
        <!-- <v-checkbox v-model="admin" label="Registrar como administrador"></v-checkbox> -->

        <v-btn type="submit" :disabled="!valid" color="primary" class="mr-4"> Registrar </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import * as auth from '../../services/AuthService'
import * as usuario from '../../services/UsuarioService'

export default{
  name: 'register',
  data: function(){
    return {
      usuario: {
        username: '',
        fullname: '',
        email: '',
        password: '',
        admin: false,
        active: true,
      },
      valid: false,
      error: null,
      show1: false,
      show2: false,
      rules: {
        username: [
          value => !!value || 'El nombre de usuario es necesario',
          value => (value && value.length <= 30) || 'El nombre de usuario no debe ser mayor a 30 caracteres',
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
          value => value !== this.password || 'La contraseña no coincide',
        ]
      }
    };
  },
  methods: {
    onSubmit: async function(){
      if(!this.$refs.formulario.validate()) // Si el formulario no es válido
        return;
        
      await usuario.getAllUsers().then(res => {
        let usuarios = res.data.usuarios;
        if (usuarios.length === 0) {
          this.usuario.admin = true;
        }
      }).catch(error => {
        console.error(error);
      });
        
      const user = this.usuario;
      const registerPromise = auth.registerUser(user);
      const loginPromise = auth.login(user);
      try {
        await Promise.all([registerPromise, loginPromise]);
        this.$router.push({name: 'home'});
      } catch (error) {
        this.error = error;
      }
    }
  }
}
</script>
