'use strict';

const supertest = require('supertest');
const app = require('../server');

describe('/GET', function () {
  it('should return a 200 status code', function (done) {
    supertest(app)
      .get('/buzzwords')
      .expect(200, done);
  });
  it('Content type should respond with JSON', function (done) {
    supertest(app)
      .get('/buzzwords')
      .expect('Content-Type', /json/, done);
  });
});

describe('/POST', function () {
  it('should return a 200 status code', function (done) {
    supertest(app)
      .post('/buzzword')
      .send({"buzzword":"meme", "points":15})
      .expect({'success': true})
      .expect(200, done);
  });
  it('should return a status code 400 if the request cannot be filled due to bad syntax', function(done){
    supertest(app)
      .post('/buzzword')
      .send({"buzzward":"shootz", "pints": 2})
      .expect(400, done);
  });
  it('should return a status code 404 if the request page cannot be found', function(done){
    supertest(app)
      .post('/buzzward')
      .expect(404, done);
  });
  it('should respond with a success-true or false', function (done) {
    supertest(app)
      .post('/buzzword')
      .send({"buzzword":"meme", "points":15})
      .expect({'success': true}, done);
  });
});

describe('/PUT', function () {
  it('should return a 200 status code', function (done) {
    supertest(app)
      .put('/buzzword')
      .expect(200, done);
  });
  it('should return a status code 404 if the request page cannot be found', function(done){
    supertest(app)
      .put('/buzzward')
      .expect(404, done);
  });
  it('should respond with success: true/false and newScore: Number', function (done) {
    supertest(app)
      // .post('/buzzword')
      // .send({"buzzword":"meme", "points":15})
      .put('/buzzword')
      .send({ "buzzword": "meme", "heard": true })
      .expect({ "success": true, "newScore": 15 }, done);
  });
});


describe('/DELETE', function () {
  it('should return a 200 status code', function (done) {
    supertest(app)
      .delete('/buzzword')
      .expect(200, done);
  });
});