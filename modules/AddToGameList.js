'use strict'

function AddToGameList (req,res) {
  try {
    let {title, releaseDate, email, note} = req.body;
    let newGame = new GameModel({title, releaseDate, email, note});
    newGame.save();
    res.send(newGame);
  } catch (err) {
    res.status(500).send('Something went wrong adding your Game. Please try again')
  }
};

module.exports = AddToGameList;
