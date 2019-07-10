const mongoose = require('mongoose');

/*
    - Ticket
        -subtotal (number)
        -IVA (number)
        -total (number)
        -articulos (articulo)
    
    2) Crear una API que permita realizar las operaciones      
       elementales CRUD sobre artículos y ticket.
*/

// const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;

const TicketSchema = new mongoose.Schema({
    subtotal: {
        type: Number,
        default: 0,
    },
    iva: {
        type: Number,
        default: 0,
    },
    total: {
        type: Number,
        default: 0,
    },
    articulos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Articulo',
        required: true,
    }],
});

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;