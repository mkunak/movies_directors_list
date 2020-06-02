const { Schema, model } = require('mongoose');

const director = new Schema({
  name: String,
  age: Number,
});

module.exports = model('Director', director);