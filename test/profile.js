const mongoose = require('mongoose');

const chai = require('chai');
const should = chai.should();
const faker = require('faker');
const jwt_decode = require("jwt-decode");
const chaiHttp = require('chai-http');
const server = require('../app');


chai.use(chaiHttp);

//tell mongoose to use es6 implementation of promises
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/recipe-api"); 
mongoose.connection
  .once('open', () => console.log('Connected!'))
  .on('error', (error) => {
      console.warn('Error : ',error);
});

after("Disconnect database", (done) => {
    mongoose.connection.close().then(() => done()).catch(done);
});

describe('Profiles', () => {
  let token;
  let userId;
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
        const decode = jwt_decode(token);
        userId = decode.id; 
        done();
      });
  });

  it('it should GET all the profiles', (done) => {
    chai.request(server)
        .get('/profile/all')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
          done();
        });
  });

  it("should update a profile" ,(done) => {
    chai.request(server)
      .put(`/profile/update/${userId}`)
      .set({ Authorization: `Bearer ${token}` })
      .send({ 
        description: "this is test"
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done()
      });
  });
});

describe('/POST a profile', () => {
  let newToken;
  let newUserId;
  before((done) => {
    chai.request(server)
    .post("/users/register")
    .send({ 
      email: faker.internet.email(), 
      name: faker.name.findName(), 
      password: faker.internet.password() 
    })
    .end((err, res) => {
      newToken = res.body.token;
      const decode = jwt_decode(newToken);
      newUserId = decode.id;
      done();
  });

  it("should POST a profile", (done) => {
    chai.request(server)
        .post(`/profile/${newUserId}`)
        .set({ Authorization: `Bearer ${newToken}` })
        .send({
          description: "test"
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });  
});