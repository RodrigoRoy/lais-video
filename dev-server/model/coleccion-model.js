import mongoose from 'mongoose';

const coleccionSchema = new mongoose.Schema({
  identificacion: {
    codigoReferencia: String,
    titulo: String,
    proyectoInvestigacion: String, // Sólo para proyectos
    // pais: [String], // INFERIDO
    fecha: Date,
    fechaFin: Date,
    nivelDescripcion: {type: String, enum: ['Colección', 'Grupo', 'Subgrupo', 'Subsubgrupo']},
    investigacion: String,
    coordinacionProyecto: String,
    coordinacionAudiovisual: String,
  },
  contexto: {
    historiaInstitucional: String,
    historiaArchivistica: String,
    semblanzaBiografica: String,
  },
  contenidoEstructura: {
    alcanceContenido: String,
    valoracionSeleccionEliminacion: String,
    nuevosIngresos: String,
    organizacion: String, // No es necesaria??
  },
  accesoUso: {
    condicionesAcceso: {type: String, enum: ['Usos reservados para consulta in situ']},
    condicionesUso: {type: String, enum: ['Usos no lucrativos', 'Usos lucrativos']},
  },
  notas: {
    notas: String,
  },
  controlDescripcion: {
    // documentalistas: [{type: String}], //[{type: Schema.Types.ObjectId, ref: 'Usuario'}], // INFERIDO
    reglasNormas: {type: String, trim: true, default: 'LAIS, Lineamientos para la descripción de Registros de video propios, 2021'},
    //actualizacionDescripcion: {type: Date} // IMPLÍCITO (updatedAt)
  },
  adicional: {
    imagen: String,
    presentacion: String,
  }
},{
  collection: 'conjuntoDocumental',
  timestamps: true, //timestamps: {createdAt: 'creacion', updatedAt: 'actualizacion'}
});

export default mongoose.model('coleccion', coleccionSchema);
