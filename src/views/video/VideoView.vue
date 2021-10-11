<!-- Vista de las unidades documentales (registros en video)
Se reutiliza la misma vista para cualquier conjunto con unidades documentales -->

<template>
  <v-container>
    <!-- Encabezado con título del conjunto y el camino dentro de la colección (breadcrumbs) -->
    <h2 class="text-h3 text-center">Entrevista controlada (ejemplo)</h2>
    <v-breadcrumbs :items="breadcrumbs" class="justify-center"></v-breadcrumbs>

    <!-- Organización del espacio en filas y columnas de recuadros (cards) donde cada uno representa un video -->
    <v-row no-gutters align="center" justify="center">
      <v-col cols="12" md="3" v-for="n in 16" :key="n">
        <v-card class="ma-4 pa-4" outlined tile @click="dialog = true">
          <v-img :src="require('@/assets/videopreview.png')" height="150px"></v-img>
          <v-card-title class="justify-center">
            {{ video.identificacion.codigoReferencia }}-{{n}}
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
          <v-btn @click="printPDF()">Ficha <v-icon>mdi-file-pdf-box</v-icon></v-btn>
          <v-btn @click="dialog = false">Cerrar <v-icon>mdi-close</v-icon></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>


<script>
import VideoInfo from '@/components/VideoInfo.vue'
import { PdfMakeWrapper, Table, Txt, Img } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake

export default {
  name: 'VideoView',
  components: {
    VideoInfo // Información dentro de v-dialog
  },
  data: () => ({
    // El objeto video representa una unidad documental, es decir, un registro audiovisual organizado por áreas
    // Nota: el objeto video será obtenido desde la base de datos en futuras iteraciones del código
    video: {
      identificacion: {
        codigoReferencia: 'MXIM-AV-2-3-4',
        fecha: new Date().toISOString().substr(0, 10),
        lugar: 'Nullam ipsum urna, dapibus scelerisque neque quis',
        pais: 'México',
        duracion: '01:18:43',
        personasEntrevistadas: 'Sed Magna Sapien, Cras Vitae Lectus, Mollis Bibendum',
        entrevistador: 'Consectetur Adipiscing',
        camara: 'Praesent Rutrum',
        asistente: 'Malesuada Elit',
      },
      contenidoEstructura: {
        descripcionGeneral: 'Cras condimentum purus lectus, id dapibus massa laoreet sit amet. Proin sit amet dapibus justo. Maecenas id tempus arcu. Aliquam luctus eros ipsum, id ornare felis pharetra at.',
        estructuraFormal: 'Entrevista en campo',
        descriptorOnomastico: 'Pellentesque Venenatis, Velit ligula',
        descriptorToponimico: 'Congue Diam Gravida Vel',
      },
      accesoUso: {
        idiomaOriginal: 'Español',
        soporte: 'Hi8',
        numeroCasetes: '2',
        color: 'Color',
        audio: 'Estéreo',
        sistemaGrabacion: 'NTSC',
        resolucionGrabacion: '480p',
        formatoVideoDigital: 'MOV',
        requisitosTecnicos: 'Cras et purus sodales, lacinia neque id',
      },
      documentacionAsociada: {
        unidadesDescripcionRelacionadas: 'Praesent faucibus pharetra nunc, quis venenatis nunc semper at. Suspendisse congue, leo convallis pulvinar convallis',
        documentosAsociados: 'Donec dapibus posuere maximus. Nam lacus enim, commodo vitae sodales non, sodales sed lacus. Sed eget feugiat nisl, non blandit massa. Mauris metus nisi, hendrerit nec tortor ac, molestie tempor dui. In gravida metus nibh, ut interdum tortor aliquam et. Sed eu sollicitudin dolor. Etiam vel nisl quam. Etiam ac velit id sapien rutrum tincidunt ac sed lorem. Suspendisse egestas consequat lectus ac rutrum. ',
      },
      notas: {
        notas: 'Praesent rutrum malesuada elit sed placerat. In hac habitasse platea dictumst. Mauris ac dapibus neque. Nunc faucibus est eget rhoncus scelerisque. Proin venenatis ante sit amet libero fermentum varius. Donec tempor aliquam pretium. Praesent faucibus pharetra nunc, quis venenatis nunc semper at. Suspendisse congue, leo convallis pulvinar convallis, mauris est bibendum felis, sed dignissim urna elit vel nibh. Vestibulum viverra dolor nec tempus ullamcorper. Pellentesque venenatis velit ligula, ac congue diam gravida vel.',
      },
      controlDescripcion: {
        nombreArchivero: 'Aenean Vehicula',
        notaArchivero: 'Ut vel mi in justo commodo euismod sed non felis. Donec a libero lobortis, hendrerit est ut, porta enim. Duis dictum leo sit amet enim hendrerit semper',
        fechaDescripcion: new Date().toISOString().substr(0, 10),
        fechaActualizacion: new Date().toISOString().substr(0, 10),
      }
    },

    // Representación jerárquica de los conjuntos a los que pertenecen las unidades documentales
    breadcrumbs: [
      {
        text: 'Proyectos',
        disabled: false,
        href: 'proyectos',
      },
      {
        text: 'Ejemplo Proyecto',
        disabled: false,
        href: 'coleccion/proyectos/1',
      },
      {
        text: 'Entrevista',
        disabled: false,
        href: 'coleccion/proyectos/2',
      },
      {
        text: 'Entrevista controlada',
        disabled: true,
        href: 'video',
      }
    ],

    // Auxiliar que representa si la ventana de dialogo con la información del video se muestra (true) o no (false)
    dialog: false
  }),
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
