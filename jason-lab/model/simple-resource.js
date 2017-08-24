'use strict';

const uuidv4 = require('uuid/v4');

const DeadCharacter = module.exports = function(name, dead){
  if(!name) throw new Error('expected name');
  if(!dead) throw new Error('expected dead');
  this.name = name;
  this.dead = dead;
  this.id = uuidv4();
};
