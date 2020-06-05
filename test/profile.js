const mongoose = require('mongoose');

const chai = require('chai');
const should = chai.should();
const jwt_decode = require("jwt-decode");
const chaiHttp = require('chai-http');
const server = require('../app');

chai.use(chaiHttp);

// mongoose.connect(process.env.MONGODB_URI ||"mongodb://localhost:27017/recipe-api"); 
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

  it("should GET a profile", (done) => {
    chai.request(server)
        .get(`/profile/${userId}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('description');
          done();
        });
  });  

  it("should POST a profile" ,(done) => {
    chai.request(server)
      .post(`/profile/${userId}`)
      .set({ Authorization: `Bearer ${token}` })
      .send({ 
        description: "this is test"
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('description');
        done()
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
        res.body.should.have.property('description');
        done()
      });
  });
});
