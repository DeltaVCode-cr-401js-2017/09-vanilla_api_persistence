'use strict';

const storage = require('../lib/storage.js');
const DeadCharacter = require('../model/simple-resource.js');
const Router = require('../lib/router.js');
const router = new Router();



exports.allRoutes = function (router){
  router.get('/', (req, res) =>{
    res.writeHead(200, {
      'Content-Type':'text/plain'
    });
    res.write('routed');
    res.end();
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
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        });
        res.write('person not found');
        res.end();
      });
      return;
    }
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    res.write('Bad Request');
    res.end();
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
      res.writeHead(400, {
        'Content-Type': 'plain/text'
      });
      res.write('bad request');
      res.end();
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
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        });
        res.write('item not found');
        res.end();
      });
      return;
    }
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    res.write('Bad Request');
    res.end();
  });
};
router.get('/', (req, res) =>{
  res.writeHead(200, {
    'Content-Type':'text/plain'
  });
  res.write('routed');
  res.end();
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
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('person not found');
      res.end();
    });
    return;
  }
  res.writeHead(400, {
    'Content-Type': 'text/plain'
  });
  res.write('Bad Request');
  res.end();
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
    res.writeHead(400, {
      'Content-Type': 'plain/text'
    });
    res.write('bad request');
    res.end();
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
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('item not found');
      res.end();
    });
    return;
  }
  res.writeHead(400, {
    'Content-Type': 'text/plain'
  });
  res.write('Bad Request');
  res.end();
});
