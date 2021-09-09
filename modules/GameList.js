'use strict'

const jwt = require('jsonwebtoken');
const getKey = require('./getKey.js');
const GameModel = require('../models/GamesModel.js');

function GameList(req, res) {
  const token = req.headers.authorization.split(' ')[1];

  try {

    jwt.verify(token, getKey, {}, function (err, user) {
      if (err) {
        response.status(500).send('invalid token');
      }

      let email = req.query.email;
      if (email === user.email) {

        GameModel.find({ email }, (err, gamesdb) => {
          res.status(200).send(gamesdb);          
        })
      } else {
        response.send('authorization failed');
      }

    });
  }
  catch (err) {
    res.status(500).send(`The Database encountered and error: ${err}`);
  }
}

module.exports = GameList;
