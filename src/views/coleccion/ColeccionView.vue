<!-- Vista de las unidades documentales (registros en video)
Se reutiliza la misma vista para cualquier conjunto con unidades documentales -->

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
    
    <v-container>
      <!-- Usar v-if/v-else evita advertencias/errores en consola al renderizar -->
      <v-card v-if="coleccion">
        <v-card-text>
          <!-- Componente para el render de la información del video -->
          <coleccion-info :coleccion="coleccion"></coleccion-info>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>


<script>
import { PdfMakeWrapper, Table, Txt, Img } from 'pdfmake-wrapper'
import * as pdfFonts from "pdfmake/build/vfs_fonts" // fonts provided for pdfmake
import * as coleccionService from '../../services/ColeccionService' // servicio para llamadas al API
import ColeccionInfo from '../../components/ColeccionInfo.vue'// Componente que renderiza datos de la coleccion

export default {
  name: 'ColeccionView',

  components: {
    ColeccionInfo,
  },

  data: () => ({
    // El objeto coleccion representa una unidad documental, es decir, un registro audiovisual organizado por áreas
    coleccion: {},
  }),

  // Obtención de información desde API, antes de renderizar vista
  beforeRouteEnter(to, from, next){
    coleccionService.getColectionById(to.params.id).then(res => { // :id en URL es to.params.id
      next(vm => { // vm es necesario para asignaciones, this no existe en este contexto
        let coleccion = res.data.coleccion;
        vm.coleccion = coleccion;
      });
    })
    // En caso de error (400 HTTP status code)
    .catch(error => {
      next(vm => {
        vm.error = error.message;
        vm.coleccion = null;
      })
    });
  },

  methods: {
    // Crea la ficha del registro en coleccion en formato PDF
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
          ['Código de referencia', this.coleccion.identificacion.codigoReferencia],
          ['Fecha', this.coleccion.identificacion.fecha],
          ['Lugar', this.coleccion.identificacion.lugar],
          ['País', this.coleccion.identificacion.pais],
          ['Duración', this.coleccion.identificacion.duracion],
          ['Personas entrevistadas', this.coleccion.identificacion.personasEntrevistadas],
          ['Entrevistador/a', this.coleccion.identificacion.entrevistador],
          ['Cámara', this.coleccion.identificacion.camara],
          ['Asistente', this.coleccion.identificacion.asistente]
      ]).widths([ 150, '*' ]).margin([0,0,0,salto]).end;
      pdf.add(identificacionTable);

      pdf.add(new Txt('Contenido y estructura').bold().fontSize(fontTitleSize).end);
      var contenidoEstructuraTable = new Table([
          ['Descripción general', this.coleccion.contenidoEstructura.descripcionGeneral],
          ['Estructura formal', this.coleccion.contenidoEstructura.estructuraFormal],
          ['Descriptor onomástico', this.coleccion.contenidoEstructura.descriptorOnomastico],
          ['Descriptor toponímico', this.coleccion.contenidoEstructura.descriptorToponimico]
      ]).widths([ 150, '*' ]).margin([0,0,0,salto]).end;
      pdf.add(contenidoEstructuraTable);

      pdf.add(new Txt('Acceso y uso').bold().fontSize(fontTitleSize).end);
      var accesoUsoTable = new Table([
          ['Idioma original', this.coleccion.accesoUso.idiomaOriginal],
          ['Soporte', this.coleccion.accesoUso.soporte],
          ['Número de casetes', this.coleccion.accesoUso.numeroCasetes],
          ['Color', this.coleccion.accesoUso.color],
          ['Audio', this.coleccion.accesoUso.audio],
          ['Sistema de grabación', this.coleccion.accesoUso.sistemaGrabacion],
          ['Resolución de grabación', this.coleccion.accesoUso.resolucionGrabacion],
          ['Formato de video digital', this.coleccion.accesoUso.formatoVideoDigital],
          ['Requisitos técnicos', this.coleccion.accesoUso.requisitosTecnicos]
      ]).widths([ 150, '*' ]).margin([0,0,0,salto]).end;
      pdf.add(accesoUsoTable);

      pdf.add(new Txt('Documentación asociada').bold().fontSize(fontTitleSize).end);
      var documentacionAsociadaTable = new Table([
          ['Unidades de descripción relacionadas', this.coleccion.documentacionAsociada.unidadesDescripcionRelacionadas],
          ['Documentos asociados', this.coleccion.documentacionAsociada.documentosAsociados]
      ]).widths([ 150, '*' ]).margin([0,0,0,salto]).end;
      pdf.add(documentacionAsociadaTable);

      pdf.add(new Txt('Notas').bold().fontSize(fontTitleSize).end);
      var notasTable = new Table([
          ['Notas', this.coleccion.notas.notas]
      ]).widths([ 150, '*' ]).margin([0,0,0,salto]).end;
      pdf.add(notasTable);

      pdf.add(new Txt('Control de descripción').bold().fontSize(fontTitleSize).end);
      var controlDescripcionTable = new Table([
          ['Archivista', this.coleccion.controlDescripcion.nombreArchivero],
          ['Notas de archivista', this.coleccion.controlDescripcion.notaArchivero],
          ['Fecha de descripción', this.coleccion.controlDescripcion.fechaDescripcion],
          ['Fecha de última actualización', this.coleccion.controlDescripcion.fechaActualizacion]
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

      pdf.create().download(`Ficha_catalogacion_${this.coleccion.identificacion.codigoReferencia}.pdf`);

    //   // El nombre del archivo incluye código de referencia
    //   doc.save(`Ficha_catalogacion_${this.video.identificacion.codigoReferencia}.pdf`);
    }
  }
}
</script>
