'use strict'
const axios = require('axios')
let TClientID = process.env.TWITCH_CLIENT_ID;
let tAccessToken = process.env.TWITCH_APP_ACCESS_TOKEN

async function Upcoming(req, res) {

    let offset = req.query.offset; 
    let todaysDate = Math.floor(Date.now()/1000);  
    try {
      const response = await axios({
        method: 'post',
        url: 'https://api.igdb.com/v4/games',
        headers: {
          'client-id': TClientID,
          'authorization': `Bearer ${tAccessToken}`
        },
        data: `fields name, summary, platforms.name, first_release_date, cover.image_id; where first_release_date > ${todaysDate}; sort first_release_date asc; offset ${offset}; limit 10;`
      });
      res.send(response.data);
    } catch (error) {
      res.status(500).send(error.message);
      console.log(error);
    }
  };

  module.exports = Upcoming
  