'use strict';
const fs = require('fs');
const path = require('path');

module.exports = exports = {};

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

exports.createItem = function(schemaName, item) {
  if (!schemaName) return Promise.reject(new Error('expected schemaName'));
  if (!item) return Promise.reject(new Error('expected item'));

  const filepath =`${__dirname}/../data//${schemaName}/${item.id}.json`;

  ensureDirectoryExistence(filepath);
  fs.writeFileSync(
    filepath,
    JSON.stringify(item));

  return Promise.resolve(item);
};



exports.deleteItem = function(schemaName, id){
  return new Promise((resolve, reject) => {
    if (!schemaName) return reject(new Error('expected schema name'));
    if (!id) return reject(new Error('expected id'));

    var schema = storage[schemaName];
    if (!schema) return reject(new Error('schema not found'));

    var item = schema[id];
    if (!item) return reject(new Error('item not found'));

    delete storage[schemaName][id];

    resolve('Deleted');
  });
};

exports.fetchItem = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    if (!schemaName) return reject(new Error('expected schema name'));
    if (!id) return reject(new Error('expected id'));

    const filepath =`${__dirname}/../data//${schemaName}/${id}.json`;
    if (!fs.existsSync(path.dirname(filepath)))
      return reject(new Error('schema not found'));

    var data = fs.readFileSync(filepath);
    var item = JSON.parse(data.toString());

    resolve(item);

    resolve(item);
  });
};
