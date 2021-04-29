import Coleccion from '../model/coleccion-model.js';
import moment from 'moment';
import * as auth from '../../services/auth-service';

export function index(req, res){
  // Find all collections
  Coleccion.find({}, (error, colecciones) => {
    if(error){
      return res.status(500).json();
    }
    return res.status(200).json({colecciones: colecciones});
  })
  .sort({createdAt: -1});
}

export function create(req, res){
  // Create a collection
  const id = auth.getUserId(req);
  Coleccion.findOne({_id: id}, (error, user) => {
    if(error && !user){
      return res.status(500).json();
    }
    const coleccion = new Coleccion(req.body.coleccion);
    coleccion.author = user._id;

    coleccion.save(error => {
      if(error){
        return res.status(500).json();
      }
      return res.status(201).json({id: coleccion._id});
    });
  });
}

export function update(req, res){
  // Update a collection
  const id = auth.getUserId(req);

  User.findOne({_id: id}, (error, user) => {
    if(error){
      return res.status(500).json();
    }
    if(!user){
      return res.status(404).json();
    }

    const coleccion = new Coleccion(req.body.coleccion);
    coleccion.author = user._id;
    Coleccion.findByIdAndUpdate({_id: coleccion._id}, coleccion, error => {
      if(error){
        return res.status(500).json();
      }
      return res.status(204).json();
    });
  });
}

export function remove(req, res){
  // Delete a collection
  const id = auth.getUserId(req);
  Coleccion.findOne({_id: req.params.id}, (error, coleccion) => {
    if(error){
      return res.status(500).json();
    }
    if(!coleccion){
      return res.status(404).json();
    }
    if(coleccion.author._id.toString() !== id){
      return res.status(403).json({message: 'Not allowed to delete another user\'s collection'});
    }
    Coleccion.deleteOne({_id: req.params.id}, error => {
      if(error){
        return res.status(500).json();
      }
      return res.status(204).json();
    });
  });
}

export function show(req, res){
  // Get collection from id
  Coleccion.findOne({_id: req.params.id}, (error, coleccion) => {
    if(error){
      return res.status(500).json();
    }
    if(!coleccion){
      return res.status(400).json();
    }
    return res.status(200).json({coleccion: coleccion});
  })
}
