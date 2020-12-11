var mysql = require('mysql');

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
      var new_coordinates = swap_coordinates(result);
    });
  } 
else
    console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
});

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
  console.log(new_arr)
}