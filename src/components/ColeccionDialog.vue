<!-- Componente que representa una ventana emergente (dialog) para un conjunto documental -->
<!-- TODO: Actualizar e incorporar en "ColecciónProyectos.vue", "ColecciónProyectos1.vue" y "ColecciónProyectos2.vue" -->

<template>
  <v-dialog v-model="dialog" overlay-opacity="0.80">
    <v-card>
      <!-- <v-card-title class="headline">Información completa</v-card-title> -->
      <v-card-text>
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title>{{ coleccion.identificacion.titulo }}</v-toolbar-title>
        </v-toolbar>
        <v-tabs vertical>
          <v-tab>
            <v-icon left>mdi-film</v-icon>
            Identificación
          </v-tab>
          <v-tab>
            <v-icon left>mdi-account-multiple</v-icon>
            Contexto
          </v-tab>
          <v-tab>
            <v-icon left>mdi-book-open-page-variant</v-icon>
            Contenido y <br>
             estructura
          </v-tab>
          <v-tab>
            <v-icon left>mdi-key</v-icon>
            Acceso y uso
          </v-tab>
          <v-tab>
            <v-icon left>mdi-lead-pencil</v-icon>
            Notas
          </v-tab>
          <v-tab>
            <v-icon left>mdi-account-details</v-icon>
            Control de<br>
             la descripción
          </v-tab>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  <span class="font-weight-bold">Código de referencia</span>
                  <br>
                  {{ coleccion.identificacion.codigoReferencia }}
                </p>
                <p>
                  <span class="font-weight-bold">Título</span>
                  <br>
                  {{ coleccion.identificacion.titulo }}
                </p>
                <p>
                  <span class="font-weight-bold">País</span>
                  <br>
                  {{ coleccion.identificacion.pais }}
                </p>
                <p>
                  <span class="font-weight-bold">Fecha</span>
                  <br>
                  {{ coleccion.identificacion.fecha }}
                </p>
                <p>
                  <span class="font-weight-bold">Proyecto de investigación</span>
                  <br>
                  {{ coleccion.identificacion.proyectoInvestigacion }}
                </p>
                <p>
                  <span class="font-weight-bold">Investigación</span>
                  <br>
                  {{ coleccion.identificacion.investigacion }}
                </p>
                <p>
                  <span class="font-weight-bold">Coordinación del proyecto</span>
                  <br>
                  {{ coleccion.identificacion.coordinacionProyecto }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  <span class="font-weight-bold">Historia institucional</span>
                  <br>
                  {{ coleccion.contexto.historiaInstitucional }}
                </p>
                <p>
                  <span class="font-weight-bold">Semblanza biográfica</span>
                  <br>
                  {{ coleccion.contexto.semblanzaBiografica }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  <span class="font-weight-bold">Alcance y contenido</span>
                  <br>
                  {{ coleccion.contenidoEstructura.alcanceContenido }}
                </p>
                <p>
                  <span class="font-weight-bold">Valoración, selección y eliminación</span>
                  <br>
                  {{ coleccion.contenidoEstructura.valoracionSeleccionEliminacion }}
                </p>
                <p>
                  <span class="font-weight-bold">Nuevos ingresos</span>
                  <br>
                  {{ coleccion.contenidoEstructura.nuevosIngresos }}
                </p>
                <p>
                  <span class="font-weight-bold">Organización</span>
                  <br>
                  {{ coleccion.contenidoEstructura.organizacion }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  <span class="font-weight-bold">Condiciones de acceso</span>
                  <br>
                  {{ coleccion.accesoUso.condicionesAcceso }}
                </p>
                <p>
                  <span class="font-weight-bold">Condiciones de reproducción</span>
                  <br>
                  {{ coleccion.accesoUso.condicionesReproduccion }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  <span class="font-weight-bold">Notas</span>
                  <br>
                  {{ coleccion.notas.notas }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  <span class="font-weight-bold">Documentalistas</span>
                  <br>
                  {{ coleccion.controlDescripcion.documentalistas }}
                </p>
                <p>
                  <span class="font-weight-bold">Fecha de descripción</span>
                  <br>
                  {{ coleccion.controlDescripcion.fechaDescripcion }}
                </p>
                <p>
                  <span class="font-weight-bold">Fecha de actualización</span>
                  <br>
                  {{ coleccion.controlDescripcion.fechaActualizacion }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      coleccion: {
        identificacion: {
          codigoReferencia: 'MXIM-AV-2-3',
          titulo: 'Lorem ipsum',
          pais: 'México',
          fecha: new Date().toISOString().substr(0, 10),
          proyectoInvestigacion: 'Consectetur adipiscing elit',
          investigacion: 'Praesent rutrum',
          coordinacionProyecto: 'Malesuada elit',
        },
        contexto: {
          historiaInstitucional: 'In hac habitasse platea dictumst. Mauris ac dapibus neque. Nunc faucibus est eget rhoncus scelerisque. Proin venenatis ante sit amet libero fermentum varius. Donec tempor aliquam pretium',
          semblanzaBiografica: 'Praesent faucibus pharetra nunc, quis venenatis nunc semper at. Suspendisse congue, leo convallis pulvinar convallis, mauris est bibendum felis, sed dignissim urna elit vel nibh',
        },
        contenidoEstructura: {
          alcanceContenido: 'Vestibulum viverra dolor nec tempus ullamcorper',
          valoracionSeleccionEliminacion: 'Pellentesque venenatis velit ligula',
          nuevosIngresos: 'Ac congue diam gravida vel',
          organizacion: 'Por proyecto de investigación',
        },
        accesoUso: {
          condicionesAcceso: 'Usos reservados para consulta in situ',
          condicionesReproduccion: 'Aenean vehicula ultricies euismod',
        },
        notas: {
          notas: 'Vivamus eleifend nisl eu nisi laoreet, tristique sagittis leo tristique. Aliquam vitae diam vel velit posuere lobortis',
        },
        controlDescripcion: {
          documentalistas: 'Duis dictum leo sit',
          fechaDescripcion: new Date().toISOString().substr(0, 10),
          fechaActualizacion: new Date().toISOString().substr(0, 10),
        }
      }
    }
  }
}
</script>
