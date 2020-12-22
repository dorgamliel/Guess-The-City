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
      var query_txt = "SELECT country_name, polygon FROM around_the_world.countries ORDER BY RAND() LIMIT 18 ;"
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



//Server creation.
http.createServer(function (req, res) {
  var type = req.url.split("/")[1]
  var name = req.url.split("/")[2]
  name = fix_spaces(name);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.writeHead(200, {'Content-Type': 'text/html'});
  switch (type) {
    case "iso":
      get_iso_from_countries(res, name);
      break;
    case "cities":
      get_cities_by_iso(res, name);
      break;
    case "countries":
      get_random_countries(res, name);
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