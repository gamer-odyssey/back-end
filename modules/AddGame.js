'use strict'

const GameModel = require('../models/GamesModel.js');

async function AddGame(obj) {
  let newGame = new GameModel(obj);
  return await newGame.save();
}

module.exports = AddGame;
