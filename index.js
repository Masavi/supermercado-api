require('./database/mongoClient');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

const Articulo = require('./models/Articulo');

// CRUD Articulos
app.post('/api/v1/articulos', (req, res) => {
  Articulo.create(req.body)
    .then(articulo => res.status(201).json(articulo))
    .catch(err => res.status(400).json(err));
});

app.get('/api/v1/articulos', (req, res) => {
  Articulo.find()
    .then(articulos => {
      if (articulos.length === 0) res.status(200).json({ mensaje: 'No hay articulos' });
      res.status(200).json(articulos);
    })
    .catch(err => res.status(400).json(err));
});

app.get('/api/v1/articulos/:id', (req, res) => {
  Articulo.findById(req.params.id)
    .then(articulo => res.status(200).json(articulo))
    .catch(err => res.status(404).json(err));
});

app.patch('/api/v1/articulos/:id', (req, res) => {
  Articulo.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(articulo => res.status(200).json(articulo))
    .catch(err => res.status(404).json(err));
});

app.delete('/api/v1/articulos/:id', (req, res) => {
  Articulo.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).json())
    .catch(err => res.status(404).json(err));
});

// CRUD Tickets

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));