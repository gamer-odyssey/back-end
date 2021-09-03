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

let TClientID = process.env.TWITCH_CLIENT_ID;
let tAccessToken = process.env.TWITCH_APP_ACCESS_TOKEN
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

app.get('/coming_soon', async (req, res) => {

// here we are retrieving the offset
  let offset = req.query.offset;

// Getting todays date in milliseconds, then converting to unix time (in seconds), so that it matches API's timestamps. Then rounding down to a whole number. 
  let todaysDate = Math.floor(Date.now()/1000);  
  try {
    const response = await axios({
      method: 'post',
      url: 'https://api.igdb.com/v4/games',
      headers: {
        'client-id': TClientID,
        'authorization': `Bearer ${tAccessToken}`
      },
// passing in todays date, so we filter out games with first release date that are in the future. Also passing Offset, which tells the API how many first results to skip (for pagination purposes). 
// Offset increments from the front-end end has to be equal to limit.
      data: `fields name, summary, platforms.name, release_dates.human, release_dates.date, release_dates.platform.name, release_dates.region, first_release_date, cover.image_id; where first_release_date > ${todaysDate}; sort first_release_date asc; offset ${offset}; limit 10;`
    });
    // console.log(response.data);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
})

app.get('/gamelist', (req,res) => {
  try {
    GameModel.find((err, gamesdb) => {
      res.status(200).send(gamesdb)
    })
  } catch (err) {
    res.status(500).send(`The Database encountered and error: ${err}`);
  }
})

app.post('/gamelist', (req,res) => {
  try {
    let {title, releaseDate, email, note} = req.body;
    let newGame = new GameModel({title, releaseDate, email, note});
    newGame.save();
    res.send(newGame);
  } catch (err) {
    res.status(500).send('Something went wrong adding your Game. Please try again')
  }
});

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
