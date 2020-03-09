const mongoose = require('mongoose');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

const Recipe = require("../server/models/Recipe");

chai.use(chaiHttp);


describe('/GET book', () => {
  it('it should GET all the recipes', (done) => {
    chai.request(server)
        .get('/recipes/list')
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
          done();
        });
  });
});