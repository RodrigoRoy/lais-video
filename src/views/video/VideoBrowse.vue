<!-- Vista de las unidades documentales (registros en video)
Se reutiliza la misma vista para cualquier conjunto con unidades documentales -->

<template>
  <v-container>
    <!-- Encabezado con título del conjunto y el camino dentro de la colección (breadcrumbs) -->
    <h2 class="text-h3 text-center">Unidades simples</h2>
    <!-- <v-breadcrumbs :items="breadcrumbs" class="justify-center"></v-breadcrumbs> -->

    <!-- En caso de error/advertencia/información -->
    <v-alert prominent :type="myAlert.type" v-if="myAlert.active">
      <v-row align="center">
        <v-col class="grow">
          {{ myAlert.message }}
        </v-col>
        <v-col class="shrink" v-for="(button, index) in myAlert.buttons" :key="index">
          <v-btn :href="button.href">{{ button.text }}</v-btn>
        </v-col>
      </v-row>
    </v-alert>

    <!-- Organización del espacio en filas y columnas de recuadros (cards) donde cada uno representa un video -->
    <v-row no-gutters align="start" justify="start">
      <v-col cols="12" md="3" v-for="video in videos" :key="video._id">
        <v-card class="ma-4 pa-4" outlined tile @click="openDialog(video)">
          <v-img :src="`${publicPath}files/image/${video.adicional.imagen}`" height="150px"></v-img>
          <v-card-title class="justify-center">
            {{ video.identificacion.codigoReferencia }}
          </v-card-title>
          <v-card-subtitle class="pb-0 text-center">
            {{ video.identificacion.fecha | date}}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- Diseño de la ventana emergente (dialog) que muestra toda la información del video -->
    <!-- El diseño se basa en usar un elemento card con pestañas (tabs) y una columna adicional con una imagen, video y documentación -->
    <v-dialog v-model="dialog" overlay-opacity="0.80">
      <v-card>
        <v-card-text>
          <!-- Componente para el render de la información del video -->
          <video-info :video="video"></video-info>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <div v-if="video">
            <v-btn @click="goToEdit(video)" class="mr-2">Editar <v-icon>mdi-pencil</v-icon> </v-btn>
            <v-btn @click="remove(video)" class="mr-2">Borrar <v-icon>mdi-delete</v-icon> </v-btn>
            <v-btn @click="goToURL(video)" class="mr-2">URL <v-icon>mdi-link</v-icon> </v-btn>
            <!-- <v-btn @click="printPDF()">Ficha <v-icon>mdi-file-pdf-box</v-icon></v-btn> -->
          </div>
          <v-btn @click="closeDialog()">Cerrar <v-icon>mdi-close</v-icon></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>


<script>
import VideoInfo from '@/components/VideoInfo.vue'
import * as videoService from '../../services/VideoService' // servicio para llamadas al API
import { PdfMakeWrapper, Table, Txt, Img } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake

export default {
  name: 'VideoBrowse',
  props: { from: String, type: String }, // from: id de origen/referencia, type: 'collection' | 'group'
  components: {
    VideoInfo // Información dentro de v-dialog
  },
  data: () => ({
    // Ruta del directorio "public"
    publicPath: process.env.BASE_URL,
    // Lista de objetos obtenidos desde petición al API
    videos: [],
    // Objeto que representa al registro actual
    video: null,
    // Auxiliar que representa si la ventana de dialogo con la información del video se muestra (true) o no (false)
    dialog: false,
    // Texto y tipo de mensaje de v-alert
    myAlert: {
      active: false,
    },
  }),
  
  // Obtención de información desde API, antes de renderizar vista
  // beforeRouteEnter(to, from, next){
  //   videoService.getAllVideos().then(res => {
  //     next(vm => {
  //       vm.videos = res.data.videos;
  //       // En caso de que no haya grupos
  //       if (vm.videos.length === 0){
  //         vm.error = 'Grupo vacío'
  //       }
  //     });
  //   })
  //   // En caso de error (400 HTTP status code)
  //   .catch(error => {
  //     next(vm => {
  //       vm.error = error.message;
  //       vm.videos = null;
  //     })
  //   });
  // },

  // Obtención de información desde API, antes de renderizar vista
  beforeMount(){
    videoService.filter(this.from, this.type).then(res => {
      this.videos = res.data.videos;
      // En caso de que no haya videos
      if(this.videos.length === 0)
        this.setAlert('Sin registros de video', 'info', [{text: 'Crear video', href: `/video/nuevo?from=${this.from}&type=${this.type}`}])
    })
    .catch(error => {
      this.setAlert(error, 'error')
      this.videos = null
    })
  },

  methods: {
    /**
     * Abre un cuadro de dialogo y muestra la información del registro
     * @param {Object} videoData - información que representa un registro de video
     */
    openDialog(videoData) {
      this.video = videoData;
      this.dialog = true;
    },
    // Cierra el cuadro de dialogo actual
    closeDialog(){
      this.video = null;
      this.dialog = false;
    },
    /**
     * Configura las propiedades a usar en v-alert
     * @param {string} message - Texto a mostrar
     * @param {string} type - Tipo de alerta: success, error, warning, info
     * @param {Object[]} buttons - Lista de propiedades para crear botones que acompañan la alerta. ejemplo: [{text: 'My text', href: '/some/path'}]
     */
    setAlert(message, type = 'info', buttons = []){
      this.myAlert = {
        active: true,
        message: message,
        type: type,
        buttons: buttons,
      };
    },
    /**
     * Envia a la ruta URL de edición del registro de video actual
     * @param {Object} video - representa el registro de video, debe contener el atributo "_id"
     */
    goToEdit(video){
      this.$router.push({name: 'video-edit', params: {id: video._id}});
    },
    /**
     * Envia a la ruta URL de vista individual del registro de video actual
     * @param {Object} video - representa el registro de video, debe contener el atributo "_id"
     */
    goToURL(video){
      this.$router.push({name: 'video-view', params: {id: video._id}});
    },
    /**
     * Elimina o remueve el registro de video actual
     * @param {Object} video - representa el registro de video, debe contener el atributo "_id"
     */
    async remove(video){
      try {
        const response = await videoService.deleteVideo(video._id);
        this.message = response.data.message;
        this.$router.go(); // recargar ruta actual
      } catch (error) {
        this.error = error;
        this.closeDialog();
      }
    },
    // Crea la ficha del registro en video en formato PDF
    async printPDF() {
      PdfMakeWrapper.setFonts(pdfFonts);

      const pdf = new PdfMakeWrapper();

      var fontTitleSize = 20;
      var salto = 20;

      var logo_mora = require('@/assets/Logo_Mora.jpg');
      var logo_lais = require('@/assets/Logo_LAIS.jpg');

      // Logos
      var logos = new Table([
          ["", await new Img( logo_mora ).width(50).height(40).build(), 
          await new Img( logo_lais ).width(50).height(40).build()]
      ]).widths([ 370, '*', '*' ]).layout('noBorders').end;
      pdf.add(logos);

      pdf.add(new Txt('Identificación').bold().fontSize(fontTitleSize).end);
      var identificacionTable = new Table([
          ['Código de referencia', this.video.identificacion.codigoReferencia],
          ['Fecha', this.video.identificacion.fecha],
          ['Lugar', this.video.identificacion.lugar],
          ['País', this.video.identificacion.pais],
          ['Duración', this.video.identificacion.duracion],
          ['Personas entrevistadas', this.video.identificacion.personasEntrevistadas],
          ['Entrevistador/a', this.video.identificacion.entrevistador],
          ['Cámara', this.video.identificacion.camara],
          ['Asistente', this.video.identificacion.asistente]
      ]).widths([ 150, '*' ]).margin([0,0,0,salto]).end;
      pdf.add(identificacionTable);

      pdf.add(new Txt('Contenido y estructura').bold().fontSize(fontTitleSize).end);
      var contenidoEstructuraTable = new Table([
          ['Descripción general', this.video.contenidoEstructura.descripcionGeneral],
          ['Estructura formal', this.video.contenidoEstructura.estructuraFormal],
          ['Descriptor onomástico', this.video.contenidoEstructura.descriptorOnomastico],
          ['Descriptor toponímico', this.video.contenidoEstructura.descriptorToponimico]
      ]).widths([ 150, '*' ]).margin([0,0,0,salto]).end;
      pdf.add(contenidoEstructuraTable);

      pdf.add(new Txt('Acceso y uso').bold().fontSize(fontTitleSize).end);
      var accesoUsoTable = new Table([
          ['Idioma original', this.video.accesoUso.idiomaOriginal],
          ['Soporte', this.video.accesoUso.soporte],
          ['Número de casetes', this.video.accesoUso.numeroCasetes],
          ['Color', this.video.accesoUso.color],
          ['Audio', this.video.accesoUso.audio],
          ['Sistema de grabación', this.video.accesoUso.sistemaGrabacion],
          ['Resolución de grabación', this.video.accesoUso.resolucionGrabacion],
          ['Formato de video digital', this.video.accesoUso.formatoVideoDigital],
          ['Requisitos técnicos', this.video.accesoUso.requisitosTecnicos]
      ]).widths([ 150, '*' ]).margin([0,0,0,salto]).end;
      pdf.add(accesoUsoTable);

      pdf.add(new Txt('Documentación asociada').bold().fontSize(fontTitleSize).end);
      var documentacionAsociadaTable = new Table([
          ['Unidades de descripción relacionadas', this.video.documentacionAsociada.unidadesDescripcionRelacionadas],
          ['Documentos asociados', this.video.documentacionAsociada.documentosAsociados]
      ]).widths([ 150, '*' ]).margin([0,0,0,salto]).end;
      pdf.add(documentacionAsociadaTable);

      pdf.add(new Txt('Notas').bold().fontSize(fontTitleSize).end);
      var notasTable = new Table([
          ['Notas', this.video.notas.notas]
      ]).widths([ 150, '*' ]).margin([0,0,0,salto]).end;
      pdf.add(notasTable);

      pdf.add(new Txt('Control de descripción').bold().fontSize(fontTitleSize).end);
      var controlDescripcionTable = new Table([
          ['Archivista', this.video.controlDescripcion.nombreArchivero],
          ['Notas de archivista', this.video.controlDescripcion.notaArchivero],
          ['Fecha de descripción', this.video.controlDescripcion.fechaDescripcion],
          ['Fecha de última actualización', this.video.controlDescripcion.fechaActualizacion]
      ]).widths([ 150, '*' ]).margin([0,0,0,salto]).end;
      pdf.add(controlDescripcionTable);

      pdf.add(new Txt('Imagen').bold().fontSize(fontTitleSize).end);
      var img = require('@/assets/videopreview2.png');
      pdf.add(await new Img( img ).width(250).height(200).build())

      // Fecha de consulta
      const tiempoTranscurrido = Date.now();
      const hoy = new Date(tiempoTranscurrido);

      pdf.add('Fecha de consulta: ' + hoy.toLocaleDateString());

      // Pie de página con numeración de página
      pdf.footer((currentPage, pageCount) => {
        var t = {
          layout: "noBorders",
          fontSize: 8,
          margin: [25, 0, 25, 0],
          table: {
            widths: [400, "*"], 
            body: [
              [
                { text: "" },
                { text: "Página " + currentPage.toString() + " de " + pageCount }
              ]
            ]
          }
        };
        return t;
      });

      pdf.create().download(`Ficha_catalogacion_${this.video.identificacion.codigoReferencia}.pdf`);

    //   // El nombre del archivo incluye código de referencia
    //   doc.save(`Ficha_catalogacion_${this.video.identificacion.codigoReferencia}.pdf`);
    }

    
  }
}
</script>
