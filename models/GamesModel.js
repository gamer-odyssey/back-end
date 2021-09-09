'use strict'

const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: {type: String, required: true},
  releaseDate: {type: String, required: true},
  email: {type: String, required: true},
  note: {type: String, requred: false},
  cover: {type: String, required: false},
  summary: {type: String, required: false},
  platforms: {type: Object , required: false},
  screenshots: {type: Object , required: false}
})

const GameModel = mongoose.model('game', gameSchema);

module.exports = GameModel
