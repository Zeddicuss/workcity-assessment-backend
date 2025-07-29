require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');
const Project = require('../models/Project');
const Client = require('../models/Client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let token, projectId;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany();
    await Client.deleteMany();
    await Project.deleteMany();

    const password = await bcrypt.hash('admin123', 10);
    const admin = await User.create({ email: 'admin2@test.com', password, role: 'admin' });

    token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET);

    const client = await Client.create({ name: 'Test Client', email: 'client@test.com' });

    const project = await Project.create({
        title: 'Initial Project',
        description: 'test desc',
        clientId: client._id
    });

    projectId = project._id;
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('PUT /api/projects/:id', () => {
    it('updates a project', async () => {
        const res = await request(app)
            .put(`/api/projects/${projectId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Updated Title' });

        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe('Updated Title');
    });
});
