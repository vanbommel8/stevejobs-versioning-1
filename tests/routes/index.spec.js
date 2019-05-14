    
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


  describe('404 Route', () => {
    const expectedResponse = {message: 'Not Found', error: {status: 404}};
    it('Test 404 route payload', async () => {
      const result = await chai.request(app).get('/404api');
      expect(result.body).to.be.deep.equal(expectedResponse);
      expect(result.status).to.be.equal(404);
    });
  });
