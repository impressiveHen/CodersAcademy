const expect = require('chai').expect;
const server = require("../../../index");
const mongoose = require('mongoose');
const dbConnect = require('../../helper/dbConnect');
const request = require('supertest')(server);

describe('Users APIs', () => {
    // Runs before the first test case of the describe block it is placed in
    // eslint-disable-next-line no-undef
    before((done) => {
        dbConnect
            .connect()
            .once('open', () => {
                mongoose.connection.dropDatabase();
                done();
            })
            .on('error',(error) => done(error));
    });

    it('should create a new user', (done) => {
        request
            .post('/users/signup')
            .set('Accept', 'application/json')
            .send({
                'name': 'henry',
                'email': 'henry@gmail.com',
                'password': '12345'
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(201);
            });
            done();
    });
});