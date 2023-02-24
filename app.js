const express = require("express");
const app = express();
// for css
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static("public"));

/*
Sends the main html page when get request recieved
*/
app.get("/hi", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

/*
Sends side pokemon page when get request recieved
*/
app.get("/pokemon", (req, res) => {
  res.sendFile(__dirname + "/public/pokemon.html");
});

/*
Handles the information that is given by the user whenever the
go button is clicked
*/
app.post("/", (req, res) => {
  res.redirect("/pokemon");
})

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port 3000");
})
