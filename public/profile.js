
const id = parseInt(document.URL.split('/')[4]);

//get pokemon info from server.
async function getPokemons() {
    const response = await fetch('/api/pokemons/'+id);
    const pokemons = await response.json();
    return pokemons;
}

getPokemons().then(function (result) {

    var infoDiv = document.createElement("div");
    infoDiv.classList.add("info-div");

    //create title img and types div elements and append to info card.
    var titleDiv = getPokemonTitleDiv(result);
    var imgElem = getPokemonImgElement(result);
    var typesDiv = getPokemonTypesDiv(result);
    var statsDiv = getPokemonStatsDiv(result);

    titleDiv.classList.add("title-div");
    typesDiv.classList.add('types-div');
    infoDiv.appendChild(titleDiv);
    infoDiv.appendChild(imgElem);
    infoDiv.appendChild(typesDiv);
    infoDiv.classList.add((result.type[0]).toLowerCase()+"-background");

    document.body.appendChild(infoDiv);

    var h = document.createElement("H1");
    var t = document.createTextNode("Base Stats");
    h.appendChild(t);
    h.classList.add("title");
    h.id = "stats-title";
    document.body.appendChild(h);

    document.body.appendChild(statsDiv);
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
    img.setAttribute("src", "/images/" + imgName + ".png");
    img.id = imgName;
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


function getPokemonStatsDiv(pokemon){
    var statsDiv = document.createElement("div");
    statsDiv.classList.add("stats-div");
    for (const stat in pokemon.base) {
        var p = document.createElement("p");
        var t = document.createTextNode(stat + ": " + pokemon.base[stat]);
        p.appendChild(t);
        statsDiv.appendChild(p);
    }
    return statsDiv;
}