// var i;
// for (i = 0; i< 5; i++) {
//     var para = document.createElement("div");
//     para.className = "clouds";
//     para.style = "--start: " + i*100 + "px;" + "--finish: " + 100 + "px;";
//     const currentDiv = document.getElementById("clouds")
//     document.body.insertBefore(para, currentDiv); 
// }

var globe = document.createElement("div");
globe.className = "globe";
// globe.style = "--start: " + i*100 + "px;" + "--finish: " + 100 + "px;";
// const currentDiv = document.getElementById("globe")
// document.body.insertBefore(globe, currentDiv); 

document.getElementById("new_game").addEventListener("click", function() {window.location.href = "game.html"})
document.getElementById("leaderboard").addEventListener("click", function() {window.location.href = "leaderboard.html"})
document.getElementById("city_list").addEventListener("click", function() {window.location.href = "citylist.html"})
