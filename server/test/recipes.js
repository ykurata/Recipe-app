//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const expect = require('chai').expect;
const request = require('supertest');


chai.use(chaiHttp);

//Set up the data to login
const userCredentials = {
  email: 'yasuko@gmail.com', 
  password: 'testpassword'
}

//Login the user before running any tests
const authenticatedUser = request.agent(server);

before((done) => {
  authenticatedUser
    .post('/users/login')
    .send(userCredentials)
    .end((err, response) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
});


// Parent Block
describe("Recipe", () => {
  beforeEach((done) => {
    Recipe.remove({}, (err) => {
      done();
    });
  });  

  describe("/GET recipes", () => {
    it("should GET all the recipes", (done) => {
      chai.request(server)
        .get("/recipes/list")
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
          done();  
        });
    });
  });

});