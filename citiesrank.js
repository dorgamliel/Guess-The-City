document.getElementById("back").addEventListener("click", function() {window.location.href = "index.html"})
window.onload = function() {
    var i;
    var cities_rank = JSON.parse(get_data_from_server());
    console.log(cities_rank);
    for (i = 2; i < 6; i++) {
        var name = cities_rank[i-2].city_name;
        var score = cities_rank[i-2].average;
        var tag1 = document.getElementById(i+"r1c");
        var tag2 = document.getElementById(i+"r2c");
        tag1.innerHTML = name;
        tag2.innerHTML = score;
    }
}

function get_data_from_server() {
    const Http = new XMLHttpRequest();
        var url = 'http://localhost:8080/' + "get_cities_rank" + "/";
        console.log(url);
        Http.open("GET", url, false);
        Http.send();
        console.log(Http.responseText);
        return Http.responseText;
}