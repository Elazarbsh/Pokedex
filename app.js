const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

var jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'pokemons.json'), 'utf8'));

//Send a single pokemon to client.
app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = jsonData[id - 1];
  if (pokemon.hasOwnProperty("count")) {
    pokemon.count++;
  }
  else {
    pokemon.count = 0;
  }
  res.send(JSON.stringify(pokemon));
});

//Send all the pokemons to client.
app.get("/api/pokemons", (req, res) => {
  res.send(jsonData);
});

app.get('/pokemons/:id', (req, res, next) => {
  const id = req.params.id;
  if (!isNaN(id)) {
    if (parseInt(id) > 0 && parseInt(id) <= 151) {
      res.sendFile(path.join(__dirname, 'views', 'profile-page.html'));
    } else {
      next();
    }
  } else {
    next();
  }
});

app.get('/pokemons', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'all-pokemons.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use('/', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});