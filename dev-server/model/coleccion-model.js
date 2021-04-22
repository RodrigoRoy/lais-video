import mongoose from 'mongoose';

const coleccionSchema = new mongoose.Schema({
  identificacion: {
    codigoReferencia: String,
    titulo: String,
    // pais: [String], // INFERIDO
    fecha: Date,
    proyectoInvestigacion: String,
    investigacion: String,
    coordinacionProyecto: String,
  },
  contexto: {
    historiaInstitucional: String,
    semblanzaBiografica: String,
  },
  contenidoEstructura: {
    alcanceContenido: String,
    valoracionSeleccionEliminacion: String,
    nuevosIngresos: String,
    organizacion: String,
  },
  accesoUso: {
    condicionesAcceso: {type: String, enum: ['Usos reservados para consulta in situ', 'Usos no lucrativos', 'Usos lucrativos']},
    condicionesReproduccion: String,
  },
  notas: {
    notas: String,
  },
  controlDescripcion: {
    // documentalistas: [{type: String}], //[{type: Schema.Types.ObjectId, ref: 'Usuario'}], // INFERIDO
    reglasNormas: {type: String, trim: true, default: 'LAIS, Lineamientos para la descripción de registros en video propios, 2021'},
    //actualizacionDescripcion: {type: Date} // IMPLÍCITO (updatedAt)
  },
  adicional: {
    imagen: String,
    // presentacion: String,
  }
},{
  collection: 'conjuntoDocumental',
  timestamps: true, //timestamps: {createdAt: 'creacion', updatedAt: 'actualizacion'}
});

export default mongoose.model('coleccion', coleccionSchema);
