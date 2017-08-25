'use strict';

const storage = require('../model/storage.js');
const response = require('../lib/response');


exports.noteRoutes = function(router){
  router.get('/', function(req,res){
    console.log(req.method, req.url.href);
    console.log('body', req.body);
    response.sendText(res, 200, 'routed');
  });
  const uuid = require('uuid');
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
        response.sendJSON(res,200,item);
      })
      .catch(err => {
        response.sendText(res, 400, `Bad Request : ${err}`);
      });
  });

  router.get('/note', (req, res) =>{
    console.log(req.url.pathname, req.url.query.id);
    storage.fetchItem(req.url.pathname, req.url.query.id)
      .then((item) => {
        response.sendJSON(res,200,item);
      })
      .catch(err =>{
        console.log(err);
        response.sendText(res, 400, `Bad Request : ${err}`);
      });
  });

  router.delete('/note', (req, res) =>{
    storage.removeItem(req.url.pathname, req.url.query.id)
      .then(() => {
        response.sendText(res, 204);
      })
      .catch(err =>{
        response.sendText(res, 400, `Bad Request : ${err}`);
      });
  });
};
