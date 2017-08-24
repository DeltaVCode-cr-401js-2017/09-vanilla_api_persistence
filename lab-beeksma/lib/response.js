'use strict';

module.exports = exports = {};

exports.sendText = function(res, status, message) {
  res.writeHead(status, {
    'Content-Type': 'text/plain'
  });
  res.write(message);
  res.end();
};
