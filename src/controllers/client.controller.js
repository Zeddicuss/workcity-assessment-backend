const Client = require('../models/Client');

exports.createClient = async (req, res) => {
    const client = await Client.create(req.body);
    res.status(201).json(client);
};

exports.getClients = async (req, res) => {
    const clients = await Client.find();
    res.json(clients);
};

exports.updateClient = async (req, res) => {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(client);
};

exports.deleteClient = async (req, res) => {
    await Client.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
};