const { Schema, model } = require('mongoose');

const movie = new Schema({
  name: String,
  genre: String,
  directorId: Schema.Types.ObjectId,
});

module.exports = model('Movie', movie);
