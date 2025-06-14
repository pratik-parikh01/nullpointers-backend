const express = require('express');
const router = express.Router();
const { getAllProjects } = require('../controllers/projects.controller');

// POST /api/projects - Add a new project
router.get('/', getAllProjects);

module.exports = router;