<!-- Formulario de ingreso de la información de un conjunto documental (grupo) -->

<template>
  <v-card class="pa-6">
    <!-- Título -->
    <v-card-title class="text-h3 justify-center">Colección documental</v-card-title>

    <!-- Formulario dividido por pestañas (tabs) que representan cada área (identificación, contexto, etc) -->
    <v-form ref="coleccionForm" v-model="validForm" lazy-validation v-on:submit.prevent="onSubmit">
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
            <v-text-field v-model="coleccion.identificacion.codigoReferencia" label="Código de referencia" hint="Código alfanumérico separado por guiones. Ejemplo: MXIM-AV-2-3-1" :rules="rules.codigoReferencia" required></v-text-field>

            <!-- Nota: País o países podrían ser autogenerados a partir de la información de las unidades documentales contenida -->
            <!-- <v-autocomplete v-model="coleccion.identificacion.pais" :items="paises" item-text="nombre" label="País" hint="País o países de producción del registro en video"></v-autocomplete> -->

            <v-text-field v-model="coleccion.identificacion.titulo" label="Título" hint="Título de la unidad de descripción"></v-text-field>

            <!-- <v-text-field v-model="coleccion.identificacion.proyectoInvestigacion" label="Proyecto de investigación" hint="Proyecto de investigación para el cual fueron realizados los registros a documentar"></v-text-field> -->

            <!-- Los calendarios requiere parámetros adicionales que se indican en la documentación de Vuetify -->
            <v-menu v-model="menuCalendar1" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px" >
              <template v-slot:activator="{ on }">
                <v-text-field :value="computedFecha" label="Fecha" hint="Fecha en que se hizo el registro" prepend-icon="mdi-calendar" readonly v-on="on" ></v-text-field>
              </template>
              <v-date-picker v-model="coleccion.identificacion.fecha" @input="menuCalendar1 = false" show-adjacent-months></v-date-picker>
            </v-menu>

            <v-select v-model="coleccion.identificacion.nivelDescripcion" :items="['Colección', 'Grupo', 'Subgrupo', 'Subsubgrupo']" label="Nivel de descripción"></v-select>

            <!-- <v-text-field v-model="coleccion.identificacion.investigacion" label="Investigación" hint="Personas responsables de la investigación para la cual se realizaron los registros a documentar"></v-text-field> -->

            <!-- <v-text-field v-model="coleccion.identificacion.coordinacionProyecto" label="Coordinación del proyecto" hint="Personas coordinadoras del proyecto de investigación en el marco del cual se realizaron los registros a documentar"></v-text-field> -->

            <!-- <v-text-field v-model="coleccion.identificacion.coordinacionAudiovisual" label="Coordinación de producción audiovisual" hint="Personas coordinadoras de la documentación audiovisual durante el proceso de investigación"></v-text-field> -->
            <v-text-field v-model="coleccion.identificacion.coordinacion" label="Coordinación" hint="Persona coordinadora del proyecto de investigación para el que se realizaron los registros a documentar"></v-text-field>
          </v-card>
        </v-tab-item>

        <v-tab-item value="contexto" >
          <v-card flat>
            <v-textarea v-model="coleccion.contexto.historiaInstitucional" label="Historia institucional" hint="Datos sobre el origen, evolución y desarrollo de la entidad productora de la colección, tomando en consideración a las personas físicas involucradas" auto-grow rows="3" row-height="25" ></v-textarea>

            <v-textarea v-model="coleccion.contexto.historiaArchivistica" label="Historia archivística" hint="Historia y el desarrollo de la colección, indicando aquellos hechos que han contribuido a conformar su estructura y organización actual" auto-grow rows="3" row-height="25" ></v-textarea>

            <v-textarea v-model="coleccion.contexto.semblanzaBiografica" label="Semblanza biográfica" hint="Básicos curriculares de las personas encargadas de la investigación, coordinación del proyecto y de la producción audiovisual" auto-grow rows="3" row-height="25"></v-textarea>
          </v-card>
        </v-tab-item>

        <v-tab-item value="contenidoEstructura" >
          <v-card flat>
            <v-textarea v-model="coleccion.contenidoEstructura.alcanceContenido" label="Alcance y contenido" hint="Descripción del valor potencial de la colección y se señala para quiénes puede ser útil" auto-grow rows="3" row-height="25" ></v-textarea>

            <v-textarea v-model="coleccion.contenidoEstructura.valoracionSeleccionEliminacion" label="Valoración, selección y eliminación" hint="Se señala el criterio de selección y depuración de los materiales" auto-grow rows="3" row-height="25" ></v-textarea>

            <v-text-field v-model="coleccion.contenidoEstructura.nuevosIngresos" label="Nuevos ingresos" hint="Se señala si es una colección abierta a nuevos ingresos o si se encuentra cerrada a su contenido actual"></v-text-field>

            <v-text-field v-model="coleccion.contenidoEstructura.organizacion" label="Organización" hint="Se establece la forma en que se organiza la colección"></v-text-field>
          </v-card>
        </v-tab-item>

        <v-tab-item value="accesoUso" >
          <v-card flat>
            <v-select v-model="coleccion.accesoUso.condicionesAcceso" :items="['Usos reservados para consulta in situ']" label="Condiciones de acceso" hint="Los diversos usos del material que se ofrecen al usuario"></v-select>

            <v-select v-model="coleccion.accesoUso.condicionesReproduccion" :items="['Usos no lucrativos', 'Usos lucrativos']" label="Condiciones de reproducción" hint="Si el registro original se puede reproducir o no, de acuerdo al tipo de solicitud"></v-select>
          </v-card>
        </v-tab-item>

        <v-tab-item value="notas" >
          <v-card flat>
            <v-textarea v-model="coleccion.notas.notas" label="Notas" hint="Información que se considere relevante y que no pudo ser indexada en algún otro campo" auto-grow rows="5" row-height="25" ></v-textarea>
          </v-card>
        </v-tab-item>

        <v-tab-item value="controlDescripcion" >
          <v-card flat>
            <!-- Nota: Los nombres podrían aparecen automáticamente porque pueden obtenerse del usuario que está conectado, según lo indica la base de datos -->
            <v-text-field v-model="coleccion.controlDescripcion.documentalistas" label="Documentalistas" hint="Nombres de las personas que llevaron a cabo la descripción"></v-text-field>

            <v-text-field v-model="coleccion.controlDescripcion.reglasNormas" label="Reglas o normas" hint="Normas que se utilizaron para la elaboración de la ficha"></v-text-field>

            <v-menu v-model="menuCalendar2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px" >
              <template v-slot:activator="{ on }">
                <v-text-field :value="computedFechaDescripcion" label="Fecha de descripción" hint="Fecha en que se elaboró la ficha de la unidad" prepend-icon="mdi-calendar" readonly v-on="on" ></v-text-field>
              </template>
              <v-date-picker v-model="coleccion.controlDescripcion.fechaDescripcion" @input="menuCalendar2 = false" readonly></v-date-picker>
            </v-menu>

            <v-menu v-model="menuCalendar3" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px" >
              <template v-slot:activator="{ on }">
                <v-text-field :value="computedFechaActualizacion" label="Fecha de actualización" hint="Fecha de la última modificación a la ficha de la unidad" prepend-icon="mdi-calendar" readonly v-on="on" ></v-text-field>
              </template>
              <v-date-picker v-model="coleccion.controlDescripcion.fechaActualizacion" @input="menuCalendar3 = false" readonly></v-date-picker>
            </v-menu>
          </v-card>
        </v-tab-item>

        <v-tab-item value="adicional" >
          <v-card flat>
            <v-file-input v-model="coleccion.adicional.imagen" show-size counter chips accept="image/*" prepend-icon="mdi-image" label="Portada"></v-file-input>

            <v-textarea v-model="coleccion.adicional.presentacion" label="Presentación" hint="" auto-grow rows="5" row-height="25" ></v-textarea>

            <v-checkbox v-model="coleccion.adicional.isPublic" label="Registro público"></v-checkbox>
          </v-card>
        </v-tab-item>
      </v-tabs-items>

      <!-- Botón para finalizar el llenado del formulario -->
      <v-btn type="submit" :disable="!validForm" color="primary" block elevation="6" x-large>Registrar</v-btn>
    </v-form>

    <!-- Visualización textual del objeto coleccion (solo para efectos de prueba) -->
    <pre>{{ coleccion }}</pre>
  </v-card>
</template>

<script>
import * as coleccionService from '../../services/ColeccionService'
import moment from 'moment' // para formatos de fechas

export default {
  data: () => ({
    // El objeto coleccion representa una conjunto documental, es decir, un grupo audiovisual organizado por áreas
    // Algunos campos deben inicializarse, por ejemplo fechas, mientras que otros son valores por default, por ejemplo reglas o normas.
    coleccion: {
      identificacion: {
        fecha: new Date().toISOString().substr(0, 10),
      },
      contexto: {},
      contenidoEstructura: {
        organizacion: 'Por proyecto de investigación',
      },
      accesoUso: {
        condicionesAcceso: 'Usos reservados para consulta in situ',
      },
      notas: {},
      controlDescripcion: {
        reglasNormas: 'LAIS, Lineamientos para la descripción de Registros de video propios, 2021',
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

  methods: {
    // Nota: Propuesta de método para asignar semnblanzas
    // setSemblanza: function(){
    //   // const person = this.searchArray(this.coleccion.identificacion.investigacion, this.people);
    //   const person = this.people.find(o => o.nombre === this.coleccion.identificacion.investigacion);
    //   this.coleccion.contexto.semblanzaBiografica = person.semblanza;
    // },

    // Comportamiento al concluir el llenado del formulario y presionar el botón para enviar información a base de datos
    onSubmit: async function(){
      if(!this.$refs.coleccionForm.validate()) // Se activa validación del formulario
        return;
      const request = {
        coleccion: this.coleccion,
      };
      const newColeccion = await coleccionService.createColection(request);
      console.log('newColeccion: ', newColeccion);
      this.$router.push({name: 'home'}); // TODO: Redireccionamiento a la colección (usando newColeccion.data.id)
    },
  },

  // Métodos específicos para variables y valores calculados
  computed: {
    // Dar formato dia/mes/año adecuado en las fechas que aparecen con calendarios
    computedFecha(){
      return this.coleccion.identificacion.fecha ? moment(this.coleccion.identificacion.fecha).format('DD/MM/YYYY') : '';
    },
    computedFechaDescripcion(){
      return this.coleccion.controlDescripcion.fechaDescripcion ? moment(this.coleccion.controlDescripcion.fechaDescripcion).format('DD/MM/YYYY') : '';
    },
    computedFechaActualizacion(){
      return this.coleccion.controlDescripcion.fechaActualizacion ? moment(this.coleccion.controlDescripcion.fechaActualizacion).format('DD/MM/YYYY') : '';
    }
  }
}
</script>
