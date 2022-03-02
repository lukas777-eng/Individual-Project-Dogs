/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);

const dog = {
  name: 'Golden',
  height: 15,
  weight: 15,
  life_span: 15,
  image: 'https://'
};

describe('Dog routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));


  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));

  describe('GET /dogs', () => {
    it('should get 200', () => {
       agent.get('/dogs').expect(200)
  });
});

  describe('GET /dogs/:id O /dogs?name=name con params y querys',()=>{
    it('should get status 200 if found id', ()=>{
         agent.get('/dogs/1').expect(200)
    })
    it('should get status 200 if found name', ()=>{
         agent.get('/dogs?name=name').expect(200)
    })
    it('should get status 400 if found params', ()=>{
         agent.get('/dogs/gg').expect(400)
    })
})


describe('GET /temperament',()=>{
  it('should get status 200 ', ()=>{
       agent.get('/temperament').expect(200)
  })
})

describe('POST /dog', ()=>{
  it('should save new dog and response json', ()=>{
      agent.post('/dog').send({name: 'Bulldog', height: 33, weight:15, life_span: 10, temperament : ['Active']}).then(
         () => {expect("Content-Type",/json/)})
  })
})

});
