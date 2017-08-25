'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;

const Router = require('./lib/router');
const router = new Router();

const { noteRoutes } = require('./routes/note');

noteRoutes(router);

const server = http.createServer(router.route());

if (!module.parent){
  server.listen(PORT, function(){
    console.log(`Listening to port ${PORT}`);
  });
}
//commit to open the branch!
module.exports = server;
