'use strict';


exports.sendText = function (res, status, message){
  res.writeHead(status, {
    'Content-Type':'text/plain'
  });
  res.write(message);
  res.end();
};
exports.sendJSON = function (res, status, object){
  res.writeHead(status, {
    'Content-Type': 'application/json'
  });
  res.write(JSON.stringify(object));
  res.end();
};
