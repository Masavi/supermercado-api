const express = require('express');
const router = express.Router();

const TicketRoutes = require('./TicketRoutes');
const ArticuloRoutes = require('./ArticuloRoutes');

router.use(TicketRoutes);
router.use(ArticuloRoutes);

module.exports = router;