//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();


chai.use(chaiHttp);

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