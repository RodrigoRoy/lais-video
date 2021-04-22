<template>
  <v-card>
    <v-tabs v-model="tab" centered icons-and-text >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#identificacion">
        Identificación
        <v-icon>mdi-film</v-icon>
      </v-tab>

      <v-tab href="#contexto">
        Contexto
        <v-icon>mdi-account-multiple</v-icon>
      </v-tab>

      <v-tab href="#contenidoEstructura">
        Contenido y estructura
        <v-icon>mdi-book-open-page-variant</v-icon>
      </v-tab>

      <v-tab href="#accesoUso">
        Acceso y uso
        <v-icon>mdi-key</v-icon>
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
          <v-form>
            <v-text-field label="Código de referencia" hint="Código alfanumérico separado por guiones. Ejemplo: MXIM-AV-2-3-1" required></v-text-field>

            <v-text-field label="Título" hint="Título de la unidad de descripción"></v-text-field>

            <!-- <v-text-field label="País" hint="País o países de producción del registro en video"></v-text-field> -->
            <v-autocomplete :items="paises" item-text="nombre" label="País" hint="País o países de producción del registro en video"></v-autocomplete>

            <v-menu v-model="menuCalenda1" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px" >
              <template v-slot:activator="{ on }">
                <v-text-field v-model="coleccion.identificacion.fecha" label="Fecha" hint="Fecha en que se hizo el registro" prepend-icon="mdi-calendar" readonly v-on="on" ></v-text-field>
              </template>
              <v-date-picker v-model="coleccion.identificacion.fecha" @input="menuCalendar1 = false"></v-date-picker>
            </v-menu>

            <v-select :items="['Colección', 'Fondo', 'Grupo', 'Subgrupo']" label="Nivel de descripción" v-model="coleccion.identificacion.nivelDescripcion"></v-select>

            <v-text-field label="Proyecto de investigación" hint="Proyecto de investigación para el cual fueron realizados los registros a documentar"></v-text-field>

            <!-- <v-text-field label="Investigación" hint="Persona(s) responsable(s) de la investigación para la cual se realizaron los registros a documentar"></v-text-field> -->
            <v-autocomplete :items="people" item-text="nombre" label="Investigación" hint="Persona(s) responsable(s) de la investigación para la cual se realizaron los registros a documentar" v-model="coleccion.identificacion.investigacion" @blur="setSemblanza"></v-autocomplete>

            <v-text-field label="Coordinación del proyecto" hint="Persona coordinadora del proyecto de investigación en el marco del cual se realizaron los registros a documentar"></v-text-field>

            <v-text-field label="Coordinación de producción audiovisual" hint="Persona(s) coordinadora(s) de la documentación audiovisual durante el proceso de investigación"></v-text-field>
          </v-form>
        </v-card>
      </v-tab-item>

      <v-tab-item value="contexto" >
        <v-card flat>
          <v-form>
            <v-textarea label="Historia institucional" hint="datos sobre el origen, evolución y desarrollo de la entidad productora de la colección, tomando en consideración a las personas físicas involucradas" auto-grow rows="3" row-height="25" ></v-textarea>

            <v-textarea label="Historia archivística" hint="historia y el desarrollo de la colección, indicando aquellos hechos que han contribuido a conformar su estructura y organización actual" auto-grow rows="3" row-height="25" ></v-textarea>

            <v-textarea label="Semblanza biográfica" hint="Básicos curriculares del/los investigador/es y el/los coordinador/es del proyecto y de la producción audiovisual" auto-grow rows="3" row-height="25" v-model="coleccion.contexto.semblanzaBiografica"></v-textarea>
          </v-form>
        </v-card>
      </v-tab-item>

      <v-tab-item value="contenidoEstructura" >
        <v-card flat>
          <v-form>
            <v-textarea label="Alcance y contenido" hint="Descripción del valor potencial de la colección y señalar para quienes puede ser útil" auto-grow rows="3" row-height="25" ></v-textarea>

            <v-textarea label="Valoración, selección y eliminación" hint="Se señala el criterio de selección y depuración de los materiales" auto-grow rows="3" row-height="25" ></v-textarea>

            <v-text-field label="Nuevos ingresos" hint="Se señala si es una colección abierta a nuevos ingresos o si se encuentra cerrada a su contenido actual"></v-text-field>

            <v-text-field label="Organización" hint="Se establece la forma en que se organiza la colección" v-model="coleccion.contenidoEstructura.organizacion"></v-text-field>
          </v-form>
        </v-card>
      </v-tab-item>

      <v-tab-item value="accesoUso" >
        <v-card flat>
          <v-form>
            <v-select :items="['Usos reservados para consulta in situ', 'Usos no lucrativos', 'Usos lucrativos']" label="Condiciones de acceso" hint="Los diversos usos del material que se ofrecen al usuario"></v-select>

            <v-text-field label="Condiciones de reproducción" hint="Si el registro original se puede reproducir o no, de acuerdo al tipo de solicitud"></v-text-field>
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
            <v-text-field label="Documentalistas" hint="Nombres de las personas que llevaron a cabo la descripción"></v-text-field>

            <v-text-field label="Reglas o normas" hint="Normas que se utilizaron para la elaboración de la ficha"></v-text-field>

            <v-menu v-model="menuCalenda2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px" >
              <template v-slot:activator="{ on }">
                <v-text-field v-model="coleccion.controlDescripcion.fechaDescripcion" label="Fecha de descripción" hint="Fecha en que se elaboró la ficha de la unidad" prepend-icon="mdi-calendar" readonly v-on="on" ></v-text-field>
              </template>
              <v-date-picker v-model="coleccion.controlDescripcion.fechaDescripcion" @input="menuCalendar2 = false"></v-date-picker>
            </v-menu>

            <v-menu v-model="menuCalenda3" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px" >
              <template v-slot:activator="{ on }">
                <v-text-field v-model="coleccion.controlDescripcion.fechaActualizacion" label="Fecha de actualización" hint="Fecha de la última modificación a la ficha de la unidad" prepend-icon="mdi-calendar" readonly v-on="on" ></v-text-field>
              </template>
              <v-date-picker v-model="coleccion.controlDescripcion.fechaActualizacion" @input="menuCalendar3 = false"></v-date-picker>
            </v-menu>
          </v-form>
        </v-card>
      </v-tab-item>

      <v-tab-item value="adicional" >
        <v-card flat>
          <v-form>
            <v-file-input show-size counter chips accept="image/*" prepend-icon="mdi-image" label="Portada"></v-file-input>
            <v-textarea label="Presentación" hint="" auto-grow rows="5" row-height="25" ></v-textarea>
          </v-form>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      coleccion: {
        identificacion: {
          fecha: new Date().toISOString().substr(0, 10),
          nivelDescripcion: 'Fondo'
        },
        contexto: {},
        contenidoEstructura: {
          organizacion: 'Por proyecto de investigación',
        },
        accesoUso: {},
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
      paises: [
        { nombre: 'México', abbr: 'mx' },
        { nombre: 'Brasil', abbr: 'br' },
        { nombre: 'Estados Unidos', abbr: 'us' },
      ],
      people: [
        {
          nombre: 'Lourdes Roca',
          semblanza: 'Semblanza de Lourdes Roca...',
        },
        {
          nombre: 'Felipe Morales',
          semblanza: 'Semblanza de Felipe Morales...',
        },
        {
          nombre: 'Carlos Hernández',
          semblanza: 'Semblanza de Carlos Hernández...',
        }
      ]
    }
  },
  methods: {
    setSemblanza: function(){
      console.log("blur semblanza");
      console.log("investigacion: ", this.coleccion.identificacion.investigacion);
      // const person = this.searchArray(this.coleccion.identificacion.investigacion, this.people);
      const person = this.people.find(o => o.nombre === this.coleccion.identificacion.investigacion);
      console.log("persona: ", person);
      this.coleccion.contexto.semblanzaBiografica = person.semblanza;
      console.log("semblanza: ", this.coleccion.contexto.semblanzaBiografica);
    },
  }
}
</script>
