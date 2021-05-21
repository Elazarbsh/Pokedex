
var topPokemons = [{}, {}, {}];
//get pokemons info from server.
async function getPokemons() {
    const response = await fetch('/api/pokemons');
    const pokemons = await response.json();
    return pokemons;
}

getPokemons().then(function (result) {
    for (var i = 0; i < result.length; i++) {
        //find top 3 most clicked pokemons.
        if (result[i].hasOwnProperty("count")) {
            findPokemonRank(result[i]);
        }
    }

    //create top 3 section.
    const topDiv = document.querySelector("#top3-div");

    for (var i = 0; i < topPokemons.length; i++) {
        if (typeof topPokemons[i].name !== 'undefined') {

            //create pokemon info card
            var infoDiv = document.createElement("div");
            infoDiv.classList.add("info-div");

            //create title img and types div elements and append to info card.
            var titleDiv = getPokemonTitleDiv(topPokemons[i]);
            var imgElem = getPokemonImgElement(topPokemons[i]);
            var typesDiv = getPokemonTypesDiv(topPokemons[i]);
            titleDiv.classList.add("title-div");
            infoDiv.appendChild(titleDiv);
            infoDiv.appendChild(imgElem);
            infoDiv.appendChild(typesDiv);
            infoDiv.classList.add((topPokemons[i].type[0]).toLowerCase()+"-background");

            topDiv.appendChild(infoDiv);
        }
    }
});


//adds zeros to the pokemons id.
function idToString(id) {
    //img indexing
    var str = "" + (id);
    var pad = "000";
    var imgName = pad.substring(0, pad.length - str.length) + str;
    return imgName;
}

//create a title div for pokemons name and id.
function getPokemonTitleDiv(pokemon) {
    //create id h1
    var titleDiv = document.createElement("div");
    var imgName = idToString(pokemon.id);
    var h = document.createElement("H1");
    var t = document.createTextNode("#" + imgName);
    h.appendChild(t);
    h.classList.add("id");
    titleDiv.appendChild(h);
    //create name h1
    h = document.createElement("H1");
    t = document.createTextNode(pokemon.name);
    h.appendChild(t);
    h.classList.add("name");
    titleDiv.appendChild(h);
    return titleDiv;
}

//create a pokemons img element.
function getPokemonImgElement(pokemon) {
    var img = document.createElement("IMG");
    var imgName = idToString(pokemon.id);
    img.setAttribute("src", "images/" + imgName + ".png");
    img.id = imgName;
    img.addEventListener('click', function () {
        window.location.href = '/pokemons/' + this.id;
    });
    return img;
}

//create a pokemons types div element.
function getPokemonTypesDiv(pokemon) {
    var typesDiv = document.createElement("div");
    typesDiv.classList.add("types-div");
    for (var j = 0; j < pokemon.type.length; j++) {
        var p = document.createElement("p");
        var t = document.createTextNode(pokemon.type[j]);
        p.appendChild(t);
        p.classList.add("type");
        p.classList.add("type-icon");
        p.classList.add((pokemon.type[j]).toLowerCase());
        typesDiv.appendChild(p);
    }
    return typesDiv;
}

//rank pokemons by clicks.
function findPokemonRank(pokemon) {
    if (!pokemon.hasOwnProperty("count")) {
        return;
    }
    if (!topPokemons[0].hasOwnProperty("count") || pokemon.count > topPokemons[0].count) {
        previous = topPokemons[0];
        topPokemons[0] = pokemon;
        findPokemonRank(previous);
    } else if (!topPokemons[1].hasOwnProperty("count") || pokemon.count > topPokemons[1].count) {
        previous = topPokemons[1];
        topPokemons[1] = pokemon
        findPokemonRank(previous);
    } else if (!topPokemons[2].hasOwnProperty("count") || pokemon.count >= topPokemons[2].count) {
        topPokemons[2] = pokemon;
    }

}