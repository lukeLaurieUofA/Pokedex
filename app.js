const express = require("express");
const app = express();
// for css
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static("public"));

pokemonName = null;

/*
Sends the main html page when get request recieved
*/
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

/*
Sends side pokemon page when get request recieved
*/
app.get("/pokemon/:pokemonName", (req, res) => {
  pokemonName = req.params.pokemonName;
  res.sendFile(__dirname + "/public/pokemon.html");
});

app.get("/pokemon/api/name", (req, res) => {
  res.send(pokemonName);
});

/*
Handles the information that is given by the user whenever the
go button is clicked
*/
app.post("/pokemon/name", (req, res) => {
  pokemonName = req.body.pokemonName;
  res.redirect("/pokemon/" + pokemonName);
})

/*
Handles the information that is given by the user whenever the
random button is clicked
*/
app.post("/random", (req, res) => {
  res.redirect("/pokemon");
})

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port 3000");
})
