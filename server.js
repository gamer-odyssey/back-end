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

app.delete('/gamelist/:id', async (req, res) => {
  try {
    let gameID = req.params.id;
    await GameModel.findByIdAndDelete(gameID)
    console.log(gameID)
    res.status(200).send(`Successfully Removed game ID: ${gameID}`);
  }
  catch (err){
    res.status(500).send('Error removing your game. Please try again.')
  }
})

app.put('/gamelist/:id', async (req, res) => {
  try{
    let gameID = req.params.id;
    let {title, releaseDate, email, note} = req.body;
    const updatedGame = await GameModel.findByIdAndUpdate(gameID, {title, releaseDate, email, note}, {new:true, overwrite: true});
    res.status(200).send(updatedGame);
  }
  catch(err){
    res.status(500).send('Unable to update book try again')
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
