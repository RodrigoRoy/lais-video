<!-- Formulario de ingreso de la información de una unidad documental (registro audiovisual) -->

<template>
  <v-card class="pa-6">
    <!-- Título -->
    <v-card-title class="text-h3 justify-center">Registro de unidad simple</v-card-title>

    <!-- Formulario dividido por pestañas (tabs) que representan cada área (identificación, contenido y estructura, etc) -->
    <v-form ref="videoForm" v-model="validForm" lazy-validation v-on:submit.prevent="onSubmit">
      <v-tabs v-model="tab" centered icons-and-text >
        <v-tabs-slider></v-tabs-slider>

        <!-- Encabezados de pestañas -->
        <v-tab href="#identificacion">
          Identificación
          <v-icon>mdi-film</v-icon>
        </v-tab>

        <v-tab href="#contenidoEstructura">
          Contenido y estructura
          <v-icon>mdi-book-open-page-variant</v-icon>
        </v-tab>

        <v-tab href="#accesoUso">
          Acceso y uso
          <v-icon>mdi-key</v-icon>
        </v-tab>

        <v-tab href="#documentacionAsociada">
          Documentación asociada
          <v-icon>mdi-paperclip</v-icon>
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
            <v-text-field v-model="video.identificacion.codigoReferencia" label="Código de referencia" hint="Código alfanumérico separado por guiones. Ejemplo: MXIM-AV-2-3-1-2" :rules="rules.codigoReferencia" required></v-text-field>

            <!-- Los calendarios requiere parámetros adicionales que se indican en la documentación de Vuetify -->
            <v-menu v-model="menuCalendar1" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px" >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field :value="computedFecha" label="Fecha" hint="Fecha en que se hizo el registro" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" @click:clear="date = null"></v-text-field>
              </template>
              <v-date-picker v-model="video.identificacion.fecha" @input="menuCalendar1 = false" show-adjacent-months></v-date-picker>
            </v-menu>

            <v-text-field v-model="video.identificacion.lugar" label="Lugar de registro" hint="Nombre del lugar o lugares, donde se llevó a cabo el registro, partiendo de lo particular a lo general"></v-text-field>

            <l-map style="height: 300px" :zoom="zoom" :center="center" @click="addMarker">
              <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
              <l-marker :lat-lng="markerLatLng" @click="removeMarker()" :visible="markerVisibility"></l-marker>
            </l-map>

            <v-combobox v-model="video.identificacion.pais" :items="paises" label="País" hint="País o países de producción del registro en video"></v-combobox>

            <v-text-field v-model="video.identificacion.duracion" label="Duración" hint="Se consigna la duración del registro en minutos" :rules="rules.duracion"></v-text-field>

            <v-text-field v-model="video.identificacion.personasEntrevistadas" label="Persona entrevistada" hint="Persona que entabla un diálogo con la persona que dirige la entrevista"></v-text-field>

            <v-text-field v-model="video.identificacion.entrevistador" label="Persona que entrevista" hint="Persona encargada de realizar la entrevista"></v-text-field>

            <v-text-field v-model="video.identificacion.camara" label="Cámara" hint="Persona encargada de operar la cámara de video"></v-text-field>

            <v-text-field v-model="video.identificacion.iluminacion" label="Iluminación" hint="Persona encargada de la colocación de las lámparas en la realización de una entrevista o en el trabajo de campo"></v-text-field>

            <v-text-field v-model="video.identificacion.sonido" label="Sonido" hint="Persona encargada de la colocación de los micrófonos y grabación de sonido"></v-text-field>

            <v-text-field v-model="video.identificacion.asistente" label="Asistente" hint="Persona o personas encargadas de apoyar en diversas labores técnicas"></v-text-field>
          </v-card>
        </v-tab-item>

        <v-tab-item value="contenidoEstructura" >
          <v-card flat>
            <v-textarea v-model="video.contenidoEstructura.descripcionGeneral" label="Descripción general" hint="Contenido del material. Se describen los lugares, personas y/o acciones registradas, según tipos de plano, emplazamientos y movimientos" auto-grow rows="3" row-height="25" ></v-textarea>

            <v-select v-model="video.contenidoEstructura.estructuraFormal" :items="['Grabación en campo', 'Registro con entrevista', 'Registro de materiales', 'Entrevista controlada', 'Entrevista en campo', 'Entrevista con imágenes', 'Entrevista con acción']" label="Estructura formal"></v-select>

            <v-text-field v-model="video.contenidoEstructura.descriptorOnomastico" label="Descriptor onomástico" hint="Nombres de las personas (nombre y apellido) que aparecen el registro"></v-text-field>

            <v-text-field v-model="video.contenidoEstructura.descriptorToponimico" label="Descriptor toponímico" hint="Nombres de las localidades o sitios que aparecen en el registro"></v-text-field>
          </v-card>
        </v-tab-item>

        <v-tab-item value="accesoUso" >
          <v-card flat>
            <v-text-field v-model="video.accesoUso.idiomaOriginal" label="Idioma original" hint="Idioma o idiomas originales del registro"></v-text-field>

            <v-select v-model="video.accesoUso.soporte" :items="['Betacam', 'Hi8', 'DVCAM', 'MiniDV', 'Archivo digital']" label="Soporte"></v-select>

            <v-text-field v-model="video.accesoUso.numeroCasetes" label="Número de casetes"></v-text-field>

            <v-select v-model="video.accesoUso.color" :items="['Color', 'Blanco y negro']" label="Color"></v-select>

            <v-select v-model="video.accesoUso.audio" :items="['Dolby', 'Dolby Digital', 'Estéreo', 'Estéreo mezclado', 'Monoaural']" label="Audio"></v-select>

            <v-select v-model="video.accesoUso.sistemaGrabacion" :items="['NTSC', 'PAL', 'SECAM']" label="Sistema de grabación"></v-select>

            <v-select v-model="video.accesoUso.resolucionGrabacion" :items="['480i (NTSC)', '576i (PAL)', '480p (720x480)', '720p (1280x720)', '1080i (1920x1080)', '1080p (1920x1080)', '4K (3840x2160)']" label="Resolución de grabación"></v-select>

            <v-select v-model="video.accesoUso.formatoVideoDigital" :items="['MOV', 'AVCHD', 'MTS', 'MP4']" label="Formato de video digital"></v-select>

            <v-text-field v-model="video.accesoUso.requisitosTecnicos" label="Requisitos técnicos" hint="Equipo de reproducción o software que se requiere para visionar el material"></v-text-field>
          </v-card>
        </v-tab-item>

        <v-tab-item value="documentacionAsociada" >
          <v-card flat>
            <v-textarea v-model="video.documentacionAsociada.unidadesDescripcionRelacionadas" label="Unidades de descripción relacionada" hint="Relación que existe entre dos o más unidades de la misma colección a partir de coincidencias temáticas o conceptuales" auto-grow rows="3" row-height="25" ></v-textarea>

            <v-textarea v-model="video.documentacionAsociada.documentosAsociados" label="Documentos asociados" hint="Publicación o documento que tenga relación directa con la producción catalogada. La relación puede ser temática, autoral, etc." auto-grow rows="3" row-height="25" ></v-textarea>
          </v-card>
        </v-tab-item>

        <v-tab-item value="notas" >
          <v-card flat>
            <v-textarea v-model="video.notas.notas" label="Notas" hint="Información que se considere relevante y que no pudo ser indexada en algún otro campo" auto-grow rows="5" row-height="25" ></v-textarea>
          </v-card>
        </v-tab-item>

        <v-tab-item value="controlDescripcion" >
          <v-card flat>
            <!-- Nota: Este campo podría cambiar o eliminarse en el futuro -->
            <!-- <v-textarea v-model="video.controlDescripcion.notaArchivero" label="Nota del archivero" hint="Fuentes usadas para complementar la información de la ficha (producción original, sitios web, publicaciones, etc.)" auto-grow rows="3" row-height="25" ></v-textarea> -->

            <v-text-field v-model="video.controlDescripcion.nombreArchivero" label="Archivista" hint="Nombre completo de la persona que elaboró la ficha de la unidad"></v-text-field>

            <v-menu v-model="menuCalendar2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px" >
              <template v-slot:activator="{ on }">
                <v-text-field :value="computedFechaDescripcion" label="Fecha de descripción" hint="Fecha en que se elaboró la ficha de la unidad" prepend-icon="mdi-calendar" readonly v-on="on" ></v-text-field>
              </template>
              <v-date-picker v-model="video.controlDescripcion.fechaDescripcion" @input="menuCalendar2 = false" readonly></v-date-picker>
            </v-menu>

            <v-menu v-model="menuCalendar3" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px" >
              <template v-slot:activator="{ on }">
                <v-text-field :value="computedFechaActualizacion" label="Fecha de actualización" hint="Fecha de la última modificación a la ficha de la unidad" prepend-icon="mdi-calendar" readonly v-on="on" ></v-text-field>
              </template>
              <v-date-picker v-model="video.controlDescripcion.fechaActualizacion" @input="menuCalendar3 = false" readonly></v-date-picker>
            </v-menu>
          </v-card>
        </v-tab-item>

        <v-tab-item value="adicional" >
          <v-card flat>
            <v-file-input v-model="video.adicional.imagen" show-size counter chips accept="video/*" prepend-icon="mdi-camera" label="Fragmento de registro audiovisual"></v-file-input>
            <v-file-input v-model="video.adicional.video" show-size counter chips accept="image/*" prepend-icon="mdi-image" label="Imagen"></v-file-input>
            <v-file-input v-model="video.adicional.calificacion" show-size counter chips accept=".pdf" prepend-icon="mdi-file-document-outline" label="Calificación del registro"></v-file-input>
          </v-card>
        </v-tab-item>
      </v-tabs-items>

      <!-- Botón para finalizar el llenado del formulario -->
      <v-btn type="submit" :disable="!validForm" color="primary" block elevation="6" x-large @click="validate">Registrar</v-btn>
    </v-form>

    <!-- Visualización textual del objeto video (solo para efectos de prueba) -->
    <!-- <pre>{{ video }}</pre> -->
  </v-card>
</template>


<script>
import moment from 'moment' // para formatos de fechas
import L from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'; // elementos principales para mapas

// Solución al problema de falta de icono en mapas según documentación oficial: https://vue2-leaflet.netlify.app/quickstart/#marker-icons-are-missing
import { Icon } from 'leaflet';
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


export default {
  data: () => ({
    // El objeto video representa una unidad documental, es decir, un registro audiovisual organizado por áreas
    // Algunos campos deben inicializarse, por ejemplo fechas
    video: {
      identificacion: {
        fecha: new Date().toISOString().substr(0, 10),
      },
      contenidoEstructura: {},
      accesoUso: {},
      documentacionAsociada: {},
      notas: {},
      controlDescripcion: {
        fechaDescripcion: new Date().toISOString().substr(0, 10),
        fechaActualizacion: new Date().toISOString().substr(0, 10),
      },
      adicional: {
        isPublic: true,
      }
    },

    // Auxiliar para mostrar paises como un referente opcional
    paises: ['Afganistán', 'Akrotiri', 'Albania', 'Alemania', 'Andorra', 'Angola', 'Anguila', 'Antártida', 'Antigua y Barbuda', 'Arabia Saudí', 'Arctic Ocean', 'Argelia', 'Argentina', 'Armenia', 'Aruba', 'Ashmore and Cartier Islands', 'Atlantic Ocean', 'Australia', 'Austria', 'Azerbaiyán', 'Bahamas', 'Bahráin', 'Bangladesh', 'Barbados', 'Bélgica', 'Belice', 'Benín', 'Bermudas', 'Bielorrusia', 'Birmania; Myanmar', 'Bolivia', 'Bosnia y Hercegovina', 'Botsuana', 'Brasil', 'Brunéi', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Bután', 'Cabo Verde', 'Camboya', 'Camerún', 'Canadá', 'Chad', 'Chile', 'China', 'Chipre', 'Clipperton Island', 'Colombia', 'Comoras', 'Congo', 'Coral Sea Islands', 'Corea del Norte', 'Corea del Sur', 'Costa de Marfil', 'Costa Rica', 'Croacia', 'Cuba', 'Curacao', 'Dhekelia', 'Dinamarca', 'Dominica', 'Ecuador', 'Egipto', 'El Salvador', 'El Vaticano', 'Emiratos Árabes Unidos', 'Eritrea', 'Eslovaquia', 'Eslovenia', 'España', 'Estados Unidos', 'Estonia', 'Etiopía', 'Filipinas', 'Finlandia', 'Fiyi', 'Francia', 'Gabón', 'Gambia', 'Gaza Strip', 'Georgia', 'Ghana', 'Gibraltar', 'Granada', 'Grecia', 'Groenlandia', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Ecuatorial', 'Guinea-Bissau', 'Guyana', 'Haití', 'Honduras', 'Hong Kong', 'Hungría', 'India', 'Indian Ocean', 'Indonesia', 'Irán', 'Iraq', 'Irlanda', 'Isla Bouvet', 'Isla Christmas', 'Isla Norfolk', 'Islandia', 'Islas Caimán', 'Islas Cocos', 'Islas Cook', 'Islas Feroe', 'Islas Georgia del Sur y Sandwich del Sur', 'Islas Heard y McDonald', 'Islas Malvinas', 'Islas Marianas del Norte', 'Islas Marshall', 'Islas Pitcairn', 'Islas Salomón', 'Islas Turcas y Caicos', 'Islas Vírgenes Americanas', 'Islas Vírgenes Británicas', 'Israel', 'Italia', 'Jamaica', 'Jan Mayen', 'Japón', 'Jersey', 'Jordania', 'Kazajistán', 'Kenia', 'Kirguizistán', 'Kiribati', 'Kosovo', 'Kuwait', 'Laos', 'Lesoto', 'Letonia', 'Líbano', 'Liberia', 'Libia', 'Liechtenstein', 'Lituania', 'Luxemburgo', 'Macao', 'Macedonia', 'Madagascar', 'Malasia', 'Malaui', 'Maldivas', 'Malí', 'Malta', 'Man, Isle of', 'Marruecos', 'Mauricio', 'Mauritania', 'México', 'Micronesia', 'Moldavia', 'Mónaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Mozambique', 'Mundo', 'Namibia', 'Nauru', 'Navassa Island', 'Nepal', 'Nicaragua', 'Níger', 'Nigeria', 'Niue', 'Noruega', 'Nueva Caledonia', 'Nueva Zelanda', 'Omán', 'Pacific Ocean', 'Países Bajos', 'Pakistán', 'Palaos', 'Panamá', 'Papúa-Nueva Guinea', 'Paracel Islands', 'Paraguay', 'Perú', 'Polinesia Francesa', 'Polonia', 'Portugal', 'Puerto Rico', 'Qatar', 'Reino Unido', 'República Centroafricana', 'República Democrática del Congo', 'República Dominicana', 'Ruanda', 'Rumania', 'Rusia', 'Sáhara Occidental', 'Samoa', 'Samoa Americana', 'San Bartolomé', 'San Cristóbal y Nieves', 'San Marino', 'San Martín', 'San Pedro y Miquelón', 'San Vicente y las Granadinas', 'Santa Helena', 'Santa Lucía', 'Santo Tomé y Príncipe', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leona', 'Singapur', 'Sint Maarten', 'Siria', 'Somalia', 'Southern Ocean', 'Spratly Islands', 'Sri Lanka', 'Suazilandia', 'Sudáfrica', 'Sudán', 'Sudán del Sur', 'Suecia', 'Suiza', 'Surinam', 'Svalbard y Jan Mayen', 'Tailandia', 'Taiwán', 'Tanzania', 'Tayikistán', 'Territorio Británico del Océano Indico', 'Territorios Australes Franceses', 'Timor Oriental', 'Togo', 'Tokelau', 'Tonga', 'Trinidad y Tobago', 'Túnez', 'Turkmenistán', 'Turquía', 'Tuvalu', 'Ucrania', 'Uganda', 'Unión Europea', 'Uruguay', 'Uzbekistán', 'Vanuatu', 'Venezuela', 'Vietnam', 'Wake Island', 'Wallis y Futuna', 'West Bank', 'Yemen', 'Yibuti', 'Zambia', 'Zimbabue'],

    // Auxiliar que representa numéricamente cuál pestaña (tab) está activa
    tab: null,

    // Auxiliares para mostrar/ocultar los diferentes calendarios del formulario
    menuCalendar1: false,
    menuCalendar2: false,
    menuCalendar3: false,

    // Auxiliar para indicar si todos los campos del formulario son válidos
    validForm: true,

    // Reglas adicionales para validaciones personalizadas de ciertos campos
    rules: {
      codigoReferencia: [
        value => !!value || 'El código de referencia es necesario. Ejemplo: MXIM-AV-2-3-1-2',
        value => /^MXIM-AV-2(-\d)*$/.test(value) || 'Debe ser un código de referencia válido. Ejemplo: MXIM-AV-2-3-1-2',
      ],
      duracion: [
        value => /^\d+$/.test(value) || 'La duración debe ser el número de minutos'
      ],
      duracion2: [
        value => /(^\d{1,3}:\d{1,2}(:\d{1,2}){0,1}$){0,1}/.test(value) || 'La duración debe estar en el formato correcto'
      ]
    },

    // Valores para usar en mapa
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
    '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    zoom: 15,
    center: L.latLng(19.37651880288312, -99.18512156842415),
    markerLatLng: L.latLng(19.37651880288312, -99.18512156842415),
    markerVisibility: true,
  }),

  methods: {
    // Validación constante de los campos del formulario
    validate () {
      this.$refs.videoForm.validate()
    },
    // Comportamiento al concluir el llenado del formulario y presionar el botón para enviar información a base de datos
    onSubmit: function(){
      if(!this.$refs.videoForm.validate()) // Se activa validación del formulario
        return;
      // console.log("Enviar formulario...");
      // console.log(this.video);
      // TODO: Usar api para envio de información
    },
    // Agregar marcador al dar clic en mapa
    addMarker(event) {
      this.markerLatLng = event.latlng;
      this.markerVisibility = true;
    },
    // Eliminar marcador al dar clic en mapa
    removeMarker() {
      this.markerLatLng = undefined;
      this.markerVisibility = false;
    }
  },

  // Métodos específicos para variables y valores calculados
  computed: {
    // Dar formato dia/mes/año adecuado en las fechas que aparecen con calendarios
    computedFecha(){
      return this.video.identificacion.fecha ? moment(this.video.identificacion.fecha).format('DD/MM/YYYY') : '';
    },
    computedFechaDescripcion(){
      return this.video.controlDescripcion.fechaDescripcion ? moment(this.video.controlDescripcion.fechaDescripcion).format('DD/MM/YYYY') : '';
    },
    computedFechaActualizacion(){
      return this.video.controlDescripcion.fechaActualizacion ? moment(this.video.controlDescripcion.fechaActualizacion).format('DD/MM/YYYY') : '';
    }
  },

  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
}
</script>
