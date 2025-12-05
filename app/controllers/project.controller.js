// app/controllers/project.controller.js
const Project = require('../models/project.model');

// GET /api/projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error('getAllProjects error:', err);
    res.status(500).json({ message: 'Server error while fetching projects.' });
  }
};

// GET /api/projects/:id
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    res.json(project);
  } catch (err) {
    console.error('getProjectById error:', err);
    res.status(500).json({ message: 'Server error while fetching project.' });
  }
};

// POST /api/projects   (protected)
exports.createProject = async (req, res) => {
  try {
    // req.body should contain title, description, etc.
    const project = await Project.create(req.body);

    res.status(201).json({
      message: 'Project created',
      project,
    });
  } catch (err) {
    console.error('createProject error:', err);
    res.status(500).json({ message: 'Server error while creating project.' });
  }
};

// PUT /api/projects/:id   (protected)
exports.updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    const updated = await Project.findByIdAndUpdate(
      projectId,
      req.body,                    // fields to update (title, description, etc.)
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    res.json({
      message: 'Project updated',
      project: updated,
    });
  } catch (err) {
    console.error('updateProject error:', err);
    res.status(500).json({ message: 'Server error while updating project.' });
  }
};

// DELETE /api/projects/:id   (protected)
exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    const deleted = await Project.findByIdAndDelete(projectId);

    if (!deleted) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    res.json({ message: 'Project deleted successfully.' });
  } catch (err) {
    console.error('deleteProject error:', err);
    res.status(500).json({ message: 'Server error while deleting project.' });
  }
};
