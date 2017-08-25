'use strict';

const parseURL = require('./parse-url');
const parseJSON = require('./parse-json');

const Router = module.exports = function(){
  this.routes = {
    GET: {}
    ,POST: {}
    ,PUT: {}
    ,DELETE: {}
  };
};

Router.prototype.get = function(path, callback){
  this.routes.GET[path] = callback;
};

Router.prototype.post = function(path, callback){
  this.routes.POST[path] = callback;
};

Router.prototype.put = function(path, callback){
  this.routes.PUT[path] = callback;
};

Router.prototype.delete = function(path, callback){
  this.routes.DELETE[path] = callback;
};


Router.prototype.route = function(){
  console.log(this.routes);

  return(req,res) =>{
    Promise.all([
      parseURL(req)
      ,parseJSON(req)
    ])
      .then(() =>{
        console.log(req.method, req.url.href);

        let methodRoutes = this.routes[req.method];
        if(!methodRoutes) throw new Error(`I don't speak ${req.method}`);
        let pathCallback = methodRoutes[req.url.pathname];
        if(typeof pathCallback === 'function') {
          return pathCallback(req,res);
        }

        console.log(pathCallback);

        res.writeHead(404, {
          'Content-Type': 'text/plain'
        });
        res.write('Not Found');
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        });
        res.write(err.message);
        res.end();
      });

  };
};
