// Database
const mongoose = require('mongoose');

const DB_URI = "mongodb+srv://admin:abc123def@testing-cluster-efwi5.mongodb.net/supermercado?retryWrites=true";

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then( () => console.log("-Succesful connection to database-"))
        .catch( err => console.log(err) );