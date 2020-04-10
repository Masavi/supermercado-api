require('dotenv').config()
require('./database/mongoClient');
const express = require('express');
const app = express();
const path = require('path'); 
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

// viewed at http://localhost:8080
app.get('/docs', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/api/v1', require('./router'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));