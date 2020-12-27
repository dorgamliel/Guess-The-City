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
      var query_txt = "SELECT local_name, geo_lat, geo_lng FROM around_the_world.cities WHERE iso = " + '"' + iso + '"' + ";"
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
        ///
        console.log(JSON.stringify(result[0]["country_code"]))
        res.write(result[0]["country_code"]);
        res.end();
        ///
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
      // var query_txt = "SELECT country_name, polygon FROM around_the_world.countries ORDER BY RAND() LIMIT 6 ;"
      var query_txt = 'SELECT country_name, polygon FROM around_the_world.countries WHERE country_name="Israel";'
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

// function post_used_city(res, name) {
//   var new_coordinates = "";
//     //Connection establishment
//   var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "123123",
//     database: "around_the_world"
//   });
//     //Connection to DB.
//   con.connect(function(err) {
//     if(!err) {
//       console.log('Database is connected!');
//       console.log("name: " +name);
//       var player_name = name.split("@")[0].replace("$", " ");
//       var guessed_city = name.split("@")[1].replace("$", " ");
//       var query_txt = "INSERT INTO cities_by_players (player_name, city) VALUES (\""+ player_name+"\", \""+ guessed_city+"\");"
//       console.log("Quety txt2: " + query_txt)
//       con.query(query_txt, function (err, result, fields) {
//         console.log(result)
//         console.log(JSON.stringify(result))
//         res.write(JSON.stringify(result));
//         res.end();
//       });

//     } 
//   else {
//     console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
//   }
//   });
// }


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
      var player_name = name.split("@")[0].replace("$", " ");
      var guessed_city = name.split("@")[1].replace("$", " ");
      var iso = name.split("@")[2].replace("$", " ");
      var success = name.split("@")[3].replace("$", " ");
      console.log("ISO: " + iso);
      var query_txt = "INSERT INTO cities_by_players (player_name, city, iso, success) VALUES (\""+ player_name+"\", \""+ guessed_city+"\", \""+ iso+"\", "+ success+");"
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
      var player_name = name.replace("$", " ");
      var query_txt1 = "INSERT INTO around_the_world.cities_success_per_game ( city, count_city, sum_success ) SELECT city, COUNT(city), SUM(success) FROM around_the_world.cities_by_players GROUP BY city;"
      // var query_txt = "INSERT INTO cities_by_players (player_name, city, iso, success) VALUES (\""+ player_name+"\", \""+ guessed_city+"\", \""+ iso+"\", "+ success+");"
      console.log("Quety txt2: " + query_txt1)
      con.query(query_txt1, function (err, result, fields) {
        // console.log("Without stringify: " + result);
        // console.log("With stringify: " + JSON.stringify(result));
        // res.write(JSON.stringify(result));
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
    var player_name = name.replace("$", " ");
    var query_txt2 = "REPLACE INTO around_the_world.cities_success ( id, city_name, num_games, num_success ) SELECT id, city_name, SUM(num_games) AS num_games, SUM(num_success) AS num_success FROM (SELECT * FROM cities_success UNION (SELECT * FROM cities_success_per_game)) as TEST GROUP BY city_name;";
    con.query(query_txt2, function (err, result, fields) {
      console.log(query_txt2);
      // console.log(result)
      // console.log(JSON.stringify(result))
      // res.write(JSON.stringify(result));
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
    var query_txt2 = 'DELETE FROM around_the_world.cities_by_players WHERE player_name="'+player_name+'";';
    //SET SQL_SAFE_UPDATES = 0; TODO
    con.query(query_txt2, function (err, result, fields) {
      console.log(query_txt2);
      // console.log(result)
      // console.log(JSON.stringify(result))
      // res.write(JSON.stringify(result));
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
    var player_name = name.split("@")[0].replace("$", " ");
    var score = name.split("@")[1].replace("$", " ");
    var query_txt2 = 'INSERT INTO around_the_world.scores (player_name, score) VALUES ("'+player_name+'", '+score+');';
    //SET SQL_SAFE_UPDATES = 0; TODO
    con.query(query_txt2, function (err, result, fields) {
      console.log(query_txt2);
      // console.log(result)
      // console.log(JSON.stringify(result))
      // res.write(JSON.stringify(result));
      res.end();
    });
  } 
else {
  console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
}
});
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
    var player_name = name.replace("$", " ");
    var query_txt2 = 'DELETE FROM around_the_world.cities_success_per_game;';
    //SET SQL_SAFE_UPDATES = 0; TODO
    con.query(query_txt2, function (err, result, fields) {
      console.log(query_txt2);
      // console.log(result)
      // console.log(JSON.stringify(result))
      // res.write(JSON.stringify(result));
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
      // console.log(result)
      // console.log(JSON.stringify(result))
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
    var query_txt2 = 'SELECT city_name, ((num_success/num_games)*100) AS average FROM around_the_world.cities_success ORDER BY average DESC LIMIT 10';
    //SET SQL_SAFE_UPDATES = 0; TODO
    con.query(query_txt2, function (err, result, fields) {
      console.log(query_txt2);
      // console.log(result)
      // console.log(JSON.stringify(result))
      res.write(JSON.stringify(result));
      res.end();
    });
  } 
else {
  console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
}
});
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
      console.log("GAME ENDED1");
      end_game(res, name);
      break;
    case "update_cityboard":
      console.log("GAME ENDED2");
      update_cityboard(res, name);
      break;
    case "clear_player_cities":
      console.log("GAME ENDED3");
      clear_player_cities(res, name);
      break;
    case "clear_per_game_table":
      console.log("GAME ENDED3");
      clear_per_game_table(res, name);
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
  }
}).listen(8080);


function fix_spaces(country_name) {
  console.log(country_name)
  country_name = country_name.split("_").join(" ");
  return country_name;
}





// function get_data_from_DB(res) {
//   var new_coordinates = "";
//     //Connection establishment
//   var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "123123",
//     database: "around_the_world"
//   });
//     //Connection to DB.
//   con.connect(function(err) {
//     if(!err) {
//       console.log('Database is connected!');
//       con.query("SELECT polygon FROM countries WHERE id<=2", function (err, result, fields) {
//         new_coordinates = swap_coordinates(result);
//         ///
//         console.log(new_coordinates+"")
//         res.write(new_coordinates+"");
//         res.end();
//         ///
//         return "1";
//       });

//     } 
//   else {
//     console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
//   }
//   });
//   // console.log(new_coordinates);
// }