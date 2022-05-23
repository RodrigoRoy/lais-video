<!-- Vista de las unidades documentales (registros en video)
Se reutiliza la misma vista para cualquier conjunto con unidades documentales -->

<template>
  <v-container>
    <!-- Usar v-if/v-else evita advertencias/errores en consola al renderizar -->
    <v-card v-if="video">
      <v-card-text>
        <!-- Componente para el render de la información del video -->
        <video-info :video="video"></video-info>
      </v-card-text>
    </v-card>
    <!-- @TODO v-else podrías ser más explícito o mejor representado -->
    <p v-else>
      Error al obtener información
    </p>
  </v-container>
</template>


<script>
import { PdfMakeWrapper, Table, Txt, Img } from 'pdfmake-wrapper'
import * as pdfFonts from "pdfmake/build/vfs_fonts" // fonts provided for pdfmake
import * as videoService from '../../services/VideoService' // servicio para llamadas al API
import VideoInfo from '../../components/VideoInfo.vue' // Componente que renderiza datos del video

export default {
  name: 'VideoView',

  components: {
    VideoInfo,
  },

  data: () => ({
    // El objeto video representa una unidad documental, es decir, un registro audiovisual organizado por áreas
    video: {},
  }),

  // Obtención de información desde API, antes de renderizar vista
  beforeRouteEnter(to, from, next){
    videoService.getVideoById(to.params.id).then(res => { // :id en URL es to.params.id
      next(vm => { // vm es necesario para asignaciones, this no existe en este contexto
        let video = res.data.video;
        vm.video = video;
      });
    });
  },

  methods: {
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
