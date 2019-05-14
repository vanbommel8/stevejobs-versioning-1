    
const app = require('../../app');
const User = require('../../models/model');
const chaiHttp = require('chai-http');
const chai = require('chai');
const expect = chai.expect;

chai.use(chaiHttp);
describe('GET /', () => {
    const expectedResponse = {message: 'API Works'};
    it('Test index API payload', async () => {
      const result = await chai.request(app).get('/');
      expect(result.body).to.be.deep.equal(expectedResponse);
      expect(result.status).to.be.equal(200);
    });
  });


  describe('POST /', function () {
    it('Dovrebbe aggiungere un singolo user', function (done) {
    
        let newUser = {
            name: 'Thanos',
            surname: 'Rossi',
            email: 'thanos@gmail.com',
            dateOfBirth: '24-08-1204',
            gender: 'M'
        };

        chai.request(app)
        .post('/users')
        .send(newUser)
        .end(function (err, res) {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.a.property('name');
            expect(res.body).to.have.a.property('surname');
            expect(res.body).to.have.a.property('email');
            expect(res.body).to.have.a.property('dateOfBirth');
            expect(res.body).to.have.a.property('gender');
            expect(res.body._id).to.exist;
            done();
        });
});


});




describe('PUT /', function () {
  it('Dovrebbe aggiornare un singolo User cercato per id: PUT', function (done) {
        
    let user = new User ({
      name: 'Thanos',
      surname: 'Rossi',
      email: 'thanos@gmail.com',
      dateOfBirth: '24-08-1204',
      gender: 'M'
    });

    user.save(function (err, user) {
        chai.request(app)
        .put('/users/' + user.id)
        .end(function (err, res) {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body._id).to.equal(user.id);
            done();
        });
    });
});
})





describe('DELETE /', function () {
  it("testiamo l'eliminazione di un utente ", function (done) {

  const response = { message: 'Utente eliminato correttamente' };

  let user = new User ({
      name: "Banana",
      surname: "Joe",
      email: "bananajoeo@gmail.com",
      dateOfBirth: "22-12-2012",
      gender: "M"
  });
  user.save((err, user) => {
      chai.request(app)
      .del('/users/' + user.id)
      .end((err, res) => {
          expect(res.body).to.be.deep.equal(response);
          expect(res.status).to.equal(200);
          done();
      });
  });
});
})


describe('SEARCH /', function () {
  it('test per cercare un utente tramite id: ', function (done) {
  let user = new User ({
      name: "Steve",
      surname: "Rogers",
      email: "captainamerica@avengers.com",
      dateOfBirth: "04-07-1918",
      gender: "M"
  });
  user.save(function (err, data) {
      chai.request(app)
      .get('/users/' + data.id)
      .end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body._id).to.equal(data.id);
          done();
      });
  });
});
})

describe('NAME/SEARCH/', function () {
  it('test per cercare degli utenti tramite nome: ', function (done) {
  let user = new User ({
      name: "Antman",
      surname: "Marvel",
      email: "Antman@avengers.com",
      dateOfBirth: "04-07-1918",
      gender: "M"
  });
  user.save(function (err, user) {
      chai.request(app)
      .get('users/name/' + user.name)
      .end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('[object]');
          expect(res.body[1].name).to.equal(res.body[1].name);
          expect(res.body[2].name).to.equal(res.body[2].name);
          done();
      });
  });
});
})


  describe('404 Route', () => {
    const expectedResponse = {message: 'Not Found', error: {status: 404}};
    it('Test 404 route payload', async () => {
      const result = await chai.request(app).get('/404api');
      expect(result.body).to.be.deep.equal(expectedResponse);
      expect(result.status).to.be.equal(404);
    });
  });
