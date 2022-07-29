<!-- Formulario de ingreso de la información de un conjunto documental (grupo) -->

<template>
  <div>
    <!-- En caso de error en petición al API -->
    <v-alert prominent type="error" v-if="error">
      <v-row align="center">
        <v-col class="grow">
          {{ error }}
        </v-col>
        <v-col class="shrink">
          <v-btn href="/home">Ir a inicio</v-btn>
        </v-col>
      </v-row>
    </v-alert>

    <!-- Cuando no hay error, se procede con normalidad -->
    <v-card v-else class="pa-6">
      <!-- Título -->
      <v-card-title class="text-h3 justify-center">Grupo documental</v-card-title>

      <!-- Formulario dividido por pestañas (tabs) que representan cada área (identificación, contexto, etc) -->
      <v-form ref="grupoForm" v-model="validForm" lazy-validation v-on:submit.prevent="onSubmit">
        <v-tabs v-model="tab" centered icons-and-text >
          <v-tabs-slider></v-tabs-slider>

          <!-- Encabezados de pestañas -->
          <v-tab href="#identificacion">
            Identificación
            <v-icon>mdi-film</v-icon>
          </v-tab>

          <v-tab href="#contexto">
            Contexto
            <v-icon>mdi-account-multiple</v-icon>
          </v-tab>

          <v-tab href="#contenidoEstructura">
            Contenido y estructura
            <v-icon>mdi-book-open-page-variant</v-icon>
          </v-tab>

          <v-tab href="#accesoUso">
            Acceso y uso
            <v-icon>mdi-key</v-icon>
          </v-tab>

          <v-tab href="#notas">
            Notas
            <v-icon>mdi-lead-pencil</v-icon>
          </v-tab>

          <v-tab href="#controlDescripcion">
            Control de la descripción
            <v-icon>mdi-account-details</v-icon>
          </v-tab>

          <v-tab href="#adicional">
            Adicional
            <v-icon>mdi-view-grid-plus</v-icon>
          </v-tab>
        </v-tabs>

        <!-- Contenido de cada área o pestaña (tab) -->
        <v-tabs-items v-model="tab">
          <v-tab-item value="identificacion" >
            <v-card flat>
              <v-text-field v-model="grupo.identificacion.codigoReferencia" label="Código de referencia" hint="Código alfanumérico separado por guiones. Ejemplo: MXIM-AV-2-3-1" :rules="rules.codigoReferencia" required></v-text-field>

              <v-text-field v-model="grupo.identificacion.proyectoInvestigacion" label="Proyecto de investigación" hint="Proyecto de investigación para el cual fueron realizados los registros a documentar"></v-text-field>

              <!-- Nota: País o países podrían ser autogenerados a partir de la información de las unidades documentales contenida -->
              <!-- <v-autocomplete v-model="grupo.identificacion.pais" :items="paises" item-text="nombre" label="País" hint="País o países de producción del registro en video"></v-autocomplete> -->

              <!-- Los calendarios requiere parámetros adicionales que se indican en la documentación de Vuetify -->
              <v-menu v-model="menuCalendar1" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px" >
                <template v-slot:activator="{ on }">
                  <v-text-field :value="computedFecha" label="Fecha" hint="Fecha en que se hizo el registro" prepend-icon="mdi-calendar" readonly v-on="on" ></v-text-field>
                </template>
                <v-date-picker v-model="grupo.identificacion.fecha" @input="menuCalendar1 = false" show-adjacent-months></v-date-picker>
              </v-menu>

              <v-text-field v-model="grupo.identificacion.entidadProductora" label="Entidad productora" hint="Nombre de la entidad o entidades que produjeron los registros audiovisuales"></v-text-field>
              
              <v-text-field v-model="grupo.identificacion.investigacion" label="Investigación" hint="Personas responsables de la investigación para la cual se realizaron los registros a documentar"></v-text-field>

              <v-text-field v-model="grupo.identificacion.coordinacionProyecto" label="Coordinación del proyecto" hint="Personas coordinadoras del proyecto de investigación en el marco del cual se realizaron los registros a documentar"></v-text-field>

              <v-text-field v-model="grupo.identificacion.coordinacionProduccionAudiovisual" label="Coordinación de producción audiovisual" hint="Persona coordinadora de la documentación audiovisual durante el proceso de investigación"></v-text-field>
            </v-card>
          </v-tab-item>

          <v-tab-item value="contexto" >
            <v-card flat>
              <v-textarea v-model="grupo.contexto.semblanzaBiografica" label="Semblanza biográfica" hint="Básicos curriculares de las personas encargadas de la investigación, coordinación del proyecto y de la producción audiovisual" auto-grow rows="3" row-height="25"></v-textarea>
            </v-card>
          </v-tab-item>

          <v-tab-item value="contenidoEstructura" >
            <v-card flat>
              <v-textarea v-model="grupo.contenidoEstructura.alcanceContenido" label="Alcance y contenido" hint="Descripción del valor potencial de la colección y se señala para quiénes puede ser útil" auto-grow rows="3" row-height="25" ></v-textarea>

              <v-textarea v-model="grupo.contenidoEstructura.valoracionSeleccionEliminacion" label="Valoración, selección y eliminación" hint="Se señala el criterio de selección y depuración de los materiales" auto-grow rows="3" row-height="25" ></v-textarea>
            </v-card>
          </v-tab-item>

          <v-tab-item value="accesoUso" >
            <v-card flat>
              <v-select v-model="grupo.accesoUso.condicionesAcceso" :items="['Usos reservados para consulta in situ']" label="Condiciones de acceso" hint="Los diversos usos del material que se ofrecen al usuario"></v-select>

              <v-select v-model="grupo.accesoUso.condicionesReproduccion" :items="['Usos no lucrativos', 'Usos lucrativos']" label="Condiciones de reproducción" hint="Si el registro original se puede reproducir o no, de acuerdo al tipo de solicitud"></v-select>
            </v-card>
          </v-tab-item>

          <v-tab-item value="notas" >
            <v-card flat>
              <v-textarea v-model="grupo.notas.notas" label="Notas" hint="Información que se considere relevante y que no pudo ser indexada en algún otro campo" auto-grow rows="5" row-height="25" ></v-textarea>
            </v-card>
          </v-tab-item>

          <v-tab-item value="controlDescripcion" >
            <v-card flat>
              <!-- Nota: Los nombres podrían aparecen automáticamente porque pueden obtenerse del usuario que está conectado, según lo indica la base de datos -->
              <v-text-field v-model="grupo.controlDescripcion.documentalistas" label="Documentalistas" hint="Nombres de las personas que llevaron a cabo la descripción"></v-text-field>

              <v-menu v-model="menuCalendar2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px" >
                <template v-slot:activator="{ on }">
                  <v-text-field :value="computedFechaDescripcion" label="Fecha de descripción" hint="Fecha en que se elaboró la ficha de la unidad" prepend-icon="mdi-calendar" readonly v-on="on" ></v-text-field>
                </template>
                <v-date-picker v-model="grupo.controlDescripcion.fechaDescripcion" @input="menuCalendar2 = false" readonly></v-date-picker>
              </v-menu>

              <v-menu v-model="menuCalendar3" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px" >
                <template v-slot:activator="{ on }">
                  <v-text-field :value="computedFechaActualizacion" label="Fecha de actualización" hint="Fecha de la última modificación a la ficha de la unidad" prepend-icon="mdi-calendar" readonly v-on="on" ></v-text-field>
                </template>
                <v-date-picker v-model="grupo.controlDescripcion.fechaActualizacion" @input="menuCalendar3 = false" readonly></v-date-picker>
              </v-menu>
            </v-card>
          </v-tab-item>

          <v-tab-item value="adicional" >
            <v-card flat>
              <v-file-input v-model="grupo.adicional.imagen" show-size counter chips accept="image/*" prepend-icon="mdi-image" label="Portada"></v-file-input>

              <v-checkbox v-model="grupo.adicional.isPublic" label="Registro público"></v-checkbox>
            </v-card>
          </v-tab-item>
        </v-tabs-items>

        <!-- Botón para finalizar el llenado del formulario -->
        <v-btn type="submit" :disable="!validForm" color="primary" block elevation="6" x-large>Registrar</v-btn>
      </v-form>

      <!-- Visualización textual del objeto grupo (solo para efectos de prueba) -->
      <pre>{{ grupo }}</pre>
    </v-card>
  </div>
</template>

<script>
import * as grupoService from '../../services/GrupoService'
import moment from 'moment' // para formatos de fechas

export default {
  data: () => ({
    // El objeto grupo representa un conjunto documental, es decir, un grupo audiovisual organizado por áreas
    // Algunos campos deben inicializarse, por ejemplo fechas, mientras que otros son valores por default, por ejemplo reglas o normas.
    grupo: {
      identificacion: {
        fecha: new Date().toISOString().substr(0, 10),
      },
      contexto: {},
      contenidoEstructura: {},
      accesoUso: {
        condicionesAcceso: 'Usos reservados para consulta in situ',
      },
      notas: {},
      controlDescripcion: {
        fechaDescripcion: new Date().toISOString().substr(0, 10),
        fechaActualizacion: new Date().toISOString().substr(0, 10),
      },
      adicional: {
          isPublic: true,
      },
    },

    // Auxiliar que representa numéricamente cuál pestaña (tab) está activa
    tab: null,

    // Auxiliares para mostrar/ocultar los diferentes calendarios del formulario
    menuCalendar1: false,
    menuCalendar2: false,
    menuCalendar3: false,

    // Auxiliar para indicar si todos los campos del formulario son válidos
    validForm: false,

    // Reglas adicionales para validaciones personalizadas de ciertos campos
    rules: {
      codigoReferencia: [
        value => !!value || 'El código de referencia es necesario. Ejemplo: MXIM-AV-2-3-1',
        value => /^MXIM-AV-2(-\d)*$/.test(value) || 'Debe ser un código de referencia válido. Ejemplo: MXIM-AV-2-3-1',
      ]
    },

    // Identificador para saber si el grupo se subió correctamente
    success: false

    // Nota: Propuesta de representación de personas para el campo de investigación y sus semblanzas
    // people: [
    //   {
    //     nombre: 'Lourdes Roca',
    //     semblanza: 'Semblanza de Lourdes Roca...',
    //   },
    //   {
    //     nombre: 'Felipe Morales',
    //     semblanza: 'Semblanza de Felipe Morales...',
    // ]
  }),

  beforeRouteLeave(to, from, next){
    if(!this.success){
      const respuesta = window.confirm("¿Seguro que quieres salir? Se podrían perder los datos del grupo")
      if(respuesta){
        next()
      }
    }
  },

  // Obtención de información desde API, antes de renderizar vista
  beforeRouteEnter(to, from, next){
    // En caso de crear nuevo registro:
    if(!to.params.id) // no hay :id en URL
      return next();

    // En caso de editar un registro existente:
    grupoService.getGroupById(to.params.id).then(res => {
      next(vm => { // vm es necesario para asignaciones, "this" no existe en este contexto
        let grupo = res.data.grupo;
        
        // Verificar inicializar áreas en caso de que alguna esté vacía:
        if(!grupo.identificacion)
          grupo.identificacion = {fecha: new Date().toISOString().substr(0, 10),};
        if(!grupo.contexto)
          grupo.contexto = {};
        if(!grupo.contenidoEstructura)
          grupo.contenidoEstructura = {};
        if(!grupo.accesoUso)
          grupo.accesoUso = {};
        if(!grupo.notas)
          grupo.notas = {};
        if(!grupo.controlDescripcion)
          grupo.controlDescripcion = { fechaDescripcion: new Date().toISOString().substr(0, 10), fechaActualizacion: new Date().toISOString().substr(0, 10) };
        if(!grupo.adicional)
          grupo.adicional = {isPublic: true};
          
        // Asignación final
        vm.grupo = grupo;
        vm.editMode = true;
      });
    })
    // En caso de error (400 HTTP status code)
    .catch(error => {
      next(vm => {
        vm.error = error.message;
        vm.video = null;
      })
    });
  },

  methods: {
    // Nota: Propuesta de método para asignar semnblanzas
    // setSemblanza: function(){
    //   // const person = this.searchArray(this.grupo.identificacion.investigacion, this.people);
    //   const person = this.people.find(o => o.nombre === this.grupo.identificacion.investigacion);
    //   this.grupo.contexto.semblanzaBiografica = person.semblanza;
    // },

    // Comportamiento al concluir el llenado del formulario y presionar el botón para enviar información a base de datos
    onSubmit: async function(){
      if(!this.$refs.grupoForm.validate()) // Se activa validación del formulario
        return;
      const request = {
        grupo: this.grupo,
      };
      try {
        // const newGrupo = await grupoService.createGroup(request); // TODO: Asignación en redirrecionamiento al grupo recien creado
        await grupoService.createGroup(request);
        this.success = true
        window.removeEventListener("beforeunload", this.preventNav);
        this.$router.push({name: 'home'}); // TODO: Redireccionamiento al grupo (usando newGroup.data.id)
      } catch (error) {
        this.success = false;
        this.error = error;
      }
    },
    
    preventNav(event) {
      event.preventDefault()
      event.returnValue = ""
    }
  },

  // Métodos específicos para variables y valores calculados
  computed: {
    // Dar formato dia/mes/año adecuado en las fechas que aparecen con calendarios
    computedFecha(){
      return this.grupo.identificacion.fecha ? moment(this.grupo.identificacion.fecha).format('DD/MM/YYYY') : '';
    },
    computedFechaDescripcion(){
      return this.grupo.controlDescripcion.fechaDescripcion ? moment(this.grupo.controlDescripcion.fechaDescripcion).format('DD/MM/YYYY') : '';
    },
    computedFechaActualizacion(){
      return this.grupo.controlDescripcion.fechaActualizacion ? moment(this.grupo.controlDescripcion.fechaActualizacion).format('DD/MM/YYYY') : '';
    }
  },

  beforeDestroy() {
    window.removeEventListener("beforeunload", this.preventNav);
  },

  mounted: function () {
    window.addEventListener("beforeunload", this.preventNav);
  }
}
</script>
