'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();

app.get('/', (request, response) => {
  response.send('Hello, from the server!');
});


app.get('/*', (request, response) => {
  response.status(404).send('Path does not exists');
});

app.listen(3001, () => console.log(`Server up on 3001`));
