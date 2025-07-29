const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    const project = await Project.create(req.body);
    res.status(201).json(project);
};

exports.getProjects = async (req, res) => {
    const projects = await Project.find().populate('clientId');
    res.json(projects);
};

exports.updateProject = async (req, res) => {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
};

exports.deleteProject = async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
};

exports.getByClient = async (req, res) => {
    const projects = await Project.find({ clientId: req.params.clientId });
    res.json(projects);
};