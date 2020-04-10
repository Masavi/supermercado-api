var express = require('express');
var router = express.Router();

const Ticket = require('../models/Ticket');

// CRUD Tickets
router.post('/tickets', (req, res) => {
  if (!req.body.articulos || req.body.articulos.length === 0) {
    res.status(400).json({ mensaje: "Debes incluir al menos un articulo" })
  }
  Ticket.create(req.body)
    .then(ticket => res.status(201).json(ticket))
    .catch(err => res.status(400).json(err));
});

router.get('/tickets', (req, res) => {
  Ticket.find()
    .populate('articulos')
    .then(tickets => {
      if (tickets.length === 0) res.status(200).json({ mensaje: 'No hay tickets' });
      res.status(200).json(tickets);
    })
    .catch(err => res.status(400).json(err));
});

router.get('/tickets/:id', (req, res) => {
  Ticket.findById(req.params.id)
    .populate('articulos')
    .then(ticket => res.status(200).json(ticket))
    .catch(err => res.status(404).json(err));
});

router.patch('/tickets/:id', (req, res) => {
  Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(ticket => res.status(200).json(ticket))
    .catch(err => res.status(404).json(err));
});

router.delete('/tickets/:id', (req, res) => {
  Ticket.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).json())
    .catch(err => res.status(404).json(err));
});

// Calcular total, iva y subtotal
router.get('/tickets/:id/pagar', async (req, res) => {
  const ticket = await Ticket.findById(req.params.id).populate('articulos');
  const { articulos } = ticket;
  let subtotal = 0;
  articulos.forEach(articulo => {
    subtotal += articulo.precio;
  });
  const iva = (subtotal * 0.16);
  const total = subtotal + iva;
  console.log('🚀', subtotal, iva, total);
  Ticket.findByIdAndUpdate(req.params.id, { subtotal, iva, total }, { new: true })
    .populate('articulos')
    .then( ticketActualizado => res.status(200).json(ticketActualizado) )
    .catch( err => res.status(400).json({ err }) );
});

module.exports = router;
