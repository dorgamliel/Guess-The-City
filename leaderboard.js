document.getElementById("back").addEventListener("click", function() {window.location.href = "index.html"})
window.onload = function() {
    var i;
    var leaderboard = JSON.parse(get_data_from_server());
    if (leaderboard == undefined){
        window.location.href = "index.html";
    } 
    console.log(leaderboard);
    for (i = 2; i < 12; i++) {
        var name = leaderboard[i-2].player_name;
        var score = leaderboard[i-2].max_score;
        var tag1 = document.getElementById(i+"r1c");
        var tag2 = document.getElementById(i+"r2c");
        tag1.innerHTML = name;
        tag2.innerHTML = score;
    }
}

function get_data_from_server() {
    try {
        const Http = new XMLHttpRequest();
        var url = 'http://localhost:8080/' + "get_leaderboard" + "/";
        console.log(url);
        Http.open("GET", url, false);
        Http.send();
        console.log(Http.responseText);
        return Http.responseText;
    } catch(error) {
        console.log("Server disconnected." + error);
        window.location.href = "index.html";
    }

}