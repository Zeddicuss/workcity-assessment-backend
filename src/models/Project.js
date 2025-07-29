const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true }
});

module.exports = mongoose.model('Project', projectSchema);