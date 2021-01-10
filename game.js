// Map creation.
var mymap = L.map('map', {
    dragging: false
}).setView([40, 0], 3);

// Parsing countries names from DB.
var countries = JSON.parse(get_data_from_server("countries", ""));
// Creating submit and surprise  buttons.
var submit_button = document.getElementById("submit");
var surprise_button = document.createElement("button");
var name = "";
var marker;
// Creating pin container.
var group = new L.FeatureGroup();


function swap_coordinates(coordinates) {
    //Swap coordinates
    coordinates.forEach(subArray1 => {
        subArray1.forEach(subArray2 => {
            subArray2.forEach(element => {
                temp = element[0];
                element[0] = element[1];
                element[1] = temp;
            })
        })
    });
}

function draw_and_fit_polygon(polygon) {
    swap_coordinates(polygon);
    //draw polygon
    var poly = L.polygon(polygon).addTo(mymap);
    //zoom
    mymap.fitBounds(poly.getBounds());
    return poly;
}

function remove_children(parent) {
    child = container.lastElementChild;
    while(child) {
        parent.removeChild(child);
        child = parent.lastElementChild;
    }
}

submit_button.onclick = function(){
    
    var container = document.getElementById("container");
    name = document.getElementById("name").value;
    name = name.replace(/[^a-z0-9]/gi,'');
    if (name == "") {
        name = "Player" + Math.floor(Math.random()*10000);
    }
    console.log("1NAME IS: " + name);
    remove_children(container);
    surprise_button.id = "surprise_me_button";
    surprise_button.innerHTML = "SURPRISE ME";
    container = document.getElementById("container");
    container.appendChild(surprise_button);
}

surprise_button.onclick = function() {
    var i;
    for (let i=0; i < 3; i++) {
        var country_name = countries[i]["country_name"];
        var btn = create_country_button(country_name, i+1);
        btn.onclick = function() {
            // var iso = get_data_from_server("iso", countries[i]["country_name"]);
            var iso = countries[i]["country_code"];
            console.log("ISO: " + iso)
            iso = iso.replace('"', '').replace('"', '')
            var cities = get_data_from_server("cities", iso);
            var polygon = JSON.parse("[["+countries[i]["polygon"]+"]]");
            var poly = draw_and_fit_polygon(polygon);
            remove_children(container);
            cities = JSON.parse(cities);
            container.remove();
            create_game_div();
            // console.log("2NAME IS: " + name);
            game(cities, poly, iso, name);
        }
    }
    surprise_button.remove();
}

function create_game_div() {
    var div = document.createElement("div");
    div.id = "city_div";
    document.body.appendChild(div);
}

function create_country_button(country_name, i) {
    var btn = document.createElement("button");
    btn.className = "country_button"
    btn.style.width = "fit-content";
    btn.innerHTML = country_name;
    container.appendChild(btn);
    return btn;
}

function get_allowed_distance(bounds){
    console.log("hey")
    var bounds0 = bounds.getSouthWest();
    var bounds1 = bounds.getNorthEast();
    console.log(bounds1)

    var distance = bounds0.distanceTo(bounds1);
    console.log("dist:"+distance/1000)
    return distance/10;
}

function get_city_index(cities, used_cities_cache) {
    city_index = Math.floor(Math.random()*cities.length);
    while (used_cities_cache.includes(city_index)) {
        if (used_cities_cache.length == cities.length) {
            used_cities_cache = [];
        }
        city_index = Math.floor(Math.random()*cities.length);
    }
    used_cities_cache.push(city_index);
    return city_index
}

function game(cities, poly, iso, username) {
    // var score = 0;
    var lives = 3;
    var used_cities_cache = [];
    var flag = true;
    // var random_city = get_data_from_server("get_random_city", username+"@"+iso);
    var city_index = Math.floor(Math.random()*cities.length);
    used_cities_cache.push(city_index);
    create_city_name_button(city_index, cities);
    var city_latlng = L.latLng(cities[city_index]["geo_lat"],cities[city_index]["geo_lng"]);
    var cheat = document.createElement("button");
    cheat.id = "cheat_button";
    var message_container = document.getElementById("message_container");
    message_container.appendChild(cheat);
    cheat.onclick = function() {draw_cheat(city_latlng);}
        async function onMapClick(e) {
            var city_latlng = L.latLng(cities[city_index]["geo_lat"],cities[city_index]["geo_lng"]);
            var city_id = cities[city_index]["id"];
            console.log("CITY ID: " + city_id);
            // console.log("City latlng: " + city_latlng.toString());
            var city_name = cities[city_index]["city_name"];
            var test = document.getElementById("name");
            var name = username.replaceAll(" ","$");
            var city_name_$ = city_name.replaceAll(" ","$");
            var tst = name+"@"+city_name_$+"@"+iso;
            var guess_flag = "0";
            // create_city_name_button(city_index, container, cities)
            // console.log("You clicked the map at " + e.latlng.toString());
            var distance = city_latlng.distanceTo(e.latlng);
            // console.log(poly);
            // console.log(poly.getBounds());
            allowed_dist=get_allowed_distance(poly.getBounds());
            if (distance <= allowed_dist) {
                show_guess_graphics("green", city_latlng, "RIGHT");
                guess_flag = "1";
                // score += 1;
            } else {
                show_guess_graphics("red", city_latlng, "WRONG");
                lives -= 1;
            }
            
            console.log(lives);
            get_data_from_server("updatePlayedCity", city_id+"@"+name+"@"+guess_flag);
            if (lives == 0) {
                // get_data_from_server("endGame", name);
                get_data_from_server("update_cityboard", name);
                var final_score = get_data_from_server("get_player_score", name);
                final_score = final_score.split(":")[1].split("}")[0];
                console.log("Final score:" + final_score);
                get_data_from_server("clear_player_cities", name);
                // get_data_from_server("clear_per_game_table", name);
                get_data_from_server("update_score", name+"@"+final_score);
                var success_msg = document.getElementById("success_message");
                success_msg.style.color = "red";
                success_msg.innerHTML = "GAME OVER";
                var score_msg = document.getElementById("score");
                score_msg.style.color = "red";
                score_msg.innerHTML = "Your score is: " + final_score;
                cheat.remove();
                console.log("ONE")
                // TODO remove player cache in DB (city_by_player).
                // TODO Insert player's score into leaderboard DB.
                await sleep(2000);
                console.log("TWO")
                window.location.href = "index.html";
            }
            city_index = get_city_index(cities, used_cities_cache);
            var new_city_latlng = L.latLng(cities[city_index]["geo_lat"],cities[city_index]["geo_lng"]);
            cheat.onclick = function() {draw_cheat(new_city_latlng);}
            var city_name = cities[city_index]["city_name"];
            var city_id = cities[city_index]["id"];
            document.getElementById("city_button").innerHTML = city_name;
            // console.log(distance);
        }
        mymap.on('click', onMapClick);

    
}

async function show_guess_graphics(color, city_latlng, text) {
    //Creation
    var success_msg = document.getElementById("success_message");
    var container = document.getElementById("message_container");
    success_msg.style.color = color;
    success_msg.innerHTML = text;
    container.appendChild(success_msg);
    if (text == "WRONG") {
        marker = new L.marker(city_latlng);
        group.addLayer(marker);
        group.addTo(mymap);
    }
    await sleep(1000);
    //Deletion
    success_msg.innerHTML = "";
    group.clearLayers();
}

async function draw_cheat(city_latlng) {
    marker = new L.marker(city_latlng);
    group.addLayer(marker);
    group.addTo(mymap);
    await sleep(1000);
    group.clearLayers();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function create_city_name_button(city_index, cities) {
    var btn = document.createElement("button");
    var city_container = document.getElementById("city_div");
    btn.id = "city_button";
    // console.log(cities[city_index]["city_name"]);
    btn.innerHTML = cities[city_index]["city_name"];
    city_container.appendChild(btn);
}

function get_data_from_server(type, param) {
    try {
        const Http = new XMLHttpRequest();
        var url = 'http://localhost:8080/' + type + "/" + param;
        url = fix_spaces(url);
        Http.open("GET", url, false);
        Http.send();
        console.log(Http.responseText);
        return Http.responseText;
    } catch(error) {
        console.log("Server disconnected." + error);
        window.location.href = "index.html";
    }
}

function fix_spaces(country_name) {
    country_name = country_name.replaceAll(" ", "_");
    return country_name;
}

L.tileLayer('http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
}).addTo(mymap);

