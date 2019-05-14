    
const app = require('../../app');
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
 

  describe('404 Route', () => {
    const expectedResponse = {message: 'Not Found', error: {status: 404}};
    it('Test 404 route payload', async () => {
      const result = await chai.request(app).get('/404api');
      expect(result.body).to.be.deep.equal(expectedResponse);
      expect(result.status).to.be.equal(404);
    });
  });

  it('test per cercare un utente tramite id: ', function (done) {
    let user = new User ({
        name: "Giuseppe",
        surname: "Privitera",
        email: "giuseppeprivitera@libero.it",
        dateOfBirth: "10-05-2000",
        gender: "Maschio"
    });
    user.save(function (err, user) {
        chai.request(app)
        .get('/users/' + user.id)
        .end(function (err, res) {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body._id).to.equal(user.id);
            done();
        });
    });
});

it("test per eliminare un utente ", function (done) {

  const response = { message: 'Utente eliminato correttamente' };

  let user = new User ({
      name: "Giuseppe",
      surname: "Privitera",
      email: "giuseppe.privitera@gmail.com",
      dateOfBirth: "27-10-2000",
      gender: "Maschio"
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
it('test per cercare un utente tramite nome: ', function (done) {
  let user = new User ({
      name: "Angelo",
      surname: "Corsaro",
      email: "angelo@libero.it",
      dateOfBirth: "20-05-2001",
      gender: "M"
  });
  user.save(function (err, user) {
      chai.request(app)
      .get('/users/' + user.id)
      .end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body._id).to.equal(user.name);
          done();
      });
  });
});
