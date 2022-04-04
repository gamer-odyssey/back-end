'use strict';

const jwt = require('jsonwebtoken');
const getKey = require('./getKey.js');
const GameModel = require('../models/GamesModel.js');

function AddToGameList (req,res) {
  // const token = request.headers.authorization.split(' ')[1];
  
  try {
    let {title, releaseDate, email, note, cover, summary, platforms, screenshots} = req.body;
    // console.log(req.body)
    let game = {title, releaseDate, email, note, cover, summary, platforms, screenshots};
    let newGame = new GameModel(game);
    newGame.save();
    res.send(newGame);
    // console.log(newGame);
  } catch (err) {
    res.status(500).send('Something went wrong adding your Game. Please try again');
    console.log(err.message);
  }
};

module.exports = AddToGameList;
