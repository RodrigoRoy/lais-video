import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId; // Datatype para referencias a otros esquemas

const grupoSchema = new mongoose.Schema({
  identificacion: {
    codigoReferencia: {type: String, required: true, trim: true, index: {unique: true}},
    proyectoInvestigacion: {type: String, trim: true},
    titulo: {type: String, trim: true},
    pais: {type: String, trim: true}, // puede ser autogenerado, puede estar pre-definida
    fecha: {type: Date}, // puede ser autogenerado, puede estar pre-definida
    nivelDescripcion: {type: String, enum: ['Colección', 'Grupo', 'Subgrupo', 'Serie', 'Subserie', 'Unidad compuesta'], default: 'Grupo'},
    volumenSoporte: {type: String, trim: true}, // puede ser autogenerada
    entidadProductora: {type: String, trim: true}, // solo a nivel de grupo (proyecto)
    investigacion: {type: String, trim: true}, // solo a nivel de grupo (proyecto)
    coordinacionProyecto: {type: String, trim: true}, // solo a nivel de grupo (proyecto)
    coordinacionProduccionAudiovisual: {type: String, trim: true}, // solo a nivel de grupo (proyecto)
  },
  contexto: {
    semblanzaBiografica: {type: String, trim: true},
  },
  contenidoEstructura: {
    alcanceContenido: {type: String, trim: true},
    valoracionSeleccionEliminacion: {type: String, trim: true},
    nuevosIngresos: {type: String, trim: true}, // puede estar pre-definida
    organizacion: {type: String, trim: true}, // puede estar pre-definida
  },
  accesoUso: {
    condicionesAcceso: {type: String, enum: ['Usos reservados para consulta in situ', 'Usos no lucrativos', 'Usos lucrativos'], default: 'Usos reservados para consulta in situ'},
    condicionesReproduccion: {type: String, trim: true}
  },
  notas: {
    notas: {type: String, trim: true},
  },
  controlDescripcion: {
    documentalistas: [{type: String, trim: true}],
    // fechaDescripcion: createdAt
    // fechaActualizacion: updatedAt
  },
  adicional: {
    imagen: {type: String},
    isPublic: {type: Boolean, default: true},
    user: [{type: ObjectId, ref: 'user'}],
    coleccion: {type: ObjectId, ref: 'coleccionVideo'},
    grupo: {type: ObjectId, ref: 'grupoVideo'},
  }
},{
  collection: 'grupoDocumentalVideo',
  timestamps: true, //timestamps: {createdAt: 'creacion', updatedAt: 'actualizacion'}
  // toObject: {virtuals: true},
  // toJSON: {virtuals: true}
});

export default mongoose.model('grupoVideo', grupoSchema);