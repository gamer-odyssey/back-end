'use strict'

const GameModel = require('../models/GamesModel.js');

async function clearData(req, res) {
  try{
    await GameModel.deleteMany({})
    res.status(200).send('DataBase is now empty add a new game please we are desperate for you to try this.')
  }
  catch(err){
    res.status(500).send('DataBase could not be cleared try again');
  }
  console.log("DB Cleared")
}

module.exports = clearData;
