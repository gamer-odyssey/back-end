'use strict'
const axios = require('axios');
let TClientID = process.env.TWITCH_CLIENT_ID;
let tAccessToken = process.env.TWITCH_APP_ACCESS_TOKEN;

async function SearchUpcoming(req, res) {

    let field = req.query.field;      
    try {
      const response = await axios({
        method: 'post',
        url: 'https://api.igdb.com/v4/games',
        headers: {
          'client-id': TClientID,
          'authorization': `Bearer ${tAccessToken}`
        },
        data: field
      });
      res.send(response.data);
    } catch (error) {
      res.status(500).send(error.message);
      console.log(error);
    }
  };

  module.exports = SearchUpcoming
  