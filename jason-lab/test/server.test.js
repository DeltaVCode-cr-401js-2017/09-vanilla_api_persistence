const { expect } = require('chai');
const app = require('../server');
const request = require('supertest')(app);


describe('ROUTES', function (){
  it('should return routed', function (done){
    request.get('/')
      .expect(200)
      .expect('routed')
      .expect('content-type', 'text/plain')
      .end(done);
  });
  it('should return Not Found', function (done){
    request.get('/404')
      .expect(404)
      .expect('Not Found')
      .expect('content-type', 'text/plain')
      .end(done);
  });
});

describe('All /api/dead', function() {
  var character = null;
  describe('POST /api/dead', function() {
    it('should save body', function (done) {
      request.post('/api/dead')
        .send({ name: 'Robert Baratheon', dead: 'yes' })
        .expect(200)
        .expect(res => {
          expect(res.body.name).to.equal('Robert Baratheon');
          expect(res.body.dead).to.equal('yes');
          expect(res.body.id).to.not.be.empty;
          character = res.body;
        })
        .end(done);
    });
  });
  describe('DELETE /api/dead', function() {
    it('should delete a thing', function (done){
      request.delete(`/api/dead?id=${character.id}`)
      .expect(res =>{
        expect(res.status).to.equal(204);
      })
      .end(done);
    });
  });
});
