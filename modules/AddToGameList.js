'use strict'
const GameModel = require('../models/GamesModel.js');

function AddToGameList (req,res) {

  console.log(req.body);


  try {
    let {title, releaseDate, email, note} = req.body;
    let game = {title, releaseDate, email, note};
    let newGame = new GameModel(game);
    newGame.save();
    res.send(newGame);
  } catch (err) {
    res.status(500).send('Something went wrong adding your Game. Please try again');
    console.log(err.message);
  }
};

module.exports = AddToGameList;
