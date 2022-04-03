'use strict'

const GameModel = require('../models/GamesModel');
const AddGame = require('../modules/AddGame')

async function SeedGames(req, res) {
  let games = await GameModel.find({});
  try {
    if (games.length === 0) {
      await AddGame({
        title: "Bus Simulator 21",
        releaseDate: "September, 7 2022",
        email: "alex.payne1125@gmail.com",
        note: "Lets take a trip on the Bus",
      });
      await AddGame({
        title: "Deathloop",
        releaseDate: "September, 14 2022",
        email: "alex.payne1125@gmail.com",
        note: "How many loops will it take",
      });
      await AddGame({
        title: "Back 4 Blood",
        releaseDate: "October, 12 2022",
        email: "gimranov45@gmail.com",
        note: "How Far back can you throw it",
      });
      await AddGame({
        title: "Halo Infinite",
        releaseDate: "December, 08 2022",
        email: "gimranov45@gmail.com",
        note: "This game looks dope",
      });
    }
    res.status(200).send('DataBase has been seeded!')
  } catch (err) {
    res.status(500).send('Error seeding the DataBase try again');
  }
  console.log('DB has been seeded heheheheh!')
}

module.exports = SeedGames
