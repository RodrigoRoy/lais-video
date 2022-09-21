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
          <v-btn href="/">Ir a inicio</v-btn>
        </v-col>
      </v-row>
    </v-alert>

    <!-- Usar v-if/v-else evita advertencias/errores en consola al renderizar -->
    <v-container v-else>
      <v-breadcrumbs
        :items="breadcrumbs"
        divider=">"
        class="justify-center"
      ></v-breadcrumbs>
      <h1>{{ video.identificacion.codigoReferencia }}</h1>
      <video width="100%" height="240px" controls>
        <source
          :src="`${publicPath}files/video/${video.adicional.video}`"
          type="video/mp4"
        />
        Tu navegador web no soporta la reproducción de video
      </video>
      <v-card v-if="video">
        <v-card-text>
          <h2 class="py-6">Área de identificación</h2>
          <v-container>
            <v-row class="py-3" v-if="video.identificacion.fecha" :align="'start'" no-gutters>
              <v-col>Fecha</v-col>
              <v-col>{{ video.identificacion.fecha | date}}</v-col>  
            </v-row>

            <v-row class="py-3" v-if="video.identificacion.pais" :align="'start'" no-gutters>
              <v-col>País</v-col>
              <v-col>{{ video.identificacion.pais}}</v-col>  
            </v-row>

            <v-row class="py-3" v-if="video.identificacion.lugar" :align="'start'" no-gutters>
              <v-col>Lugar de registro</v-col>
              <v-col>{{ video.identificacion.lugar}}</v-col>  
            </v-row>

            <v-row class="py-3" v-if="video.identificacion.duracion" :align="'start'" no-gutters>
              <v-col>Duración</v-col>
              <v-col>{{ video.identificacion.duracion}} minutos</v-col>  
            </v-row>

            <v-row class="py-3" v-if="video.identificacion.personasEntrevistadas" :align="'start'" no-gutters>
              <v-col>Persona entrevistada</v-col>
              <v-col>{{ video.identificacion.personasEntrevistadas}}</v-col>  
            </v-row>

            <v-row class="py-3" v-if="video.identificacion.entrevistador" :align="'start'" no-gutters>
              <v-col>Persona que entrevista</v-col>
              <v-col>{{ video.identificacion.entrevistador}}</v-col>  
            </v-row>

            <v-row class="py-3" v-if="video.identificacion.camara" :align="'start'" no-gutters>
              <v-col>Cámara</v-col>
              <v-col>{{ video.identificacion.camara}}</v-col>  
            </v-row>

            <v-row class="py-3" v-if="video.identificacion.asistente" :align="'start'" no-gutters>
              <v-col>Asistente</v-col>
              <v-col>{{ video.identificacion.asistente}}</v-col>  
            </v-row>
          </v-container>

          <h2 class="py-6">Área de contenido y estructura</h2>
          <v-container>
            <v-row class="py-3" v-if="video.contenidoEstructura.descripcionGeneral" :align="'start'" no-gutters>
              <v-col>Descripción general</v-col>
              <v-col>{{ video.contenidoEstructura.descripcionGeneral}}</v-col>  
            </v-row>

            <v-row class="py-3" v-if="video.contenidoEstructura.estructuraFormal" :align="'start'" no-gutters>
              <v-col>Estructura formal</v-col>
              <v-col>{{ video.contenidoEstructura.estructuraFormal}}</v-col>  
            </v-row>

            <v-row class="py-3" v-if="video.contenidoEstructura.descriptorOnomastico" :align="'start'" no-gutters>
              <v-col>Descriptor onomástico</v-col>
              <v-col>{{ video.contenidoEstructura.descriptorOnomastico}}</v-col>  
            </v-row>

            <v-row class="py-3" v-if="video.contenidoEstructura.descriptorToponimico" :align="'start'" no-gutters>
              <v-col>Descriptor toponímico</v-col>
              <v-col>{{ video.contenidoEstructura.descriptorToponimico}}</v-col>  
            </v-row>
          </v-container>

          <h2 class="py-6">Área de acceso y uso</h2>
          <v-container>
            <v-row class="py-3" v-if="video.accesoUso.idiomaOriginal" :align="'start'" no-gutters>
              <v-col>Idioma original</v-col>
              <v-col>{{ video.accesoUso.idiomaOriginal}}</v-col>  
            </v-row>

            <v-row class="py-3" v-if="video.accesoUso.soporte" :align="'start'" no-gutters>
              <v-col>Soporte original</v-col>
              <v-col>{{ video.accesoUso.soporte}}</v-col>  
            </v-row>

            <v-row class="py-3" v-if="video.accesoUso.sistemaGrabacion" :align="'start'" no-gutters>
              <v-col>Sistema de grabación</v-col>
              <v-col>{{ video.accesoUso.sistemaGrabacion}}</v-col>  
            </v-row>

            <v-row class="py-3" v-if="video.accesoUso.resolucionGrabacion" :align="'start'" no-gutters>
              <v-col>Resolución de grabación</v-col>
              <v-col>{{ video.accesoUso.resolucionGrabacion}}</v-col>  
            </v-row>

            <v-row class="py-3" v-if="video.accesoUso.formatoVideoDigital" :align="'start'" no-gutters>
              <v-col>Formato de video digital</v-col>
              <v-col>{{ video.accesoUso.formatoVideoDigital}}</v-col>  
            </v-row>

            <v-row class="py-3" v-if="video.accesoUso.numeroCasetes" :align="'start'" no-gutters>
              <v-col>Número de casetes</v-col>
              <v-col>{{ video.accesoUso.numeroCasetes}}</v-col>  
            </v-row>

            <v-row class="py-3" v-if="video.accesoUso.color" :align="'start'" no-gutters>
              <v-col>Color</v-col>
              <v-col>{{ video.accesoUso.color}}</v-col>  
            </v-row>

            <v-row class="py-3" v-if="video.accesoUso.audio" :align="'start'" no-gutters>
              <v-col>Audio</v-col>
              <v-col>{{ video.accesoUso.audio}}</v-col>  
            </v-row>

            <v-row class="py-3" v-if="video.accesoUso.requisitosTecnicos" :align="'start'" no-gutters>
              <v-col>Requisitos técnicos</v-col>
              <v-col>{{ video.accesoUso.requisitosTecnicos}}</v-col>  
            </v-row>
          </v-container>

          <h2 class="py-6">Área de documentación asociada</h2>
          <v-container>
            <v-row class="py-3" v-if="video.documentacionAsociada.unidadesDescripcionRelacionadas" :align="'start'" no-gutters>
              <v-col>Unidades de descripción relacionadas</v-col>
              <v-col>{{ video.documentacionAsociada.unidadesDescripcionRelacionadas}}</v-col>  
            </v-row>

            <v-row class="py-3" v-if="video.documentacionAsociada.documentosAsociados" :align="'start'" no-gutters>
              <v-col>Documentos asociados</v-col>
              <v-col>{{ video.documentacionAsociada.documentosAsociados}}</v-col>  
            </v-row>
          </v-container>

          <h2 class="py-6">Área de notas</h2>
          <v-container>
            <v-row class="py-3" v-if="video.notas.notas" :align="'start'" no-gutters>
              <v-col>Notas</v-col>
              <v-col>{{ video.notas.notas}}</v-col>  
            </v-row>
          </v-container>

          <h2 class="py-6">Área de control de la descripción</h2>
          <v-container>
            <v-row class="py-3" v-if="video.controlDescripcion.nombreArchivero" :align="'start'" no-gutters>
              <v-col>Nombre del archivero</v-col>
              <v-col>{{ video.controlDescripcion.nombreArchivero}}</v-col>  
            </v-row>

            <v-row class="py-3" v-if="video.controlDescripcion.fechaDescripcion" :align="'start'" no-gutters>
              <v-col>Fecha de descripción</v-col>
              <v-col>{{ video.controlDescripcion.fechaDescripcion}}</v-col>  
            </v-row>

            <v-row class="py-3" v-if="video.controlDescripcion.fechaActualizacion" :align="'start'" no-gutters>
              <v-col>Fecha de actualización</v-col>
              <v-col>{{ video.controlDescripcion.fechaActualizacion}}</v-col>  
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <div v-if="video">
            <v-btn @click="goToEdit(video)" class="mr-2">Editar <v-icon>mdi-pencil</v-icon> </v-btn>
            <v-btn @click="remove(video)" class="mr-2">Borrar <v-icon>mdi-delete</v-icon> </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>


<script>
// import { PdfMakeWrapper, Table, Txt, Img } from "pdfmake-wrapper";
// import * as pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import * as videoService from "../../services/VideoService"; // servicio para llamadas al API

export default {
  name: "VideoView",

  data: () => ({
    // El objeto video representa una unidad documental, es decir, un registro audiovisual organizado por áreas
    video: {
      identificacion: {},
      contenidoEstructura: {},
      accesoUso: {},
      documentacionAsociada: {},
      notas: {},
      controlDescripcion: {},
      adicional: {},
    },
    // Representación jerárquica de los grupos a los que pertenecen el registro en video
    breadcrumbs: [],
    // Mensaje de error, en caso de haber
    error: null,
    publicPath: process.env.BASE_URL,
    alignments: ["start", "center", "end"],
  }),

  // Obtención de información desde API, antes de renderizar vista
  beforeRouteEnter(to, from, next) {
    videoService
      .getVideoById(to.params.id)
      .then((res) => {
        // :id en URL es to.params.id
        next((vm) => {
          // vm es necesario para asignaciones, this no existe en este contexto
          vm.video = res.data.video;

          // Obtener listado breadcrumbs
          videoService
            .breadcrumbs(to.params.id)
            .then((response) => {
              vm.breadcrumbs = response.data.breadcrumbs;
            })
            .catch((error) => {
              next((vm) => {
                vm.error = error.message;
                vm.breadcrumbs = null;
              });
            });
        });
      })
      // En caso de error (400 HTTP status code)
      .catch((error) => {
        next((vm) => {
          vm.error = error.message;
          vm.video = null;
        });
      });
  },

  methods: {
    // Crea la ficha del registro en video en formato PDF
    // async printPDF() {
    //   PdfMakeWrapper.setFonts(pdfFonts);

    //   const pdf = new PdfMakeWrapper();

    //   var fontTitleSize = 20;
    //   var salto = 20;

    //   var logo_mora = require("@/assets/Logo_Mora.jpg");
    //   var logo_lais = require("@/assets/Logo_LAIS.jpg");

    //   // Logos
    //   var logos = new Table([
    //     [
    //       "",
    //       await new Img(logo_mora).width(50).height(40).build(),
    //       await new Img(logo_lais).width(50).height(40).build(),
    //     ],
    //   ])
    //     .widths([370, "*", "*"])
    //     .layout("noBorders").end;
    //   pdf.add(logos);

    //   pdf.add(new Txt("Identificación").bold().fontSize(fontTitleSize).end);
    //   var identificacionTable = new Table([
    //     ["Código de referencia", this.video.identificacion.codigoReferencia],
    //     ["Fecha", this.video.identificacion.fecha],
    //     ["Lugar", this.video.identificacion.lugar],
    //     ["País", this.video.identificacion.pais],
    //     ["Duración", this.video.identificacion.duracion],
    //     [
    //       "Personas entrevistadas",
    //       this.video.identificacion.personasEntrevistadas,
    //     ],
    //     ["Entrevistador/a", this.video.identificacion.entrevistador],
    //     ["Cámara", this.video.identificacion.camara],
    //     ["Asistente", this.video.identificacion.asistente],
    //   ])
    //     .widths([150, "*"])
    //     .margin([0, 0, 0, salto]).end;
    //   pdf.add(identificacionTable);

    //   pdf.add(
    //     new Txt("Contenido y estructura").bold().fontSize(fontTitleSize).end
    //   );
    //   var contenidoEstructuraTable = new Table([
    //     [
    //       "Descripción general",
    //       this.video.contenidoEstructura.descripcionGeneral,
    //     ],
    //     ["Estructura formal", this.video.contenidoEstructura.estructuraFormal],
    //     [
    //       "Descriptor onomástico",
    //       this.video.contenidoEstructura.descriptorOnomastico,
    //     ],
    //     [
    //       "Descriptor toponímico",
    //       this.video.contenidoEstructura.descriptorToponimico,
    //     ],
    //   ])
    //     .widths([150, "*"])
    //     .margin([0, 0, 0, salto]).end;
    //   pdf.add(contenidoEstructuraTable);

    //   pdf.add(new Txt("Acceso y uso").bold().fontSize(fontTitleSize).end);
    //   var accesoUsoTable = new Table([
    //     ["Idioma original", this.video.accesoUso.idiomaOriginal],
    //     ["Soporte", this.video.accesoUso.soporte],
    //     ["Número de casetes", this.video.accesoUso.numeroCasetes],
    //     ["Color", this.video.accesoUso.color],
    //     ["Audio", this.video.accesoUso.audio],
    //     ["Sistema de grabación", this.video.accesoUso.sistemaGrabacion],
    //     ["Resolución de grabación", this.video.accesoUso.resolucionGrabacion],
    //     ["Formato de video digital", this.video.accesoUso.formatoVideoDigital],
    //     ["Requisitos técnicos", this.video.accesoUso.requisitosTecnicos],
    //   ])
    //     .widths([150, "*"])
    //     .margin([0, 0, 0, salto]).end;
    //   pdf.add(accesoUsoTable);

    //   pdf.add(
    //     new Txt("Documentación asociada").bold().fontSize(fontTitleSize).end
    //   );
    //   var documentacionAsociadaTable = new Table([
    //     [
    //       "Unidades de descripción relacionadas",
    //       this.video.documentacionAsociada.unidadesDescripcionRelacionadas,
    //     ],
    //     [
    //       "Documentos asociados",
    //       this.video.documentacionAsociada.documentosAsociados,
    //     ],
    //   ])
    //     .widths([150, "*"])
    //     .margin([0, 0, 0, salto]).end;
    //   pdf.add(documentacionAsociadaTable);

    //   pdf.add(new Txt("Notas").bold().fontSize(fontTitleSize).end);
    //   var notasTable = new Table([["Notas", this.video.notas.notas]])
    //     .widths([150, "*"])
    //     .margin([0, 0, 0, salto]).end;
    //   pdf.add(notasTable);

    //   pdf.add(
    //     new Txt("Control de descripción").bold().fontSize(fontTitleSize).end
    //   );
    //   var controlDescripcionTable = new Table([
    //     ["Archivista", this.video.controlDescripcion.nombreArchivero],
    //     ["Notas de archivista", this.video.controlDescripcion.notaArchivero],
    //     [
    //       "Fecha de descripción",
    //       this.video.controlDescripcion.fechaDescripcion,
    //     ],
    //     [
    //       "Fecha de última actualización",
    //       this.video.controlDescripcion.fechaActualizacion,
    //     ],
    //   ])
    //     .widths([150, "*"])
    //     .margin([0, 0, 0, salto]).end;
    //   pdf.add(controlDescripcionTable);

    //   pdf.add(new Txt("Imagen").bold().fontSize(fontTitleSize).end);
    //   var img = require("@/assets/videopreview2.png");
    //   pdf.add(await new Img(img).width(250).height(200).build());

    //   // Fecha de consulta
    //   const tiempoTranscurrido = Date.now();
    //   const hoy = new Date(tiempoTranscurrido);

    //   pdf.add("Fecha de consulta: " + hoy.toLocaleDateString());

    //   // Pie de página con numeración de página
    //   pdf.footer((currentPage, pageCount) => {
    //     var t = {
    //       layout: "noBorders",
    //       fontSize: 8,
    //       margin: [25, 0, 25, 0],
    //       table: {
    //         widths: [400, "*"],
    //         body: [
    //           [
    //             { text: "" },
    //             {
    //               text: "Página " + currentPage.toString() + " de " + pageCount,
    //             },
    //           ],
    //         ],
    //       },
    //     };
    //     return t;
    //   });

    //   pdf
    //     .create()
    //     .download(
    //       `Ficha_catalogacion_${this.video.identificacion.codigoReferencia}.pdf`
    //     );

    //   //   // El nombre del archivo incluye código de referencia
    //   //   doc.save(`Ficha_catalogacion_${this.video.identificacion.codigoReferencia}.pdf`);
    // },

    /**
     * Envia a la ruta URL de edición del registro de video actual
     * @param {Object} video - representa el registro de video, debe contener el atributo "_id"
     */
     goToEdit(video){
      this.$router.push({name: 'video-edit', params: {id: video._id}});
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
  },
};
</script>
