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

function get_data_from_DB(res) {
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
      con.query("SELECT polygon FROM countries WHERE id<=2", function (err, result, fields) {
        new_coordinates = swap_coordinates(result);
        ///
        console.log(new_coordinates+"")
        res.write(new_coordinates+"");
        res.end();
        ///
        return "1";
      });

    } 
  else {
    console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
  }
  });
  // console.log(new_coordinates);
}



//Server creation.
http.createServer(function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.writeHead(200, {'Content-Type': 'text/html'});
  var data = get_data_from_DB(res);
}).listen(8080);