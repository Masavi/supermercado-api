const mongoose = require('mongoose');

/*
    1) Crear una base de datos para un supermercado que pueda 
    almacenar lo siguiente:
    
    - Artículo
        -Nombre (string)
        -Precio (number)
        -Existencias (number)

*/

// Schemas
const ObjectId = mongoose.Schema.Types.ObjectId;

const ArticuloSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    existencias: {
        type: Number,
        default: 50,
    }
},{
  timestamps: true,
});

const Articulo = mongoose.model('Articulo', ArticuloSchema);

module.exports = Articulo;