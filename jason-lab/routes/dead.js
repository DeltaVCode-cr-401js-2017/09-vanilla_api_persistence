'use strict';

const storage = require('../lib/storage.js');
const DeadCharacter = require('../model/simple-resource.js');
const Router = require('../lib/router.js');
const router = new Router();

const response = require('../lib/response');


exports.allRoutes = function (router){
  router.get('/', (req, res) =>{
    response.sendText(res, 200, 'routed');
  });

  router.get('/api/dead', function(req, res) {
    if(req.url.query.id) {
      storage.fetchItem('character', req.url.query.id)
      .then(dead => {
        response.sendJSON(res, 200, dead);
      }).catch(err => {
        console.log(err);
        response.sendText(res, 404, 'person not found');
      });
      return;
    }
    response.sendText(res, 400, 'Bad Request');
  });

  router.post('/api/dead', function(req, res){
    try{
      var character = new DeadCharacter(req.body.name, req.body.dead);
      console.log(character);
      storage.createItem('character', character);
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(character));
      res.end();
    } catch(err) {
      console.error('server post', err);
      response.sendText(res, 400, 'bad request');
    }
  });

  router.delete('/api/dead', function(req, res) {
    if(req.url.query.id) {
      storage.deleteItem('character', req.url.query.id)
      .then(character => {
        res.writeHead(204, {
          'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(character) + 'Delete');
        res.end();
      })
      .catch(err => {
        response.sendText(res, 404, 'item not found');
        console.error(err);
      });
      return;
    }
    response.sendText(res, 400, 'Bad Request');
  });
};
router.get('/', (req, res) =>{
  response.sendText(res, 200, 'routed');
});

router.get('/api/dead', function(req, res) {
  if(req.url.query.id) {
    storage.fetchItem('character', req.url.query.id)
    .then(dead => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(dead));
      res.end();
    }).catch(err => {
      console.error(err);
      response.sendText(res, 404, 'person not found');
    });
    return;
  }
  response.sendText(res, 400, 'Bad Request');
});

router.post('/api/dead', function(req, res){
  try{
    var character = new DeadCharacter(req.body.name, req.body.dead);
    console.log(character);
    storage.createItem('character', character);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(character));
    res.end();
  } catch(err) {
    console.error('server post', err);
    response.sendText(res, 400, 'bad request');
  }
});

router.delete('/api/dead', function(req, res) {
  if(req.url.query.id) {
    storage.deleteItem('character', req.url.query.id)
    .then(character => {
      res.writeHead(204, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(character) + 'Delete');
      res.end();
    })
    .catch(err => {
      console.error(err);
      response.sendText(res, 404, 'item not found');
    });
    return;
  }
  response.sendText(res, 400, 'bad request');
});
