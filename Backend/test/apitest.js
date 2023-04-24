//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// let mongoose = require("mongoose");
// let Crop = require('../model/crop');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

// setting up mongodb online repo
// const dbURI = process.env.dbURI
// mongoose.connect(dbURI).catch((err)=> console.log(err))


chai.use(chaiHttp);

describe('students', () => {
  const loginDetails =  {
    email: "krishnavamshi.m20@iiits.in",
    password: "1234"
  }
  let Cookies;
  var authenticatedUser = chai.request;
  let classes_list;
  before((done) => {
    authenticatedUser(server)
            .post('/user/login')
            .send(loginDetails)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('success', true)
              Cookies = res.headers['set-cookie'].pop().split(';')[0];
              done();
            });
  })
  describe('/GET students', () => {
      it('it should GET all the students', (done) => {
        authenticatedUser(server)
            .get('/api/getStudents')
            .set('Cookie', Cookies)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              // console.log(res.body)
              done();
            });
      });
  });
  describe('/GET classes', () => {
    it('it should GET all the classes', (done) => {
      authenticatedUser(server)
          .get('/api/getClasses')
          .set('Cookie', Cookies)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            classes_list = res.body.data
            // console.log(classes_list)
            done();
          })
    })
    
    // console.log(classes_list)
    // if (classes_list !== undefined){
      it('it should GET particular class with given id', (done) => {
        // console.log(classes_list)
        authenticatedUser(server)
            .get('/api/getClass/' + classes_list[0]._id)
            .set('Cookie', Cookies)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              // console.log(res.body.data)
              done();
            })
      })
    // }
  })
  
})

describe('teachers', () => {
  const loginDetails =  {
    email: "subu.k@iiits.in",
    password: "1234"
  }
  let Cookies;
  var authenticatedUser = chai.request;
  before((done) => {
    authenticatedUser(server)
            .post('/user/login')
            .send(loginDetails)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('success', true)
              Cookies = res.headers['set-cookie'].pop().split(';')[0];
              done();
            });
  })
  describe('/GET teachers', () => {
      it('it should GET all the teachers', (done) => {
        authenticatedUser(server)
            .get('/api/getTeachers')
            .set('Cookie', Cookies)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              // console.log(res.body)
              done();
            });
      });
  });

});

describe('admins', () => {
  const loginDetails =  {
    email: "admin@iiits.in",
    password: "1234"
  }
  let Cookies;
  var authenticatedUser = chai.request;
  before((done) => {
    authenticatedUser(server)
            .post('/user/login')
            .send(loginDetails)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('success', true)
              Cookies = res.headers['set-cookie'].pop().split(';')[0];
              done();
            });
  })
  describe('/GET  admins', () => {
      it('it should GET all the admins', (done) => {
        authenticatedUser(server)
            .get('/api/getAdmins')
            .set('Cookie', Cookies)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              // console.log(res.body)
              done();
            });
      });
  });

});

