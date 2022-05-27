<!-- Vista de las unidades documentales (registros en video)
Se reutiliza la misma vista para cualquier conjunto con unidades documentales -->

<template>
  <v-container>
    <!-- Usar v-if/v-else evita advertencias/errores en consola al renderizar -->
    <v-card v-if="grupo">
      <v-card-text>
        <!-- Componente para el render de la información del grupo -->
        <grupo-info :grupo="grupo"></grupo-info>
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
import * as grupoService from '../../services/GrupoService' // servicio para llamadas al API
import GrupoInfo from '../../components/GrupoInfo.vue'// Componente que renderiza datos de la coleccion

export default {
  name: 'GrupoView',

  components: {
    GrupoInfo,
  },

  data: () => ({
    // El objeto grupo representa una unidad documental, es decir, un registro audiovisual organizado por áreas
    grupo: {},
  }),

  // Obtención de información desde API, antes de renderizar vista
  beforeRouteEnter(to, from, next){
    grupoService.getGroupById(to.params.id).then(res => { // :id en URL es to.params.id
      next(vm => { // vm es necesario para asignaciones, this no existe en este contexto
        let grupo = res.data.grupo;
        vm.grupo = grupo;
      });
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
          ['Código de referencia', this.grupo.identificacion.codigoReferencia],
          ['Fecha', this.grupo.identificacion.fecha],
          ['Lugar', this.grupo.identificacion.lugar],
          ['País', this.grupo.identificacion.pais],
          ['Duración', this.grupo.identificacion.duracion],
          ['Personas entrevistadas', this.grupo.identificacion.personasEntrevistadas],
          ['Entrevistador/a', this.grupo.identificacion.entrevistador],
          ['Cámara', this.grupo.identificacion.camara],
          ['Asistente', this.grupo.identificacion.asistente]
      ]).widths([ 150, '*' ]).margin([0,0,0,salto]).end;
      pdf.add(identificacionTable);

      pdf.add(new Txt('Contenido y estructura').bold().fontSize(fontTitleSize).end);
      var contenidoEstructuraTable = new Table([
          ['Descripción general', this.grupo.contenidoEstructura.descripcionGeneral],
          ['Estructura formal', this.grupo.contenidoEstructura.estructuraFormal],
          ['Descriptor onomástico', this.grupo.contenidoEstructura.descriptorOnomastico],
          ['Descriptor toponímico', this.grupo.contenidoEstructura.descriptorToponimico]
      ]).widths([ 150, '*' ]).margin([0,0,0,salto]).end;
      pdf.add(contenidoEstructuraTable);

      pdf.add(new Txt('Acceso y uso').bold().fontSize(fontTitleSize).end);
      var accesoUsoTable = new Table([
          ['Idioma original', this.grupo.accesoUso.idiomaOriginal],
          ['Soporte', this.grupo.accesoUso.soporte],
          ['Número de casetes', this.grupo.accesoUso.numeroCasetes],
          ['Color', this.grupo.accesoUso.color],
          ['Audio', this.grupo.accesoUso.audio],
          ['Sistema de grabación', this.grupo.accesoUso.sistemaGrabacion],
          ['Resolución de grabación', this.grupo.accesoUso.resolucionGrabacion],
          ['Formato de video digital', this.grupo.accesoUso.formatoVideoDigital],
          ['Requisitos técnicos', this.grupo.accesoUso.requisitosTecnicos]
      ]).widths([ 150, '*' ]).margin([0,0,0,salto]).end;
      pdf.add(accesoUsoTable);

      pdf.add(new Txt('Documentación asociada').bold().fontSize(fontTitleSize).end);
      var documentacionAsociadaTable = new Table([
          ['Unidades de descripción relacionadas', this.grupo.documentacionAsociada.unidadesDescripcionRelacionadas],
          ['Documentos asociados', this.grupo.documentacionAsociada.documentosAsociados]
      ]).widths([ 150, '*' ]).margin([0,0,0,salto]).end;
      pdf.add(documentacionAsociadaTable);

      pdf.add(new Txt('Notas').bold().fontSize(fontTitleSize).end);
      var notasTable = new Table([
          ['Notas', this.grupo.notas.notas]
      ]).widths([ 150, '*' ]).margin([0,0,0,salto]).end;
      pdf.add(notasTable);

      pdf.add(new Txt('Control de descripción').bold().fontSize(fontTitleSize).end);
      var controlDescripcionTable = new Table([
          ['Archivista', this.grupo.controlDescripcion.nombreArchivero],
          ['Notas de archivista', this.grupo.controlDescripcion.notaArchivero],
          ['Fecha de descripción', this.grupo.controlDescripcion.fechaDescripcion],
          ['Fecha de última actualización', this.grupo.controlDescripcion.fechaActualizacion]
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

      pdf.create().download(`Ficha_catalogacion_${this.grupo.identificacion.codigoReferencia}.pdf`);

    //   // El nombre del archivo incluye código de referencia
    //   doc.save(`Ficha_catalogacion_${this.video.identificacion.codigoReferencia}.pdf`);
    }
  }
}
</script>
