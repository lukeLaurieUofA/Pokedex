// gets the neccesary html elements
pokemonName = document.getElementById("pokemon-name");
pokemonImage = document.getElementById("pokemon-image");
pokemonNumber = document.getElementById("pokemon-number");
typeOne = document.getElementById("type-one");
typeTwo = document.getElementById("type-two");
typeOneText = document.getElementById("first-type");
typeTwoText = document.getElementById("second-type");
height = document.getElementById("pokemon-height");
weight = document.getElementById("pokemon-weight");
abilityOne = document.getElementById("ability-one");
abilityTwo = document.getElementById("ability-two");
//stat elements
hp = document.getElementById("hp-total");
attack = document.getElementById("attack-total");
defense = document.getElementById("defense-total");
spAttack = document.getElementById("sp-attack-total");
spDefense = document.getElementById("sp-defense-total");
speed = document.getElementById("speed-total");
totalStat = document.getElementById("total");
allStats = [hp, attack, defense, spAttack, spDefense, speed, totalStat]
// statBars
hpBar = document.getElementById("hp-bar");
attackBar = document.getElementById("attack-bar");
defenseBar = document.getElementById("defense-bar");
spAttackBar = document.getElementById("sp-attack-bar");
spDefenseBar = document.getElementById("sp-defense-bar");
speedBar = document.getElementById("speed-bar");
statBars = [hpBar, attackBar, defenseBar, spAttackBar, spDefenseBar, speedBar]


getData();

/*
* This function will set all the needed text in the html file to the
* text that was retrieved from the api.
@param {Object} data is a object with all the pokemon data
*/
function setData(data) {
  pokemonName.innerText = data.name;
  pokemonImage.src = data.sprites.other['official-artwork'].front_default;
  pokemonNumber.innerText = data.id;
  setType(data.types);
  setStats(data.stats);
  // height and weight in with 1 decimal place
  let curHeight = Math.round((Number(data.height) / 3.048) * 10) / 10;
  let curWeight = Math.round((Number(data.weight) / 4.536) * 10) / 10;
  height.innerText = curHeight + " ft";
  weight.innerText = curWeight + " lb";
  abilityOne.innerText = data.abilities[0].ability.name;
  if (data.abilities.length > 1){
    abilityTwo.innerText = data.abilities[1].ability.name;
  }
}

/*
* This function will read in an API about a randomly generated
* pokemon.
*/
function getData(){
  randPokemon = Math.floor(Math.random() * 1009);
  fetch("https://pokeapi.co/api/v2/pokemon/" + randPokemon)
    .then(responce => responce.json())
    .then(data => {
      setData(data)
    })
    .catch(error => {
      console.log("Error: ", error);
    })
}

/*
* This function will set the typings of the pokemon.
@param {Object} types is a object with all the typings of the randomly
*generated pokemon
*/
function setType(types){
  // removes second typing if the pokemon does not have
  let firstType = types[0].type.name;
  if (types.length == 1){
    typeTwo.style.display = "none";
    typeOne.className = firstType;
    typeOneText.innerText = firstType;
  } else {
    let secondType = types[1].type.name;
    typeTwo.style.display = "inlineBlock";
    typeOne.className = firstType;
    typeTwo.className = secondType;
    typeOneText.innerText = firstType;
    typeTwoText.innerText = secondType;
  }
}

/*
* This function will set all the stats and find the stat total
*for the pokemon.
@param {Object} stats is a object with the pokemons stats
*/
function setStats(stats) {
  total = 0;
  for (var i = 0; i < stats.length; i++){
    // sets the stat on the page
    let statVal = Number(stats[i].base_stat);
    allStats[i].innerText = statVal;
    total += statVal;
    // finds the percentage width of the bar
    let percentage = Math.floor((statVal / 170) * 100);
    if (percentage > 100){
      percentage = 100;
    }
    statBars[i].style.width = percentage + "%";
    setColor(statBars[i], statVal);
  }
  allStats[allStats.length - 1].innerText = total;
}

/*
* This will set each stat bar to its corect respective colors.
@param {div} bar is a html div containing the current bar
@param {int} statVal is a int representing the current total
*/
function setColor(bar, statVal){
  if (statVal < 25){
    bar.style.backgroundColor = "rgb(243,68,68)";
  }else if (statVal < 60){
    bar.style.backgroundColor = "rgb(255,127,15)";
  }else if (statVal < 90){
    bar.style.backgroundColor = "rgb(255,221,87)";
  }else if (statVal < 120){
    bar.style.backgroundColor = "rgb(160,229,21)";
  }else if (statVal < 150){
    bar.style.backgroundColor = "rgb(35,205,94)";
  }else {
    bar.style.backgroundColor = "rgb(0,194,184)";
  }
}
