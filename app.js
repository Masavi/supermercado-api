// API
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const PORT = process.env.PORT || 9000;

// Database & Models
require('./database/mongoClient.js');
const Articulo = require('./models/Articulo');
const Ticket = require('./models/Ticket');

// Home
app.get('/', (req, res) => {
    res.status(200).send({"message":"it's alive!!!"});
});

// Articulo
app.get('/api/articulos/', (req, res) => {
    Articulo.find()
            .exec()
            .then( articulos => {
                res.status(200).send({
                    message: "items list received succesfully",
                    items: articulos,
                });
            })
            .catch( err => {
                res.send({
                    message: "there was an error with this query",
                    db_error: err,
                });
            });
});

app.get('/api/articulos/:id', (req, res) => {
    Articulo.findById(req.params.id)
            .exec()
            .then( articulo => {
                res.status(200).send({
                    message: "item received succesfully",
                    items: articulo,
                });
            })
            .catch( err => {
                res.send({
                    message: "there was an error with this query",
                    db_error: err,
                });
            });
});

app.post('/api/articulos/', (req, res) => {
    const newItem = req.body;

    new Articulo(newItem)
        .save()
        .then( item => {
            res.status(201).send({
                message: "item created succesfully",
                item,
            });
        })
        .catch( err => {
            res.send({
                message: "there was an errror creating the item",
                err,
            })
        });
});

app.delete('/api/articulos/:id', (req, res) => {
    Articulo.findByIdAndDelete(req.params.id)
            .exec()
            .then( articulo => {
                res.status(204).send({
                    message: "item deleted succesfully",
                    items: articulo,
                });
            })
            .catch( err => {
                res.send({
                    message: "there was an error with this query",
                    db_error: err,
                });
            });
});

// Ticket
app.get('/api/tickets/', (req, res) => {
    Ticket.find()
            .populate("articulos")
            .then( tickets => {
                res.status(200).send({
                    message: "tickets list received succesfully",
                    tickets,
                });
            })
            .catch( err => {
                res.send({
                    message: "there was an error with this query",
                    db_error: err,
                });
            });
});

app.get('/api/tickets/:id/', (req, res) => {
    // Ticket.findById(req.params.id)
    Ticket.find({_id: req.params.id})
            .populate("articulos")
            .then( ticket => {
                res.status(200).send({
                    message: "ticket received succesfully",
                    ticket,
                });
            })
            .catch( err => {
                res.send({
                    message: "there was an error with this query",
                    db_error: err,
                });
            });
});

app.post('/api/tickets/', (req, res) => {
    if (req.body.articulos){
        console.log(req.body.articulos.length);
        new Ticket(req.body)
            .save()
            .then( ticket => {
                res.status(201).send({
                    message: "ticket created succesfully",
                    ticket,
                })
            })
            .catch( err  => {
                res.status(400).send({
                    message: "there was an error creating the ticket",
                    err,
                })
            })
    } else {
        res.status(400).send({message: "req.body.articulos is required"});
    }
});
/*
    Calcular Subtotal, IVA, total
    subtotal = suma de todos los costos de articulos
    iva = subtotal*.16
    total = subtotal + iva
*/
app.patch('/api/tickets/caja/:id/', (req, res) => {
    Ticket.findById(req.params.id)
          .populate('articulos')
          .then( ticket => {
            const precios = ticket.articulos.map( articulo => articulo.precio);
            const subtotal = precios.reduce( (total, num) => total + num);
            const iva = (subtotal * 0.16);
            const total = subtotal + iva;

            console.log(precios, subtotal, iva, total);

            Ticket.findOneAndUpdate({_id: ticket._id}, {subtotal, iva, total}, {new: true})
                  .populate('articulos')
                  .then( modifiedTicket => {
                    res.status(200).send(modifiedTicket);
                  });
          })
          .catch( err => {
            res.send(err);
          });
});


app.listen( PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});