const express = require('express');
const router = express.Router();

const vulnerabilityRoutes = require('./vulnerability.routes');
const projectsRoutes = require('./projects.routes');

// Register all routes here
router.use('/reports', vulnerabilityRoutes);
router.use('/projects', projectsRoutes);

module.exports = router;