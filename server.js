'use strict';
//-------------import/require-------------//

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const axios = require('axios');





//-------------------routes---------------//

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
        'client-id': process.env.TWITCH_CLIENT_ID,
        'authorization': `bearer ${process.env.TWITCH_APP_ACCESS_TOKEN}`
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






//----------------default route, catch all routes, listening on port ------------//

app.get('/', (req, res) => {
  res.send('Hellooooo, from the server!');
});

app.get('/*', (req, res) => {
  res.status(404).send('Path does not exists');
});

app.listen(process.env.PORT || 3001, () => console.log(`Server listening on 3001`));
