const { Schema, model } = require('mongoose');

const movie = new Schema({
  name: String,
  genre: String,
  directorId: Schema.Types.ObjectId,
  rate: Number,
  watched: Boolean,
});

module.exports = model('Movie', movie);
