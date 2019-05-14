    
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


 

  describe('404 Route', () => {
    const expectedResponse = {message: 'Not Found', error: {status: 404}};
    it('Test 404 route payload', async () => {
      const result = await chai.request(app).get('/404api');
      expect(result.body).to.be.deep.equal(expectedResponse);
      expect(result.status).to.be.equal(404);
    });
  });
  