require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');
const Client = require('../models/Client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let token;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany();
    await Client.deleteMany();

    const password = await bcrypt.hash('admin123', 10);
    const admin = await User.create({ email: 'admin@test.com', password, role: 'admin' });

    token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('POST /api/clients', () => {
    it('creates a client', async () => {
        const res = await request(app)
            .post('/api/clients')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Client X', email: 'x@test.com' });

        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe('Client X');
    });
});
