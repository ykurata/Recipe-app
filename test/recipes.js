const mongoose = require('mongoose');

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app');

chai.use(chaiHttp);

mongoose.connect("mongodb://localhost:27017/recipe-api"); 
mongoose.connection
  .once('open', () => console.log('Connected!'))
  .on('error', (error) => {
      console.warn('Error : ',error);
});

after("Disconnect database", (done) => {
    mongoose.connection.close().then(() => done()).catch(done);
});

describe('Recipes', () => {
  let token;
  before((done) => {
    chai.request(server)
      .post('/users/login')
      .send({
        email: "yasuko@gmail.com",
        password: 'testpassword'
      })
      .end((err, res) => {
        if (err) throw err;
        token = res.body.token;
        done();
      });
  });

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