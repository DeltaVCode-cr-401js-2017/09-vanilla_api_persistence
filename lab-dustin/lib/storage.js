'use strict';

const path = require('path');
const fs = require('fs');

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  if (!schemaName) return Promise.reject(new Error('expected schemaName'));
  if (!item) return Promise.reject(new Error('expected item'));

  const filePath = `${__dirname}/../data/${schemaName}/${item.id}.json`;
  ensureDirectoryExists(filePath);

  return writeFileAsync(filePath,JSON.stringify(item))
    .then(() => item);
};

function ensureDirectoryExists(filePath){
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)){
    return true;
  }
  ensureDirectoryExists(dirname);
  fs.mkdirSync(dirname);
}

exports.fetchItem = function(schemaName, id) {
  if (!schemaName) return Promise.reject(new Error('expected schema name'));
  if (!id) return Promise.reject(new Error('expected id'));

  const filePath = `${__dirname}/../data/${schemaName}/${id}.json`;
  if (!fs.existsSync(path.dirname(filePath))){
    return Promise.reject(new Error('schema not found'));
  }

  return readFileAsync(filePath)
    .then(data => {
      return JSON.parse(data.toString());
    });
};

function promisify(func){
  return (...args) => {
    return new Promise((resolve,reject) => {
      func(...args,
        (err,data) => {
          if (err) return reject(err);
          resolve(data);
        });
    });
  };
}
