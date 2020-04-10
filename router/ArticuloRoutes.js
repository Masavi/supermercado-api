var express = require('express');
var router = express.Router();

const Articulo = require('../models/Articulo');

// CRUD Articulos
router.post('/articulos', (req, res) => {
  Articulo.create(req.body)
    .then(articulo => res.status(201).json(articulo))
    .catch(err => res.status(400).json(err));
});

router.get('/articulos', (req, res) => {
  Articulo.find()
    .then(articulos => {
      if (articulos.length === 0) res.status(200).json({ mensaje: 'No hay articulos' });
      res.status(200).json(articulos);
    })
    .catch(err => res.status(400).json(err));
});

router.get('/api/v1/articulos/:id', (req, res) => {
  Articulo.findById(req.params.id)
    .then(articulo => res.status(200).json(articulo))
    .catch(err => res.status(404).json(err));
});

router.patch('/api/v1/articulos/:id', (req, res) => {
  Articulo.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(articulo => res.status(200).json(articulo))
    .catch(err => res.status(404).json(err));
});

router.delete('/api/v1/articulos/:id', (req, res) => {
  Articulo.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).json())
    .catch(err => res.status(404).json(err));
});

module.exports = router;