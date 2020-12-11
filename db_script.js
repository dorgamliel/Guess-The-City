// import mysql from "mysql";
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123123",
  database: "around_the_world"
});
// console.log(con);
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




var zevel = '[ [ -69.996937628999916, 12.577582098000036 ], [ -69.936390753999945, 12.531724351000051 ], [ -69.924672003999945, 12.519232489000046 ], [ -69.915760870999918, 12.497015692000076 ], [ -69.880197719999842, 12.453558661000045 ], [ -69.876820441999939, 12.427394924000097 ], [ -69.888091600999928, 12.417669989000046 ], [ -69.908802863999938, 12.417792059000107 ], [ -69.930531378999888, 12.425970770000035 ], [ -69.945139126999919, 12.44037506700009 ], [ -69.924672003999945, 12.44037506700009 ], [ -69.924672003999945, 12.447211005000014 ], [ -69.958566860999923, 12.463202216000099 ], [ -70.027658657999922, 12.522935289000088 ], [ -70.048085089999887, 12.531154690000079 ], [ -70.058094855999883, 12.537176825000088 ], [ -70.062408006999874, 12.546820380000057 ], [ -70.060373501999948, 12.556952216000113 ], [ -70.051096157999893, 12.574042059000064 ], [ -70.048736131999931, 12.583726304000024 ], [ -70.052642381999931, 12.600002346000053 ], [ -70.059641079999921, 12.614243882000054 ], [ -70.061105923999975, 12.625392971000068 ], [ -70.048736131999931, 12.632147528000104 ], [ -70.00715084499987, 12.5855166690001 ], [ -69.996937628999916, 12.577582098000036 ] ]';


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

  // console.log(typeof(coord_arr));
  // console.log(coord_arr);
  // a.forEach(element => {
  //     temp = element[0];
  //     element[0] = element[1];
  //     element[1] = temp;
  // });
  // console.log(coordinates);
}