const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const auth = require('../middleware/auth'); // ✅

router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);

// protected – only logged-in user with valid token
router.post('/', auth, projectController.createProject);
router.put('/:id', auth, projectController.updateProject);
router.delete('/:id', auth, projectController.deleteProject);

module.exports = router;
