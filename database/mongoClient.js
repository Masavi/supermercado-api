// Database
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then( () => console.log("-Succesful connection to database-"))
        .catch( err => console.log(err) );