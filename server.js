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

// app.delete('/gamelist/:id', (req,res) => {
//   let gameID = req.params.id;
//   let userEmail = req.params.email;
//   if ()
// })






//----------------default route, catch all routes, listening on port ------------//

app.get('/', (req, res) => {
  res.send('Hellooooo, from the server!');
});

app.get('/*', (req, res) => {
  res.status(404).send('Path does not exists');
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
