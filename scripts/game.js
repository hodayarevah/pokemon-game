
var sounds;
var pokemon1tolefthp;


function startGame() {
    document.getElementById('match-details').innerHTML = "";
   
    sounds = getSounds();

    
    for (var i = 0; i < 5; i++) {
       
        var random = getRandomInt();
        var pokemon = pokemonData[random];
        var imgSrc = 'pokemonImages/' + getImageSourceByPokemonId(pokemon.id) + '.png';
        var pokemonStr = ' <img onclick="selectPokemon(this)" id="' + pokemon.id + '" src="' + imgSrc + '"/> ';
        var container1 = document.getElementById("pokemon-options");
        container1.innerHTML += pokemonStr;
        
    }
   
 
    var myPokemons = getPokemonsList();
    if (myPokemons.length == 0) {
        var random1 = getRandomInt();
        var pokemonnn = pokemonData[random1];
        var pokemonnnid = getImageSourceByPokemonId(pokemonnn.id);
        addToPokemonsList(pokemonnnid);
        var imgSrcc = 'pokemonImages/' + pokemonnnid + '.png';
        var pokemonStrr = '<img onclick="selectPokemon(this)" id="' + pokemonnn.id + '" src="' + imgSrcc + '"/> ';
        var containerr = document.getElementById("pokemon-options-me");
        containerr.innerHTML += pokemonStrr;

    }
    else
        if (myPokemons.length <= 5) {

            for (var i = 0; i < myPokemons.length; i++) {
                var id = myPokemons[i];
                var imgSrc = 'pokemonImages/' + getImageSourceByPokemonId(id) + '.png';
                var pokemonStr = '<img onclick="selectPokemon(this)" id="' + id + '" src="' + imgSrc + '"/> ';
                var containerr = document.getElementById("pokemon-options-me");
                containerr.innerHTML += pokemonStr;
            }
          
        }

        else {
            var Norepetition = [];
            var j = 0;
            for (var i = 0; i < 5; i++) {
                var randominttomypokemon = getRandomIntToMyPokemon(myPokemons);
                var mypokemon = myPokemons[randominttomypokemon];
                for (var i1 = 0; i1 < Norepetition.length; i1++) {
                    if (mypokemon == Norepetition[i1])
                        j++;
                }
                while (j == 1) {
                    j = 0;
                    var randominttomypokemon = getRandomIntToMyPokemon(myPokemons);
                    var mypokemon = myPokemons[randominttomypokemon];
                    for (var i2 = 0; i2 < Norepetition.length; i2++) {
                        if (mypokemon == Norepetition[i2])
                            j++;
                    }
                }
                var imgSrc = 'pokemonImages/' + getImageSourceByPokemonId(mypokemon) + '.png';
                var pokemonStr = '<img onclick="selectPokemon(this)" id="' + mypokemon + '" src="' + imgSrc + '"/> ';
                var containerr = document.getElementById("pokemon-options-me");
                containerr.innerHTML += pokemonStr;
                Norepetition.push(mypokemon);
            }


        }
    toggleplayerselection('pokemon-options-me', false);
    toggleplayerselection('pokemon-options', true);

 
}



function getSounds()
{
	return {
		battle: new sound('sounds/battle.mp3'),
		selection: new sound('sounds/selection.mp3')
	};
}


function getImageSourceByPokemonId(id) {
    if (id > 0 && id < 9) {
        return '00' + id;
    }
    if (id >= 10 && id <= 99) {
        return '0' + id;
    }
    else {
        return id.toString();
    }
}

    function getRandomInt() {
    return Math.floor(Math.random() * pokemonData.length);
    }
    function getRandomIntToMyPokemon(myPokemons) {
        return Math.floor(Math.random() * myPokemons.length);
    }



var pokemon1 = null;
var pokemon2 = null;
function selectPokemon(imgElement) {
    if (pokemon1 == null) {
        sounds.selection.play();
        pokemon1 = imgElement;
        toggleplayerselection('pokemon-options-me', true);
        toggleplayerselection('pokemon-options', false);
    }
    else 
        if (pokemon2 == null) {
            sounds.selection.stop();
            sounds.selection.play();
            pokemon2 = imgElement;
            startBattle();
        }

    
}

function startBattle() {

	sounds.battle.play();
    document.getElementById('pokemon-options').innerHTML = '';
    document.getElementById('pokemon-options-me').innerHTML = '';
    document.getElementById("pokadur").innerHTML = '';
    var imgtitle = 'images/title1.png';
    var titlepok = '<img id="titlepokemon" src="' + imgtitle + '"/> ';
    
    document.getElementById("title").innerHTML = titlepok;
    var container = document.getElementById('match');
    container.innerHTML += pokemon1.outerHTML + pokemon2.outerHTML;



    pokemon1 = {
      
        id: pokemon1.id,
        leftHP: getPokemonById(pokemon1.id).base.HP + getPokemonById(pokemon1.id).base.Defense,
        active: true,
        locationX: -81,
        attac: null


    };
    var pokemon1Element = getPokemonImage(pokemon1); 
    pokemon1Element.style.position = 'absolute';
    pokemon1Element.style.top = '50px';
    pokemon1Element.style.left =  pokemon1.locationX + 'px';


    document.getElementById("progress1").innerHTML = '<progress  max="' + (getPokemonById(pokemon1.id).base.HP + getPokemonById(pokemon1.id).base.Defense )+ '" value="' + pokemon1.leftHP + '"/>';
    document.getElementById("progress1").innerHTML += ' <h2>  HP </h2>';
    

    pokemon2 = {
    
        id: pokemon2.id,
        leftHP: getPokemonById(pokemon2.id).base.HP +getPokemonById(pokemon2.id).base.Defense,
        active: false,
        locationX: -501,
        attac: null
    };
    var pokemon2Element = getPokemonImage(pokemon2);
    pokemon2Element.style.top = '50px';
    pokemon2Element.style.position = 'absolute';
    pokemon2Element.style.left = pokemon2.locationX + 'px';

    document.getElementById("progress2").innerHTML = '<progress  max="' + (getPokemonById(pokemon2.id).base.HP + getPokemonById(pokemon2.id).base.Defense) + '" value="' + pokemon2.leftHP + '"/>';
    document.getElementById("progress2").innerHTML += ' <h2>  HP </h2>';
    startRound();
    
}

function getPokemonById(id) {
    for (var i = 0; i < pokemonData.length; i++) {
        if (pokemonData[i].id == id) { return pokemonData[i];}
    }
 }
 function getPokemonsList() {
        var listOfPokemons = [];
        var listAsJson = localStorage['list-of-pokemons'];
        if (listAsJson) {
            listOfPokemons = JSON.parse(listAsJson);
        }
        return listOfPokemons;
  }

 function addToPokemonsList(pokemonId) {
        var listOfPokemons = getPokemonsList();
        listOfPokemons.push(pokemonId);
        localStorage['list-of-pokemons'] = JSON.stringify(listOfPokemons);
  }
function pushfromPokemonsList(pokemonId) {
    var listOfPokemons = getPokemonsList();
    for (var i = 0; i < listOfPokemons.length; i++) {
        if (listOfPokemons[i] === pokemonId)
            listOfPokemons.splice(i, 1);
    }
        localStorage['list-of-pokemons'] = JSON.stringify(listOfPokemons);
    
}


function getPokemonMoves(pokemon) {
    var moves = [];
    for (var i = 0; i < pokemonMoves.length; i++) {
        if (pokemon.type.indexOf(pokemonMoves[i].type) != -1) {
            moves.push(pokemonMoves[i]);
        }
    }
    return moves;
}
function getActivePokemon() {
    return pokemon1.active ? pokemon1 : pokemon2;
}

function getNonActivePokemon() {
    return !pokemon1.active ? pokemon1 : pokemon2;
}

function getPokemonImage(pokemon)
{
	return document.getElementById(pokemon.id);
}
function addPokemonClass(pokemon,cssClass)
{
	getPokemonImage(pokemon).classList.add(cssClass);
}
function removePokemonClass(pokemon,cssClass)
{
	getPokemonImage(pokemon).classList.remove(cssClass);
}

function changeTurn()
{
	var value = pokemon1.active;
	pokemon1.active = pokemon2.active;
	pokemon2.active = value;
}

function startRound() {
    var activePokemon = getActivePokemon();
	addPokemonClass(activePokemon, 'red-border');
	setTimeout(function(){removePokemonClass(activePokemon, 'red-border');}, 1000);
	
    var pokemonData = getPokemonById(activePokemon.id);
    var availableMoves = getPokemonMoves(pokemonData);
    var container = document.getElementById('match-details');

    for (var i = 0; i < availableMoves.length && i<=3; i++) {
        container.innerHTML += '<button class="attack-option" onclick="endRound()">'+availableMoves[i].ename+'</button>'
    }


    container.innerHTML += '<div>';
    container.innerHTML += ' <h2> ' + ' Choose attack ' + '  </h2> </div>';
    activePokemon.attac = availableMoves[i].power;

   
}
function toggleplayerselection(containerid, shuldbedisplayed) {
    var container = document.getElementById(containerid);
    var style1 = shuldbedisplayed ? 'none' : 'block';
    container.style.display = style1;
}

function gameover() {
    alert('Game Over!');
    window.location.href = 'HtmlPage.html';
    document.getElementById('gif').innerHTML = "";
}
function endRound() {

    document.getElementById('match-details').innerHTML = '';
    var activePokemon = getActivePokemon();
    var x = activePokemon.locationX;
    document.getElementById('effcet').innerHTML += ' <img src="images/giphy (1).gif" />';
  
   
  
    if (x == pokemon1.locationX) {

        var intervalId = setInterval(function () {
            if (x > activePokemon.locationX - 200) {

               
                x -= 1; 
                getPokemonImage(activePokemon).style.left = x + 'px';    
                document.getElementById('effcet2').innerHTML = "";
            }
            else {
                clearInterval(intervalId);
                getPokemonImage(activePokemon).style.left = activePokemon.locationX + 'px';
                document.getElementById('effcet').innerHTML = "";
              

                pokemon2.leftHP -= pokemon1.attac;
                document.getElementById("progress2").innerHTML = '<progress  max="' + (getPokemonById(pokemon2.id).base.HP + getPokemonById(pokemon2.id).base.Defense) + '" value="' + pokemon2.leftHP + '"/>';
                document.getElementById("progress2").innerHTML += ' <h2>  HP </h2>';
                if (getNonActivePokemon().leftHP <= 0) {
                  
                    document.getElementById('gif').innerHTML += ' <img  onclick="gameover()" src="images/gipwin.gif" />';
                    document.getElementById('gif').innerHTML += ' <h2> Tap Me </h2>';
                    addToPokemonsList(getNonActivePokemon().id);
                    sounds.battle.play();
                   
                }
                else {

                    changeTurn();
                    startRound();
                }
              



            }

        }, 0.5);
    }
    else {
        document.getElementById('effcet2').innerHTML += ' <img src="images/giphy (2).gif" />';
        var intervalId = setInterval(function () {
            if (x < activePokemon.locationX + 200) {
                x += 1;
                getPokemonImage(activePokemon).style.left = x + 'px';
                document.getElementById('effcet').innerHTML = "";
               
            }
            else {
                clearInterval(intervalId);
                getPokemonImage(activePokemon).style.left = activePokemon.locationX + 'px';

                document.getElementById('effcet2').innerHTML = "";

           
                pokemon1.leftHP -= pokemon2.attac;
                document.getElementById("progress1").innerHTML = '<progress  max="' + (getPokemonById(pokemon1.id).base.HP + getPokemonById(pokemon1.id).base.Defense) + '" value="' + pokemon1.leftHP + '"/>' ;
                document.getElementById("progress1").innerHTML += ' <h2>  HP </h2>';
            
                if (getNonActivePokemon().leftHP <= 0) {
                   pushfromPokemonsList(getNonActivePokemon().id);
                    sounds.battle.play();
                    alert('Game Over!');
                    window.location.href = 'HtmlPage.html';
                }
                else {

                    changeTurn();
                    startRound();
                }



            }

        }, 0.5);

    }


}




