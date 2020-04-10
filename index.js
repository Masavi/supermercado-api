require('./database/mongoClient');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

app.use('/api/v1');
app.use(require('./router/TicketRoutes'));
app.use(require('./router/ArticuloRoutes'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));