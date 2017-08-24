'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;
const uuid = require('uuid');

const Router = require('./lib/router');
const router = new Router();
const storage = require('./model/storage.js');

router.get('/', function(req,res){
  console.log(req.method, req.url.href);
  console.log('body', req.body);
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.write('routed');
  res.end();
});

router.post('/note', (req,res) =>{
  var note;
  if(req.body){
    note = Object.assign ({
      id: uuid.v1(),
    }, req.body);
  }
  storage.createItem(req.url.pathname, note)
    .then((item) => {
      console.log(item);
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(item));
      res.end();
    })
    .catch(err => {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      });
      res.write(`Bad Request : ${err}`);
      res.end();
    });
});

router.get('/note', (req, res) =>{
  console.log(req.url.pathname, req.url.query.id);
  storage.fetchItem(req.url.pathname, req.url.query.id)
    .then((item) => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(item));
      res.end();
    })
    .catch(err =>{
      console.log(err);
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      });
      res.write(`Bad Request : ${err}`);
      res.end();
    });
});

router.delete('/note', (req, res) =>{
  storage.removeItem(req.url.pathname, req.url.query.id)
    .then(() => {
      res.writeHead(204, {
        'Content-Type': 'text/plain'
      });
      res.end();
    })
    .catch(err =>{
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      });
      res.write(`Bad Request : ${err}`);
      res.end();
    });
});

const server = http.createServer(router.route());



if(!module.parent){
  server.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
  });
}


module.exports = server;
