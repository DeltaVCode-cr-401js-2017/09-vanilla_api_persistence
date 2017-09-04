'use strict';

const parseUrl = require('./parse-url.js');
const parseJSON = require('./parse-json.js');

const Router = module.exports = function(){
  this.routes = {
    GET:{},
    POST:{},
    PUT:{},
    DELETE:{}
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

  return (req, res) => {
    Promise.all([
      parseUrl(req),
      parseJSON(req),
    ]).then(() =>{

      let methodRoutes = this.routes[req.method];
      if (!methodRoutes) throw new Error(`${req.method} doesn't exist`);

      let pathCallback = methodRoutes[req.url.pathname];
      if (typeof pathCallback === 'function'){
        return pathCallback(req, res);
      }

      res.writeHead(404, {'Content-Type':'text/plain'});
      res.write('Not Found');
      res.end();
    }).catch(err =>{
      res.writeHead(404, {'Content-Type':'text/plain'});
      res.write(err.message);
      res.end();
    });

  };
};
