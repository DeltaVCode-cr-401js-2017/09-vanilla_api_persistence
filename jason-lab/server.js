'use-strict';

const http = require('http');
const PORT = process.env.port || 3000;
const Router = require('./lib/router.js');
const router = new Router();
const { allRoutes } = require('./routes/dead.js');



allRoutes(router);

const server = http.createServer(router.route());

if (!module.parent){
  server.listen(PORT, () =>{
    console.log(`HTTP listening on ${PORT}`);
  });
}

module.exports = server;
