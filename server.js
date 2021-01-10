const { ESRCH } = require('constants');
var http = require('http');
const { data } = require('jquery');
var mysql = require('mysql');

//From string to polygon.
function swap_coordinates(coordinates) {
  coordinates = coordinates[0]["polygon"];
  var coord_arr = coordinates.split('],');
  var new_arr = []
  coord_arr.forEach(element => {
    element = element.replace("[","").replace("[","").replace("]","").replace("]","").replace(" ", "");
    var new_element = element.split(", ");
    var elm1 = parseFloat(new_element[0]);
    var elm2 = parseFloat(new_element[1]);
    new_arr.push([elm2, elm1]);
  });
  return new_arr
}

function get_cities_by_iso(res, iso) {
  var new_coordinates = "";
    //Connection establishment
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123123",
    database: "around_the_world"
  });
    //Connection to DB.
  con.connect(function(err) {
    if(!err) {
      console.log('Database is connected!');
      var query_txt = "SELECT id, city_name, geo_lat, geo_lng FROM around_the_world.cities WHERE iso = " + '"' + iso + '"' + ";"
      console.log("Quety txt2: " + query_txt)
      con.query(query_txt, function (err, result, fields) {
        console.log(result)
        console.log(JSON.stringify(result))
        res.write(JSON.stringify(result));
        res.end();
      });

    } 
  else {
    console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
  }
  });
}

function get_iso_from_countries(res, country_name) {
  var new_coordinates = "";
    //Connection establishment
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123123",
    database: "around_the_world"
  });
    //Connection to DB.
  con.connect(function(err) {
    if(!err) {
      console.log('Database is connected!');
      var quety_txt = "SELECT country_code FROM around_the_world.countries WHERE country_name = " + '"' + country_name + '"' + ";"
      console.log("Query text: " + quety_txt)
      con.query(quety_txt, function (err, result, fields) {
        console.log(JSON.stringify(result[0]["country_code"]))
        res.write(result[0]["country_code"]);
        res.end();
      });

    } 
  else {
    console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
  }
  });
  // console.log(new_coordinates);
}

function get_random_countries(res, name) {
  var new_coordinates = "";
    //Connection establishment
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123123",
    database: "around_the_world"
  });
    //Connection to DB.
  con.connect(function(err) {
    if(!err) {
      console.log('Database is connected!');
      var query_txt = "SELECT country_name, polygon, country_code FROM around_the_world.countries ORDER BY RAND() LIMIT 3 ;"
      console.log("Quety txt2: " + query_txt)
      con.query(query_txt, function (err, result, fields) {
        console.log(result)
        console.log(JSON.stringify(result))
        res.write(JSON.stringify(result));
        res.end();
      });

    } 
  else {
    console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
  }
  });
}

function post_used_city(res, name) {
  var new_coordinates = "";
    //Connection establishment
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123123",
    database: "around_the_world"
  });
    //Connection to DB.
  con.connect(function(err) {
    if(!err) {
      console.log('Database is connected!');
      console.log("CTname: " +name);
      var player_name = replaceAll("$", " ", name.split("@")[1])
      var success = replaceAll("$", " ", name.split("@")[2])
      var id = replaceAll("$", " ", name.split("@")[0])
      //TODO add city id, player name and success to SELECT.
      console.log("id in server: " + id);
      var query_txt = 'INSERT INTO cities_played_by_players (id, player_name, success) VALUES ("'+ id +'", "'+ player_name+'", "' + success+'");'
      console.log("Quety txt2: " + query_txt)
      con.query(query_txt, function (err, result, fields) {
        console.log(result)
        console.log(JSON.stringify(result))
        res.end();
      });

    } 
  else {
    console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
  }
  });
}

function end_game(res, name) {
    //Connection establishment
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123123",
    database: "around_the_world"
  });
    //Connection to DB.
  con.connect(function(err) {
    if(!err) {
      console.log('Database is connected!');
      console.log("CTname: " +name);
      var player_name = replaceAll("$", " ", name);
      //TODO add city id instead of city
      //TODO remove all console.logs.
      console.log("Quety txt2: " + query_txt1)
      con.query(query_txt1, function (err, result, fields) {
        res.end();
      });
    } 
  else {
    console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
  }
  });
}

function update_cityboard(res, name) {
    //Connection establishment
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123123",
    database: "around_the_world"
  });
    //Connection to DB.
  con.connect(function(err) {
    if(!err) {
      console.log('Database is connected!');
      console.log("CTname: " +name);
      var player_name = replaceAll("$", " ", name);
      //TODO add city id instead of id and cityname
      var query_txt2 = 'REPLACE INTO around_the_world.cities_success ( id, num_games, num_success ) SELECT id, SUM(num_games) AS num_games, SUM(num_success) AS num_success FROM (SELECT * FROM cities_success UNION (SELECT id, 1 AS num_games, success AS num_success FROM cities_played_by_players where player_name="'+player_name+'")) AS temp_table GROUP BY id;';
      con.query(query_txt2, function (err, result, fields) {
        console.log(query_txt2);
        res.end();
      });
    } 
  else {
    console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
  }
  });
}

function clear_player_cities(res, name) {
    //Connection establishment
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123123",
    database: "around_the_world"
  });
    //Connection to DB.
  con.connect(function(err) {
    if(!err) {
      console.log('Database is connected!');
      console.log("CTname: " +name);
      var player_name = name.replace("$", " ");
      var query_txt2 = 'DELETE FROM around_the_world.cities_played_by_players WHERE player_name="'+player_name+'";';
      //SET SQL_SAFE_UPDATES = 0; TODO
      con.query(query_txt2, function (err, result, fields) {
        console.log(query_txt2);
        res.end();
      });
    } 
  else {
    console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
  }
  });
}

function update_score(res, name) {
    //Connection establishment
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123123",
    database: "around_the_world"
  });
    //Connection to DB.
  con.connect(function(err) {
    if(!err) {
      console.log('Database is connected!');
      console.log("CTname: " +name);
      var player_name = replaceAll("$", " ", name.split("@")[0])
      var score = replaceAll("$", " ", name.split("@")[1])
      var query_txt2 = 'INSERT INTO around_the_world.scores (player_name, score) VALUES ("'+player_name+'", '+score+');';
      //SET SQL_SAFE_UPDATES = 0; TODO
      con.query(query_txt2, function (err, result, fields) {
        console.log(query_txt2);
        res.end();
      });
    } 
  else {
    console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
  }
  });
}

function replaceAll(sign, changeTo, string) {
  while (string.includes(sign)) {
    string = string.replace(sign, changeTo);
  }
  return string;
}

function clear_per_game_table(res, name) {
    //Connection establishment
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123123",
    database: "around_the_world"
  });
    //Connection to DB.
  con.connect(function(err) {
    if(!err) {
      console.log('Database is connected!');
      console.log("CTname: " +name);
      var player_name = replaceAll("$", " ", name);
      //SET SQL_SAFE_UPDATES = 0; TODO
      con.query(query_txt2, function (err, result, fields) {
        console.log(query_txt2);
        res.end();
      });
    } 
  else {
    console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
  }
  });
}

function get_leaderboard(res, name) {
    //Connection establishment
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123123",
    database: "around_the_world"
  });
    //Connection to DB.
  con.connect(function(err) {
    if(!err) {
      console.log('Database is connected!');
      console.log("CTname: " +name);
      var query_txt2 = 'SELECT player_name,MAX(score) AS max_score FROM around_the_world.scores GROUP BY player_name ORDER BY max_score DESC LIMIT 10;';
      //SET SQL_SAFE_UPDATES = 0; TODO
      con.query(query_txt2, function (err, result, fields) {
        console.log(query_txt2);
        res.write(JSON.stringify(result));
        res.end();
      });
    } 
  else {
    console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
  }
  });
}

function get_random_city(res, name) {
  //Connection establishment
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123123",
  database: "around_the_world"
});
  //Connection to DB.
con.connect(function(err) {
  if(!err) {
    console.log('Database is connected!');
    console.log("CTname: " +name);
    var player_name = replaceAll("$", " ", name.split("@")[0])
    var iso = replaceAll("$", " ", name.split("@")[1])
    var query_txt2 = 'SELECT city_name, geo_lat, geo_lng, id FROM around_the_world.cities WHERE id NOT IN(SELECT id FROM around_the_world.cities_played_by_players WHERE player_name="'+player_name+'") AND iso="'+iso+'" ORDER BY RAND() LIMIT 1;';
    //SET SQL_SAFE_UPDATES = 0; TODO
    con.query(query_txt2, function (err, result, fields) {
      console.log(query_txt2);
      console.log("REsult: " + result);
      res.write(JSON.stringify(result));
      res.end();
    });
  } 
else {
  console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
}
});
}

function get_cities_rank(res, name) {
    //Connection establishment
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123123",
    database: "around_the_world"
  });
    //Connection to DB.
  con.connect(function(err) {
    if(!err) {
      console.log('Database is connected!');
      console.log("CTname: " +name);
      //TODO change query, add join by cityid and select cityname
      var query_txt2 = 'SELECT around_the_world.cities.city_name, ((num_success/num_games)*100) AS average FROM around_the_world.cities_success JOIN around_the_world.cities ON cities.id=cities_success.id ORDER BY average DESC LIMIT 10;';
      //SET SQL_SAFE_UPDATES = 0; TODO
      con.query(query_txt2, function (err, result, fields) {
        console.log(query_txt2);
        res.write(JSON.stringify(result));
        res.end();
      });
    } 
  else {
    console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
  }
  });
}

function get_player_score(res, name) {
    //Connection establishment
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123123",
    database: "around_the_world"
  });
    //Connection to DB.
  con.connect(function(err) {
    if(!err) {
      var player_name = replaceAll("$", " ", name.split("@")[0])
      console.log('Database is connected!');
      var query_txt2 = 'SELECT SUM(success) FROM around_the_world.cities_played_by_players WHERE player_name="'+player_name+'";';
      //SET SQL_SAFE_UPDATES = 0; TODO
      con.query(query_txt2, function (err, result, fields) {
        console.log(query_txt2);
        console.log(JSON.stringify(result))
        res.write(JSON.stringify(result));
        res.end();
      });
    } 
  else {
    console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
  }
  });
}

function fix_spaces(country_name) {
  console.log(country_name)
  country_name = country_name.split("_").join(" ");
  return country_name;
}

//Server creation.
http.createServer(function (req, res) {
  var type = req.url.split("/")[1]
  var name = req.url.split("/")[2]
  console.log("name for switchcase1: " + req.url);
  name = fix_spaces(name);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.writeHead(200, {'Content-Type': 'text/html'});
  console.log("param for switchcase: " + type);
  console.log("name for switchcase2: " + name);
  switch (type) {
    case "iso":
      get_iso_from_countries(res, name);
      break;
    case "cities":
      get_cities_by_iso(res, name);
      break;
    case "countries":
      get_random_countries(res, name);
      break;
    case "updatePlayedCity":
      post_used_city(res, name);
      break;
    case "endGame":
      break;
    case "update_cityboard":
      update_cityboard(res, name);
      break;
    case "clear_player_cities":
      clear_player_cities(res, name);
      break;
    case "clear_per_game_table":
      break;
    case "update_score":
      update_score(res, name);
      break;
    case "get_leaderboard":
      get_leaderboard(res, name);
      break;
    case "get_cities_rank":
      get_cities_rank(res, name);
      break;
    case "get_random_city":
      get_random_city(res, name);
      break;
    case "get_player_score":
      get_player_score(res, name);
    break;
    case "get_random_city":
      get_random_city(res, name);
    break;
  }
}).listen(8080);

