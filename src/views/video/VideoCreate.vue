<template>
  <v-card>
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
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item value="identificacion" >
        <v-card flat>
          <v-form>
            <v-text-field label="Código de referencia" hint="Código alfanumérico separado por guiones. Ejemplo: MXIM-AV-2-3-1" required></v-text-field>

            <v-text-field label="Título del registro" hint="Título de la unidad de descripción"></v-text-field>

            <v-menu v-model="menuCalenda1" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px" >
              <template v-slot:activator="{ on }">
                <v-text-field v-model="video.identificacion.fecha" label="Fecha" hint="Fecha en que se hizo el registro" prepend-icon="mdi-calendar" readonly v-on="on" ></v-text-field>
              </template>
              <v-date-picker v-model="video.identificacion.fecha" @input="menuCalendar1 = false"></v-date-picker>
            </v-menu>

            <v-text-field label="Lugar" hint="Nombre de los lugares, partiendo de lo general a lo particular"></v-text-field>

            <v-text-field label="País" hint="País o países de producción del registro en video"></v-text-field>

            <v-text-field label="Duración" hint="Duración de la obra en formato horas, minutos, segundos. Ejemplo: 01:24:37"></v-text-field>

            <v-text-field label="Personas entrevistadas" hint="Persona de la cual se registra su testimonio"></v-text-field>

            <v-text-field label="Entrevistador(a)" hint="Persona encargada de realizar la entrevista"></v-text-field>

            <v-text-field label="Cámara" hint="Persona encargada de operar la cámara de video"></v-text-field>

            <v-text-field label="Iluminación" hint="Persona encargada de la colocación de las lámparas"></v-text-field>

            <v-text-field label="Sonido" hint="Persona encargada de la colocación de los micrófonos y grabación de sonido"></v-text-field>

            <v-text-field label="Asistente(s)" hint="Persona encargada de apoyar en diversas labores técnicas"></v-text-field>
          </v-form>
        </v-card>
      </v-tab-item>

      <v-tab-item value="contenidoEstructura" >
        <v-card flat>
          <v-form>
            <v-textarea label="Descripción general" hint="Contenido del material. Se describen los lugares y/o acciones registradas, según tipos de plano, emplazamientos y movimientos" auto-grow rows="3" row-height="25" ></v-textarea>

            <v-select :items="['Entrevista controlada', 'Entrevista en campo', 'Entrevista con acción', 'Entrevista con imágenes', 'Grabación en campo']" label="Estructura formal"></v-select>

            <v-text-field label="Descriptor onomástico" hint="Nombres de las personas (nombre y apellido) que aparecen el registro"></v-text-field>

            <v-text-field label="Descriptor toponímico" hint="Nombres de los lugares que aparecen en el registro"></v-text-field>
          </v-form>
        </v-card>
      </v-tab-item>

      <v-tab-item value="accesoUso" >
        <v-card flat>
          <v-form>
            <v-text-field label="Idioma original" hint="Idioma o idiomas originales del registro"></v-text-field>

            <v-select :items="['Betacam', 'Hi8', 'DVCAM', 'MiniDV', 'Archivo digital']" label="Soporte"></v-select>

            <v-text-field label="Número de casetes"></v-text-field>

            <v-select :items="['Color', 'Blanco y negro', 'Color y B/N']" label="Color"></v-select>

            <v-select :items="['Dolby', 'Dolby Digital', 'Estéreo', 'Estéreo mezclado', 'Monoaural']" label="Audio"></v-select>

            <v-select :items="['NTSC', 'PAL', 'SECAM']" label="Sistema de grabación"></v-select>

            <v-select :items="['480i (NTSC)', '576i (PAL)', '480p (720x480)', '720p (1280x720)', '1080i (1920x1080)', '1080p (1920x1080)', '4K (3840x2160)']" label="Resolución de grabación"></v-select>

            <v-select :items="['MOV', 'AVCHD', 'MTS', 'MP4']" label="Formato de video digital"></v-select>

            <v-text-field label="Requisitos técnicos" hint="Equipo de reproducción o software que se requiere para visionar el material"></v-text-field>
          </v-form>
        </v-card>
      </v-tab-item>

      <v-tab-item value="documentacionAsociada" >
        <v-card flat>
          <v-form>
            <v-textarea label="Existencia y localización de copias" hint="Existencia de copias del material en algún otro acervo" auto-grow rows="3" row-height="25" ></v-textarea>

            <v-textarea label="Unidades de descripción relacionada" hint="Relación que existe entre dos o más unidades de la misma colección a partir de coincidencias temáticas o conceptuales" auto-grow rows="3" row-height="25" ></v-textarea>

            <v-textarea label="Documentos asociados" hint="Publicación o documento que tenga relación directa con la producción catalogada. La relación puede ser temática, autoral, etc." auto-grow rows="3" row-height="25" ></v-textarea>
          </v-form>
        </v-card>
      </v-tab-item>

      <v-tab-item value="notas" >
        <v-card flat>
          <v-form>
            <v-textarea label="Notas" hint="Información que se considere relevante y que no pudo ser indexada en algún otro campo" auto-grow rows="5" row-height="25" ></v-textarea>
          </v-form>
        </v-card>
      </v-tab-item>

      <v-tab-item value="controlDescripcion" >
        <v-card flat>
          <v-form>
            <v-textarea label="Nota del archivero" hint="Fuentes usadas para complementar la información de la ficha (producción original, sitios web, publicaciones, etc.)" auto-grow rows="3" row-height="25" ></v-textarea>

            <v-text-field label="Nombre del archivero" hint="Nombre de quien elaboró la ficha de la unidad"></v-text-field>

            <v-menu v-model="menuCalenda2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px" >
              <template v-slot:activator="{ on }">
                <v-text-field v-model="video.controlDescripcion.fechaDescripcion" label="Fecha de descripción" hint="Fecha en que se elaboró la ficha de la unidad" prepend-icon="mdi-calendar" readonly v-on="on" ></v-text-field>
              </template>
              <v-date-picker v-model="video.controlDescripcion.fechaDescripcion" @input="menuCalendar2 = false"></v-date-picker>
            </v-menu>

            <v-menu v-model="menuCalenda3" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px" >
              <template v-slot:activator="{ on }">
                <v-text-field v-model="video.controlDescripcion.fechaActualizacion" label="Fecha de actualización" hint="Fecha de la última modificación a la ficha de la unidad" prepend-icon="mdi-calendar" readonly v-on="on" ></v-text-field>
              </template>
              <v-date-picker v-model="video.controlDescripcion.fechaActualizacion" @input="menuCalendar3 = false"></v-date-picker>
            </v-menu>
          </v-form>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

    <v-btn block elevation="6" x-large >Nuevo registro</v-btn>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
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
        }
      },
      tab: null,
      menuCalendar1: false,
      menuCalendar2: false,
      menuCalendar3: false,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
  },
}
</script>
