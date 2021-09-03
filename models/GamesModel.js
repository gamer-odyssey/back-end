'use strict'

const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: {type: String, required: true},
  releaseDate: {type: String, required: true},
  email: {type: String, required: true},
  note: {type: String, requred: false},
})

const GameModel = mongoose.model('game', gameSchema);

module.exports = GameModel
