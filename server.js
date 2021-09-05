'use strict';
//-------------import/require-------------//
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');
const GameModel = require('./models/GamesModel');
const ClearGames = require('./modules/ClearGames');
const SeedGames = require('./modules/SeedGames');
app.use(express.json())
const Upcoming = require('./modules/Upcoming');
const GameList = require('./modules/GameList');
const AddToGameList = require('./modules/AddToGameList');
const PORT = process.env.PORT
const getKey = require('./modules/getKey');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb://127.0.0.1:27017/games', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async () => {
    console.log('Connected to the database')
  })
//-------------------routes---------------//
app.get('/clear', ClearGames);
app.get('/seed', SeedGames);
app.get('/coming_soon', Upcoming);
app.get('/gamelist', GameList);
app.post('/gamelist', AddToGameList);

app.delete('/gamelist/:id', (req, res) => {

  const token = req.headers.authorization.split(' ')[1];
  let id = req.params.id;
  let email = req.query.email;
  try {
    jwt.verify(token, getKey, {}, async function (err, user) {
      if (err) {
        res.status(500).send('invalid token');
      } else {
        // console.log(email, user.email);
        if (email === user.email) {
          await GameModel.findByIdAndDelete(id)
          res.status(200).send(`Successfully Removed game ID: ${id}`);
        }
      };
    });
  }
  catch (err) {
    res.status(500).send('dbase error')
  }
});

app.put('/gamelist/:id', (req, res) => {

  const token = req.body.headers.authorization.split(' ')[1]; 
  
  try {
    jwt.verify(token, getKey, {}, async function (err, user) {

      if (err) {
        res.status(500).send('invalid token')
      }
      let gameID = req.params.id;
      let email = req.body.params.email;
      if (email === user.email) {

        let { title, releaseDate, email, note } = req.body.params;
        const updatedGame = await GameModel.findByIdAndUpdate(gameID, { title, releaseDate, email, note }, { new: true, overwrite: true });
        res.status(200).send(updatedGame);
      } else {
        res.send('You are imposter');
      }
    })
  }
  catch (err) {
    res.status(500).send('Unable to update book try again');
    console.log(error);
  }
})
//----------------default route, catch all routes, listening on port ------------//
app.get('/', (req, res) => {
  res.send('Hellooooo, from the server!');
});
app.get('/*', (req, res) => {
  res.status(404).send('Path does not exists');
});
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
