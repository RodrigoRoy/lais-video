<!-- Formulario de ingreso de la información de un conjunto documental (grupo) -->

<template>
  <div>
    <!-- Caso de éxito al subir información -->
    <v-alert v-model="success" dismissible type="success">
      <v-row align="center">
        <v-col class="grow">
          Información subida correctamente con ID: {{ coleccionId }}
        </v-col>
        <v-col class="shrink">
          <v-btn :href="`/coleccion/${coleccionId}`">Ver registro</v-btn>
        </v-col>
      </v-row>
    </v-alert>

    <!-- En caso de error en petición al API -->
    <v-alert prominent type="error" v-if="error">
      <v-row align="center">
        <v-col class="grow">
          {{ error }}
        </v-col>
        <v-col class="shrink">
          <v-btn href="/home">Ir al inicio</v-btn>
        </v-col>
      </v-row>
    </v-alert>

    <!-- Cuando no hay error -->
    <v-card v-else class="pa-6">
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
              <v-text-field v-model="computedDocumentalistas" label="Documentalistas" hint="Nombres de las personas que llevaron a cabo la descripción"></v-text-field>

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
              <v-file-input v-model="files.image" show-size accept="image/*" prepend-icon="mdi-image" label="Portada"></v-file-input>

              <v-textarea v-model="coleccion.adicional.presentacion" label="Presentación" hint="" auto-grow rows="5" row-height="25" ></v-textarea>

              <v-checkbox v-model="coleccion.adicional.isPublic" label="Registro público"></v-checkbox>
            </v-card>
          </v-tab-item>
        </v-tabs-items>

        <!-- Botón para finalizar el llenado del formulario -->
        <v-btn type="submit" :disable="!validForm" color="primary" block elevation="6" x-large>
          <span v-if="!editMode">Crear</span>
          <span v-else>Actualizar</span>
        </v-btn>
      </v-form>

      <!-- Visualización textual del objeto coleccion (solo para efectos de prueba) -->
      <!-- <pre>{{ coleccion }}</pre> -->
    </v-card>
  </div>
</template>

<script>
import * as coleccionService from '../../services/ColeccionService' // servicio para llamadas al API
import moment from 'moment' // para formatos de fechas
import * as fileService from '../../services/FileService' // servicio para subir archivos al servidor desde API

export default {
  name: 'ColeccionForm',
  data: () => ({
    // El objeto coleccion representa una conjunto documental, es decir, un grupo audiovisual organizado por áreas
    // Algunos campos deben inicializarse, por ejemplo fechas, mientras que otros son valores por default, por ejemplo reglas o normas.
    coleccion: {
      identificacion: {},
      contexto: {},
      contenidoEstructura: {
        organizacion: 'Por proyecto de investigación',
      },
      accesoUso: {
        condicionesAcceso: 'Usos reservados para consulta in situ',
      },
      notas: {},
      controlDescripcion: {
        documentalistas: [],
        reglasNormas: 'LAIS, Lineamientos para la descripción de Registros de video propios, 2021',
      },
      adicional: {
        isPublic: true,
        user: [],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Auxiliar para almacenar información de archivos a subir
    files: {
      image: null,
    },

    // Id del registro después de ser creado en base de datos
    coleccionId: '',

    // Determina si se está realizando subida de archivos (video, imagen, documentos) 
    isUploading: false,

    // Bandera para determinar si está editando o creando una colección.
    editMode: false,
    // Texto de error, en caso de haber
    error: false,

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

    // Identificador para saber si la coleccion se subió correctamente
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
    if(!this.success){ // en caso de que aún no se ha concluido de trabajar el formulario
      const respuesta = window.confirm("¿Seguro que quieres salir? Se perderán los datos del formulario")
      // en caso de respuesta negativa, se retiene en la ruta actual
      if(respuesta){ // en caso de éxito al trabajar con el formulario
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
    coleccionService.getColectionById(to.params.id).then(res => {
      next(vm => { // vm es necesario para asignaciones, "this" no existe en este contexto
        let coleccion = res.data.coleccion;
        
        // Verificar inicializar áreas en caso de que alguna esté vacía:
        if(!coleccion.identificacion)
          coleccion.identificacion = {fecha: new Date().toISOString().substr(0, 10),};
        if(!coleccion.contexto)
          coleccion.contexto = {};
        if(!coleccion.contenidoEstructura)
          coleccion.contenidoEstructura = {};
        if(!coleccion.accesoUso)
          coleccion.accesoUso = {};
        if(!coleccion.notas)
          coleccion.notas = {};
        if(!coleccion.controlDescripcion)
          coleccion.controlDescripcion = {};
        if(!coleccion.adicional)
          coleccion.adicional = {isPublic: true};

        // Asignación final
        vm.coleccion = coleccion;
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
    //   // const person = this.searchArray(this.coleccion.identificacion.investigacion, this.people);
    //   const person = this.people.find(o => o.nombre === this.coleccion.identificacion.investigacion);
    //   this.coleccion.contexto.semblanzaBiografica = person.semblanza;
    // },

    // Comportamiento al concluir el llenado del formulario y presionar el botón para enviar información a base de datos
    onSubmit: async function(){
      if(!this.$refs.coleccionForm.validate()) // Se activa validación del formulario
        return;
      this.isUploading = true; // inicia subida de archivos e información
      try {
        if(this.files.image) // archivo de imagen
          await this.uploadImageFile();
        
        // Enviar datos textuales a base de datos
        const request = {
          coleccion: this.coleccion,
        };

        let myResponse; // objeto res después de creación o edición del registro
        if (this.editMode) {
          myResponse = await coleccionService.updateColection(request);
        } else {
          myResponse = await coleccionService.createColection(request);
        }

        // Notificaciones:
        this.isUploading = false; // termina subida de archivos e información
        this.success = true; // subida de registro completada exitosamente
        this.coleccionId = myResponse.data.id; // identificador en base de datos
        window.removeEventListener("beforeunload", this.preventNav);
        // Reenviar a la vista del registro recien creado
        this.$router.push({name: 'coleccion-view', params: {id: this.coleccionId}});
      } catch (error) {
        this.success = false;
        this.error = error;
      }
    },

    // Subir un archivo de imagen desde API
    uploadImageFile: async function(){
      const formData = new FormData(); // creación de formulario en blanco
      formData.append('image', this.files.image); // adjuntar campo con objeto tipo File
      formData.append('codigoReferencia', this.coleccion.identificacion.codigoReferencia); // adjuntar campo con información extra
      try{
        const response = await fileService.uploadImage(formData); // petición desde API
        this.coleccion.adicional.imagen = response.data.filename; // asignación del nombre de archivo guardado
      }
      catch(err){ // error de conexión
        this.error = err;
      }
    },
    
    // Función que controla el evento de salida o recarga de páginas. Se activa al entrar al formulario y se desactiva al salir o llenar correctamente
    preventNav(event) {
      event.preventDefault()
      event.returnValue = ""
    }
  },

  // Métodos específicos para variables y valores calculados
  computed: {
    // Dar formato dia/mes/año adecuado en las fechas que aparecen con calendarios
    computedFecha(){
      return this.coleccion.identificacion.fecha ? moment(this.coleccion.identificacion.fecha).format('DD/MM/YYYY') : '';
    },
    computedFechaDescripcion(){
      return this.coleccion.createdAt ? moment(this.coleccion.createdAt).format('DD/MM/YYYY') : '';
    },
    computedFechaActualizacion(){
      return this.coleccion.updatedAt ? moment(this.coleccion.updatedAt).format('DD/MM/YYYY') : '';
    },
    // Manera estandar para usar variables globales (state) como variables locales
    computedUserId(){
      return this.$store.state.userId;
    },
    computedUserFullname(){
      return this.$store.state.fullname;
    },
    // Conversión de arreglo/lista a texto/string para nombres de archivistas
    computedDocumentalistas(){
      return this.coleccion.controlDescripcion.documentalistas.join(', ');
    }
  },

  // Destruye el evento que se encuentra escuchado por la salida o recarga de páginas
  beforeDestroy() {
    window.removeEventListener("beforeunload", this.preventNav);
  },

  // Acciones a realizar justo antes de montar y renderizar componente Vue
  mounted: function () {
    window.addEventListener("beforeunload", this.preventNav);

    // Agregar nombre completo de archivista si no está enlistado
    if(!this.coleccion.controlDescripcion.documentalistas.includes(this.computedUserFullname))
      this.coleccion.controlDescripcion.documentalistas.push(this.computedUserFullname);
    // Agregar id de usuario de archivista si no está enlistado
    if(!this.coleccion.adicional.user.includes( this.computedUserId ))
      this.coleccion.adicional.user.push(this.computedUserId);
  }
}
</script>
