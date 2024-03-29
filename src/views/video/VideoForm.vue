<!-- Formulario de ingreso de la información de una unidad documental (registro audiovisual) -->

<template>
  <div>
    <!-- Caso de éxito al subir información -->
    <v-alert v-model="success" dismissible type="success">
      <v-row align="center">
        <v-col class="grow">
          Información subida correctamente con ID: {{ videoId }}
        </v-col>
        <v-col class="shrink">
          <v-btn :href="`/video/${videoId}`">Ver registro</v-btn>
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
          <v-btn href="/">Ir a inicio</v-btn>
        </v-col>
      </v-row>
    </v-alert>

    <!-- Cuando no hay error, proceder con normalidad -->
    <v-card v-else class="pa-6">
      <!-- Título -->
      <v-card-title class="text-h3 justify-center">Unidad simple</v-card-title>

      <!-- Formulario dividido por pestañas (tabs) que representan cada área (identificación, contenido y estructura, etc) -->
      <v-form ref="videoForm" v-model="validForm" lazy-validation v-on:submit.prevent="onSubmit" enctype="multipart/form-data">
        <v-tabs v-model="tab" centered icons-and-text show-arrows>
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

              <v-text-field v-model="video.identificacion.lugar" label="Lugar de registro" hint="Nombre del lugar o lugares, donde se llevó a cabo el registro, partiendo de lo particular a lo general"></v-text-field>

              <l-map ref="leafletMap" style="height: 300px" :zoom="map.zoom" :center="map.center" :options="map.options">
                <l-control-layers position="topright"></l-control-layers>
                <l-tile-layer v-for="tileProvider in map.tileProviders" :key="tileProvider.name" :name="tileProvider.name" :visible="tileProvider.visible" :url="tileProvider.url" :attribution="tileProvider.attribution" layer-type="base"/>
                <v-geosearch :options="map.geosearchOptions"></v-geosearch>
                <l-marker ref="leafletMarker" :draggable="map.marker.draggable" :lat-lng.sync="map.marker.latLng" :visible="map.marker.visibility"></l-marker>
                <l-control position="bottomleft">
                  <v-btn fab small rounded @click="clickButtonMap"><v-icon>mdi-map-marker</v-icon></v-btn>
                </l-control>
              </l-map>

              <!-- Los calendarios requiere parámetros adicionales que se indican en la documentación de Vuetify -->
              <v-menu v-model="menuCalendar1" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px" >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field :value="computedFecha" label="Fecha" hint="Fecha en que se hizo el registro" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" @click:clear="date = null"></v-text-field>
                </template>
                <v-date-picker v-model="video.identificacion.fecha" @input="menuCalendar1 = false" show-adjacent-months></v-date-picker>
              </v-menu>

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
            <!-- TODO Permitir borrar selección (seleccionar cadena de texto vacia) en v-select -->
            <v-card flat>
              <v-text-field v-model="video.accesoUso.idiomaOriginal" label="Idioma original" hint="Idioma o idiomas originales del registro"></v-text-field>

              <v-select v-model="video.accesoUso.soporte" :items="['Betacam', 'Hi8', 'DVCAM', 'MiniDV', 'Archivo digital']" label="Soporte"></v-select>

              <v-text-field v-model="video.accesoUso.numeroCasetes" label="Número de casetes"></v-text-field>

              <v-select v-model="video.accesoUso.color" :items="['Color', 'Blanco y negro']" label="Color"></v-select>

              <v-select v-model="video.accesoUso.audio" :items="['Dolby', 'Dolby Digital', 'Estéreo', 'Estéreo mezclado', 'Monoaural']" label="Audio"></v-select>

              <v-select v-model="video.accesoUso.sistemaGrabacion" :items="['NTSC', 'PAL', 'SECAM']" label="Sistema de grabación"></v-select>

              <!-- <v-select v-model="video.accesoUso.resolucionGrabacion" :items="['480i (NTSC)', '576i (PAL)', '480p (720x480)', '720p (1280x720)', '1080i (1920x1080)', '1080p (1920x1080)', '4K (3840x2160)']" label="Resolución de grabación"></v-select> -->
              <v-select v-model="video.accesoUso.resolucionGrabacion" :items="['480i', '480p', '576i', '480p', '720i', '720p', '1080i', '1080p', '4K']" label="Resolución de grabación"></v-select>
              <!-- TODO: Cómo mantener consistente el valor para el objeto "video" -->
              <!-- <v-select v-model="selectResolucionGrabacion" :items="itemsResolucionGrabacion" item-text="descripcion" item-value="resolucion" label="Resolución de grabación"></v-select> -->

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
              <v-text-field v-model="computedArchivista" label="Archivista" hint="Nombre completo de la persona que elaboró la ficha de la unidad" readonly></v-text-field>

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
              <v-file-input v-model="files.video" show-size accept="video/*" prepend-icon="mdi-camera" label="Fragmento de registro audiovisual"></v-file-input>
              
              <v-file-input v-model="files.image" show-size accept="image/*" prepend-icon="mdi-image" label="Imagen"></v-file-input>
              
              <v-file-input v-model="files.document" show-size accept=".pdf" prepend-icon="mdi-file-document-outline" label="Calificación del registro"></v-file-input>

              <v-checkbox v-model="video.adicional.isPublic" label="Registro público"></v-checkbox>
            </v-card>
          </v-tab-item>
        </v-tabs-items>

        <!-- Botón para finalizar el llenado del formulario -->
        <v-btn type="submit" :disable="!validForm" color="primary" block elevation="6" x-large>
          <span v-if="!editMode">Crear</span>
          <span v-else>Actualizar</span>
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>


<script>
import moment from 'moment' // formatos de fechas
import * as videoService from '../../services/VideoService' // servicio para llamadas al API
import * as fileService from '../../services/FileService' // servicio para subir archivos al servidor desde API
import L from 'leaflet' // elementos principales para mapas
import { LMap, LTileLayer, LMarker, LControlLayers, LControl } from 'vue2-leaflet' // elementos principales para mapas
import { OpenStreetMapProvider } from 'leaflet-geosearch' // proveedores de búsqueda para mapas
import VGeosearch from 'vue2-leaflet-geosearch' // búsqueda en mapas

// Solución al problema de falta de icono en mapas según documentación oficial: https://vue2-leaflet.netlify.app/quickstart/#marker-icons-are-missing
import { Icon } from 'leaflet';
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  name: 'VideoForm',
  props: { from: String, type: String }, // from: id de origen/referencia, type: 'collection' | 'group'
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LControlLayers,
    LControl,
    VGeosearch
  },
  data: () => ({
    // El objeto video representa una unidad documental, es decir, un registro audiovisual organizado por áreas
    // Algunos campos deben inicializarse, por ejemplo fechas
    video: {
      identificacion: {},
      contenidoEstructura: {},
      accesoUso: {
        // resolucionGrabacion: this.selectResolucionGrabacion.resolucion, // TODO: Copiar valor, quizá usar método watch de Vue
      },
      documentacionAsociada: {},
      notas: {},
      controlDescripcion: {
        nombreArchivero: [],
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
      video: null,
      image: null,
      document: null,
    },

    // Id del registro después de ser creado en base de datos
    videoId: '',
    // Determina si se está editando o creando un registro
    editMode: false,
    // Determina si se está realizando subida de archivos (video, imagen, documentos) 
    isUploading: false,
    // Determina si hubo éxito al subir un registro (paso final del formulario)
    success: false,
    // Determina si hay algún mensaje de error. Deshabilita completamente el uso del formulario cuando está asignado
    error: false,

    // Auxiliar para mostrar paises como un referente opcional
    paises: ['Afganistán', 'Akrotiri', 'Albania', 'Alemania', 'Andorra', 'Angola', 'Anguila', 'Antártida', 'Antigua y Barbuda', 'Arabia Saudí', 'Arctic Ocean', 'Argelia', 'Argentina', 'Armenia', 'Aruba', 'Ashmore and Cartier Islands', 'Atlantic Ocean', 'Australia', 'Austria', 'Azerbaiyán', 'Bahamas', 'Bahráin', 'Bangladesh', 'Barbados', 'Bélgica', 'Belice', 'Benín', 'Bermudas', 'Bielorrusia', 'Birmania; Myanmar', 'Bolivia', 'Bosnia y Hercegovina', 'Botsuana', 'Brasil', 'Brunéi', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Bután', 'Cabo Verde', 'Camboya', 'Camerún', 'Canadá', 'Chad', 'Chile', 'China', 'Chipre', 'Clipperton Island', 'Colombia', 'Comoras', 'Congo', 'Coral Sea Islands', 'Corea del Norte', 'Corea del Sur', 'Costa de Marfil', 'Costa Rica', 'Croacia', 'Cuba', 'Curacao', 'Dhekelia', 'Dinamarca', 'Dominica', 'Ecuador', 'Egipto', 'El Salvador', 'El Vaticano', 'Emiratos Árabes Unidos', 'Eritrea', 'Eslovaquia', 'Eslovenia', 'España', 'Estados Unidos', 'Estonia', 'Etiopía', 'Filipinas', 'Finlandia', 'Fiyi', 'Francia', 'Gabón', 'Gambia', 'Gaza Strip', 'Georgia', 'Ghana', 'Gibraltar', 'Granada', 'Grecia', 'Groenlandia', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Ecuatorial', 'Guinea-Bissau', 'Guyana', 'Haití', 'Honduras', 'Hong Kong', 'Hungría', 'India', 'Indian Ocean', 'Indonesia', 'Irán', 'Iraq', 'Irlanda', 'Isla Bouvet', 'Isla Christmas', 'Isla Norfolk', 'Islandia', 'Islas Caimán', 'Islas Cocos', 'Islas Cook', 'Islas Feroe', 'Islas Georgia del Sur y Sandwich del Sur', 'Islas Heard y McDonald', 'Islas Malvinas', 'Islas Marianas del Norte', 'Islas Marshall', 'Islas Pitcairn', 'Islas Salomón', 'Islas Turcas y Caicos', 'Islas Vírgenes Americanas', 'Islas Vírgenes Británicas', 'Israel', 'Italia', 'Jamaica', 'Jan Mayen', 'Japón', 'Jersey', 'Jordania', 'Kazajistán', 'Kenia', 'Kirguizistán', 'Kiribati', 'Kosovo', 'Kuwait', 'Laos', 'Lesoto', 'Letonia', 'Líbano', 'Liberia', 'Libia', 'Liechtenstein', 'Lituania', 'Luxemburgo', 'Macao', 'Macedonia', 'Madagascar', 'Malasia', 'Malaui', 'Maldivas', 'Malí', 'Malta', 'Man, Isle of', 'Marruecos', 'Mauricio', 'Mauritania', 'México', 'Micronesia', 'Moldavia', 'Mónaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Mozambique', 'Mundo', 'Namibia', 'Nauru', 'Navassa Island', 'Nepal', 'Nicaragua', 'Níger', 'Nigeria', 'Niue', 'Noruega', 'Nueva Caledonia', 'Nueva Zelanda', 'Omán', 'Pacific Ocean', 'Países Bajos', 'Pakistán', 'Palaos', 'Panamá', 'Papúa-Nueva Guinea', 'Paracel Islands', 'Paraguay', 'Perú', 'Polinesia Francesa', 'Polonia', 'Portugal', 'Puerto Rico', 'Qatar', 'Reino Unido', 'República Centroafricana', 'República Democrática del Congo', 'República Dominicana', 'Ruanda', 'Rumania', 'Rusia', 'Sáhara Occidental', 'Samoa', 'Samoa Americana', 'San Bartolomé', 'San Cristóbal y Nieves', 'San Marino', 'San Martín', 'San Pedro y Miquelón', 'San Vicente y las Granadinas', 'Santa Helena', 'Santa Lucía', 'Santo Tomé y Príncipe', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leona', 'Singapur', 'Sint Maarten', 'Siria', 'Somalia', 'Southern Ocean', 'Spratly Islands', 'Sri Lanka', 'Suazilandia', 'Sudáfrica', 'Sudán', 'Sudán del Sur', 'Suecia', 'Suiza', 'Surinam', 'Svalbard y Jan Mayen', 'Tailandia', 'Taiwán', 'Tanzania', 'Tayikistán', 'Territorio Británico del Océano Indico', 'Territorios Australes Franceses', 'Timor Oriental', 'Togo', 'Tokelau', 'Tonga', 'Trinidad y Tobago', 'Túnez', 'Turkmenistán', 'Turquía', 'Tuvalu', 'Ucrania', 'Uganda', 'Unión Europea', 'Uruguay', 'Uzbekistán', 'Vanuatu', 'Venezuela', 'Vietnam', 'Wake Island', 'Wallis y Futuna', 'West Bank', 'Yemen', 'Yibuti', 'Zambia', 'Zimbabue'],

    // Auxiliares para textos descriptivos en v-select de video.accesoUso.resolucionGrabacion
    selectResolucionGrabacion: {descripcion: '', resolucion: ''},
    itemsResolucionGrabacion: [
      { descripcion: '480i (NTSC)', resolucion: '480i'},
      { descripcion: '576i (PAL)', resolucion: '576i'},
      { descripcion: '480p (720x480)', resolucion: '480p'},
      { descripcion: '720i (1280x720)', resolucion: '720i'},
      { descripcion: '720p (1280x720)', resolucion: '720p'},
      { descripcion: '1080i (1920x1080)', resolucion: '1080i'},
      { descripcion: '1080p (1920x1080)', resolucion: '1080p'},
      { descripcion: '4K (3840x2160)', resolucion: '4K'}
    ],

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
        value => !!value || 'El código de referencia es necesario. Ejemplo: MXIM-AV-2-3-1-2',
        value => /^MXIM-AV-2(-\d+)*$/.test(value) || 'Debe ser un código de referencia válido. Ejemplo: MXIM-AV-2-3-1-2',
      ],
      duracion: [
        value => /^\d+$/.test(value) || 'La duración debe ser el número de minutos'
      ],
      duracion2: [
        value => /(^\d{1,3}:\d{1,2}(:\d{1,2}){0,1}$){0,1}/.test(value) || 'La duración debe estar en el formato correcto'
      ]
    },

    // Valores para usar en mapa
    map: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
      '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: L.latLng(19.37651880288312, -99.18512156842415),
      marker: {
        latLng: L.latLng(19.37651880288312, -99.18512156842415),
        visibility: true,
        draggable: true,
      },
      options: {
        zoomControl: true,
        attributionControl: true,
        zoomSnap: true,
        scrollWheelZoom: false,
      },
      // Lista completa de proveedores para mapas: https://leaflet-extras.github.io/leaflet-providers/preview/
      tileProviders: [
        {
          name: 'OpenStreetMap',
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          visible: true,
          attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        },
        {
          name: 'OpenTopoMap',
          url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
          visible: false,
          attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        },
        {
          name: 'Terrain',
          url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png',
          visible: false,
          attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          subdomains: 'abcd',
          minZoom: 0,
          maxZoom: 18
        },
        {
          name: 'WorldImagery',
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          visible: false,
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        },
      ],
      // Opciones de barra de búsqueda en mapa (https://github.com/smeijer/leaflet-geosearch)
      geosearchOptions: {
        provider: new OpenStreetMapProvider({params: {'accept-language': 'es'}}), // resultados en español indicado en params
        showMarker: true,
        showPopup: false,
        searchLabel: 'Escribe una dirección',
        // marker:,
        maxMarkers: 1,
        autoClose: true,
      }
    },
  }),

  // Obtención de información desde API, antes de renderizar vista
  beforeRouteEnter(to, from, next){
    // En caso de crear nuevo registro:
    if(!to.params.id) // no hay :id en URL
      return next();

    // En caso de editar un registro existente:
    videoService.getVideoById(to.params.id).then(res => {
      next(vm => { // vm es necesario para asignaciones, "this" no existe en este contexto
        let video = res.data.video;
        
        // Verificar inicializar áreas en caso de que alguna esté vacía:
        if(!video.identificacion)
          video.identificacion = {};
        if(!video.contenidoEstructura)
          video.contenidoEstructura = {};
        if(!video.accesoUso)
          video.accesoUso = {};
        if(!video.documentacionAsociada)
          video.documentacionAsociada = {};
        if(!video.notas)
          video.notas = {};
        if(!video.controlDescripcion)
          video.controlDescripcion = {nombreArchivero: []};
        if(!video.adicional)
          video.adicional = {isPublic: true, user: []};

        // Asignación final
        vm.video = video;
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

  // Acciones justo antes de cambiar de ruta o salir
  beforeRouteLeave(to, from, next){
    if(!this.success){ // en caso de que aún no se ha concluido de trabajar el formulario
      const respuesta = window.confirm("¿Seguro que quieres salir? Se perderán los datos del formulario")
      if(respuesta){
        next()
      }
      // en caso de respuesta negativa, se retiene en la ruta actual
    }
    else{ // en caso de éxito al trabajar con el formulario
      next()
    }
  },

  methods: {
    // mover marcador al centro de lo que se observa en el mapa
    clickButtonMap: function(){
      const mapViewCenter = this.$refs.leafletMap.mapObject.getCenter();
      // asigna y actualiza marcador correctamente en el mapa:
      this.$refs.leafletMarker.setLatLng(mapViewCenter);
    },
    
    // Comportamiento al concluir el llenado del formulario y presionar el botón para enviar información a base de datos
    onSubmit: async function(){
      // Validación del formulario
      if(!this.$refs.videoForm.validate()) 
        return;
      
      this.isUploading = true; // inicia subida de archivos e información

      try {
        if(this.files.video) // archivo de video
          await this.uploadVideoFile();
        if(this.files.image) // archivo de imagen
          await this.uploadImageFile();
        if(this.files.document) // documento de texto (pdf)
          await this.uploadDocumentFile();
        
        // Enviar datos textuales a base de datos
        const request = {
          video: this.video,
        };
        let myResponse; // objeto res después de creación o edición del registro
        // actualizar registro ya existente o crear uno nuevo:
        if (this.editMode) {
          myResponse = await videoService.updateVideo(request);
        } else {
          myResponse = await videoService.createVideo(request);
        }
        
        // Notificaciones:
        this.isUploading = false; // termina subida de archivos e información
        this.success = true; // subida de registro completada exitosamente
        this.videoId = myResponse.data.id; // identificador en base de datos

        // Se elimina el escucha para prevención de salida de página
        window.removeEventListener("beforeunload", this.preventNav);

        // Reenviar a la vista del registro recien creado
        this.$router.push({name: 'video-view', params: {id: this.videoId}});
      } catch (err) { // error de conexión
        this.success = false;
        this.error = err;
      }
    },
    
    // Subir un archivo de video desde API
    uploadVideoFile: async function(){
      const formData = new FormData(); // creación de formulario en blanco
      formData.append('video', this.files.video); // adjuntar campo con objeto tipo File
      formData.append('codigoReferencia', this.video.identificacion.codigoReferencia); // adjuntar campo con información extra
      try{
        const response = await fileService.uploadVideo(formData); // petición desde API
        this.video.adicional.video = response.data.file.filename; // asignación del nombre de archivo guardado
      }
      catch(err){ // error de conexión
        this.error = err;
      }
    },
    // Subir un archivo de imagen desde API
    uploadImageFile: async function(){
      const formData = new FormData(); // creación de formulario en blanco
      formData.append('image', this.files.image); // adjuntar campo con objeto tipo File
      formData.append('codigoReferencia', this.video.identificacion.codigoReferencia); // adjuntar campo con información extra
      try{
        const response = await fileService.uploadImage(formData); // petición desde API
        this.video.adicional.imagen = response.data.filename; // asignación del nombre de archivo guardado
      }
      catch(err){ // error de conexión
        this.error = err;
      }
    },
    // Subir un documento de texto (PDF) desde API
    uploadDocumentFile: async function(){
      const formData = new FormData(); // creación de formulario en blanco
      formData.append('document', this.files.document); // adjuntar campo con objeto tipo File
      formData.append('codigoReferencia', this.video.identificacion.codigoReferencia); // adjuntar campo con información extra
      try{
        const response = await fileService.uploadDocument(formData); // petición desde API
        this.video.adicional.calificacion = response.data.file.filename; // asignación del nombre de archivo guardado
      }
      catch(err){ // error de conexión
        this.error = err;
      }
    },

    // Función que controla el evento de salida o recarga de páginas. Se activa al entrar al formulario y se desactiva al salir o llenar correctamente
    preventNav: function(event) {
      event.preventDefault()
      event.returnValue = ""
    },
  },

  // Métodos específicos para variables y valores calculados
  computed: {
    // Dar formato dia/mes/año adecuado en las fechas que aparecen con calendarios
    computedFecha(){
      return this.video.identificacion.fecha ? moment(this.video.identificacion.fecha).format('DD/MM/YYYY') : '';
    },
    computedFechaDescripcion(){
      return this.video.createdAt ? moment(this.video.createdAt).format('DD/MM/YYYY') : '';
    },
    computedFechaActualizacion(){
      return this.video.updatedAt ? moment(this.video.updatedAt).format('DD/MM/YYYY') : '';
    },
    // Manera estandar para usar variables globales (state) como variables locales
    computedUserId(){
      return this.$store.state.userId;
    },
    computedUserFullname(){
      return this.$store.state.fullname;
    },
    // Conversión de arreglo/lista a texto/string para nombres de archivistas
    computedArchivista(){
      return this.video.controlDescripcion.nombreArchivero.join(', ');
    }
  },

  // Destruye el evento que se encuentra escuchado por la salida o recarga de páginas
  beforeDestroy() {
    window.removeEventListener("beforeunload", this.preventNav);
  },

  // Acciones a realizar justo antes de montar y renderizar componente Vue
  mounted() {
    window.addEventListener("beforeunload", this.preventNav);

    // Agregar nombre completo de archivista si no está enlistado
    if(!this.video.controlDescripcion.nombreArchivero.includes(this.computedUserFullname))
      this.video.controlDescripcion.nombreArchivero.push(this.computedUserFullname);
    // Agregar id de usuario de archivista si no está enlistado
    if(!this.video.adicional.user.includes( this.computedUserId ))
      this.video.adicional.user.push(this.computedUserId);
    
    // Agregar id de referencia y tipo de procedencia
    this.video.adicional.grupo = this.from && this.type && this.type === 'group' ? this.from : undefined;
  },

  // Asignaciones cuando han terminado de procesarse opciones relacionadas con estados
  created() {
  }
}
</script>


<style>
/* Resultados de búqueda en mapa. Si no se cambia, puede quedar texto blanco en fondo blanco debido a la definición de .theme (por lo tanto, no ocupar "scoped" en etiqueta <style>)*/
.leaflet-control-geosearch .results {
  color: rgba(0, 0, 0, 0.8) !important;
}
</style>
