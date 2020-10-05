const { User } = require('../../../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { expect } = require('chai');

describe('user.generateAuthToken', () => {
    it('should return a valid JWT', () => {
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin: true
        };
    
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        expect(decoded).to.have.property('_id').equal(payload._id);
        expect(decoded).to.have.property('isAdmin').equal(payload.isAdmin); 
    });
});