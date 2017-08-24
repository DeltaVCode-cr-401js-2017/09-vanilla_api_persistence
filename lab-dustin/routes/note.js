'use strict';
const response = require('../lib/response');
const uuid = require('uuid');

exports.noteRoutes = function(router){
  router.get('/', function(req,res){

    response.sendText(res,200,'routed');

  });

  const storage = {};

  router.post('/note',(req,res) => {
    let note = Object.assign({
      id: uuid.v1(),
    },req.body);
    storage[note.id] = note;
    console.log('note ',note);

    response.sendJSON(res,200,note);
  });

  router.get('/note',(req,res) => {
    console.log(req.url.query.id);
    var note = storage[req.url.query.id];

    if (!req.url.query.id){
      console.log(req.url.query.id);

      return response.sendText(res,400,'Bad Request');
    }
    if (!storage[req.url.query.id]){
      console.log(`Note ${req.url.query.id} does not exist.`);

      return response.sendText(res,404,'Not Found');
    }
    if(note) return response.sendJSON(res,200,note);

  });

};
