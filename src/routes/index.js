const express = require('express');
const router = express.Router();

const vulnerabilityRoutes = require('./vulnerability.routes');

// Register all routes here
router.use('/reports', vulnerabilityRoutes);

module.exports = router;