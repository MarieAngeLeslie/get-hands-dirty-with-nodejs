const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const { success, getUniqueID } = require("./helper");
let pokemons = require("./mock-pokemon");

const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`server start well at port : ${port}`);
});

app
  .use(favicon(__dirname + "/assets/akashi_seijuro.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("yeah i'm there");
});

app.get("/api/pokemons/:special_pokemon_id/:pokemon", (req, res) => {
  const { special_pokemon_id, pokemon } = req.params;
  const nicePokemon = pokemons.find((pokemon) => {
    return pokemon.id === +special_pokemon_id;
  });
  message = "le pokemon est bel et bien disponible";
  res.json(success(message, nicePokemon));
});

app.get("/api/pokemons", (req, res) => {
  message = "Nos véritables pokémons ont été trouvé. YES!!";
  res.json(success(message, pokemons));
});

app.post("/api/pokemons", (req, res) => {
  const id = getUniqueID(pokemons);
  console.log(req.body);
  const pokemonCreated = { id: id, ...req.body, created: new Date() };
  pokemons.push(pokemonCreated);
  const message = `le pokemon ${pokemonCreated.name} a bien été créé`;
  res.json(success(message, pokemonCreated));
});
