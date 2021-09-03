'use strict'

const GameModel = require('../models/GamesModel.js');

function GameList(req,res) {
  try {
    GameModel.find((err, gamesdb) => {
      res.status(200).send(gamesdb)
    })
  } catch (err) {
    res.status(500).send(`The Database encountered and error: ${err}`);
  }
}

module.exports = GameList
