<template>
  <v-card>
    <v-form ref="videoForm" v-model="validForm" lazy-validation v-on:submit.prevent="onSubmit">
      <v-tabs v-model="tab" centered icons-and-text >
        <v-tabs-slider></v-tabs-slider>

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

      <v-tabs-items v-model="tab">
        <v-tab-item value="identificacion" >
          <v-card flat>
            <v-text-field v-model="video.identificacion.codigoReferencia" label="Código de referencia" hint="Código alfanumérico separado por guiones. Ejemplo: MXIM-AV-2-3-1" required></v-text-field>

            <v-text-field v-model="video.identificacion.titulo" label="Título del registro" hint="Título de la unidad de descripción"></v-text-field>

            <v-menu v-model="menuCalendar1" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px" >
              <template v-slot:activator="{ on }">
                <v-text-field v-model="video.identificacion.fecha" label="Fecha" hint="Fecha en que se hizo el registro" prepend-icon="mdi-calendar" readonly v-on="on" ></v-text-field>
              </template>
              <v-date-picker v-model="video.identificacion.fecha" @input="menuCalendar1 = false"></v-date-picker>
            </v-menu>

            <v-text-field v-model="video.identificacion.lugar" label="Lugar" hint="Nombre de los lugares, partiendo de lo general a lo particular"></v-text-field>

            <v-text-field v-model="video.identificacion.pais" label="País" hint="País o países de producción del registro en video"></v-text-field>

            <v-text-field v-model="video.identificacion.duracion" label="Duración" hint="Duración de la obra en formato horas, minutos, segundos. Ejemplo: 01:24:37"></v-text-field>

            <v-text-field v-model="video.identificacion.personasEntrevistadas" label="Personas entrevistadas" hint="Persona de la cual se registra su testimonio"></v-text-field>

            <v-text-field v-model="video.identificacion.entrevistador" label="Entrevistador(a)" hint="Persona encargada de realizar la entrevista"></v-text-field>

            <v-text-field v-model="video.identificacion.camara" label="Cámara" hint="Persona encargada de operar la cámara de video"></v-text-field>

            <v-text-field v-model="video.identificacion.iluminacion" label="Iluminación" hint="Persona encargada de la colocación de las lámparas"></v-text-field>

            <v-text-field v-model="video.identificacion.sonido" label="Sonido" hint="Persona encargada de la colocación de los micrófonos y grabación de sonido"></v-text-field>

            <v-text-field v-model="video.identificacion.asistente" label="Asistente(s)" hint="Persona encargada de apoyar en diversas labores técnicas"></v-text-field>
          </v-card>
        </v-tab-item>

        <v-tab-item value="contenidoEstructura" >
          <v-card flat>
            <v-textarea v-model="video.contenidoEstructura.descripcionGeneral" label="Descripción general" hint="Contenido del material. Se describen los lugares y/o acciones registradas, según tipos de plano, emplazamientos y movimientos" auto-grow rows="3" row-height="25" ></v-textarea>

            <v-select v-model="video.contenidoEstructura.estructuraFormal" :items="['Entrevista controlada', 'Entrevista en campo', 'Entrevista con acción', 'Entrevista con imágenes', 'Grabación en campo', 'Registro de material']" label="Estructura formal"></v-select>

            <v-text-field v-model="video.contenidoEstructura.descriptorOnomastico" label="Descriptor onomástico" hint="Nombres de las personas (nombre y apellido) que aparecen el registro"></v-text-field>

            <v-text-field v-model="video.contenidoEstructura.descriptorToponimico" label="Descriptor toponímico" hint="Nombres de los lugares que aparecen en el registro"></v-text-field>
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
            <v-textarea v-model="video.documentacionAsociada.existenciaLocalizacionCopias" label="Existencia y localización de copias" hint="Existencia de copias del material en algún otro acervo" auto-grow rows="3" row-height="25" ></v-textarea>

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
            <!-- <v-textarea v-model="video.controlDescripcion.notaArchivero" label="Nota del archivero" hint="Fuentes usadas para complementar la información de la ficha (producción original, sitios web, publicaciones, etc.)" auto-grow rows="3" row-height="25" ></v-textarea> -->

            <v-text-field v-model="video.controlDescripcion.nombreArchivero" label="Nombre del archivero" hint="Nombre de quien elaboró la ficha de la unidad"></v-text-field>

            <v-menu v-model="menuCalendar2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px" >
              <template v-slot:activator="{ on }">
                <v-text-field v-model="video.controlDescripcion.fechaDescripcion" label="Fecha de descripción" hint="Fecha en que se elaboró la ficha de la unidad" prepend-icon="mdi-calendar" readonly v-on="on" ></v-text-field>
              </template>
              <v-date-picker v-model="video.controlDescripcion.fechaDescripcion" @input="menuCalendar2 = false"></v-date-picker>
            </v-menu>

            <v-menu v-model="menuCalendar3" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px" >
              <template v-slot:activator="{ on }">
                <v-text-field v-model="video.controlDescripcion.fechaActualizacion" label="Fecha de actualización" hint="Fecha de la última modificación a la ficha de la unidad" prepend-icon="mdi-calendar" readonly v-on="on" ></v-text-field>
              </template>
              <v-date-picker v-model="video.controlDescripcion.fechaActualizacion" @input="menuCalendar3 = false"></v-date-picker>
            </v-menu>
          </v-card>
        </v-tab-item>

        <v-tab-item value="adicional" >
          <v-card flat>
            <v-file-input v-model="video.adicional.imagen" show-size counter chips accept="video/*" prepend-icon="mdi-camera" label="Registro audiovisual"></v-file-input>
            <v-file-input v-model="video.adicional.video" show-size counter chips accept="image/*" prepend-icon="mdi-image" label="Portada"></v-file-input>
            <v-file-input v-model="video.adicional.calificacion" show-size counter chips accept=".pdf" prepend-icon="mdi-file-document-outline" label="Calificación"></v-file-input>
          </v-card>
        </v-tab-item>
      </v-tabs-items>

      <v-btn type="submit" :disable="!validForm" color="primary" block elevation="6" x-large>Registrar</v-btn>
    </v-form>
    <pre>{{ video }}</pre>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      validForm: true,
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
      tab: null,
      menuCalendar1: false,
      menuCalendar2: false,
      menuCalendar3: false,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
  },
  methods: {
    onSubmit: function(){
      console.log("Enviar formulario...");
      console.log(this.video);
    },
  }
}
</script>
