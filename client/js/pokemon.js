

 $(document).ready(function() {

    //add in code to create dropdown for autocomplete
    


    $('form').submit(function(){
        console.log($(this).serialize());
        var pokeName = $(this).serialize();

        console.log(pokeName);

        var id = pokemon.getId(pokeName);

         $("#emptyPokedex").html("");

         console.log(id);


         $.get("http://pokeapi.co/api/v1/pokemon/" + id + "/", function(res) {
             $("#emptyPokedex").append("<h2>" + res.name + "</h2>");

             var html_str = "";
             html_str += "<h4>Types</h4>";
             html_str += "<ul>";
             for (var i = 0; i < res.types.length; i++) {
                 html_str += "<li>" + res.types[i].name + "</li>";
             }
             html_str += "</ul>";
             $("#emptyPokedex").append(html_str);

             html_str = "";
             html_str += "<h4>Height</h4>";
             html_str += res.height;
             $("#emptyPokedex").append(html_str);


             html_str = "";
             html_str += "<h4>Weight</h4>";
             html_str += res.weight;
             $("#emptyPokedex").append(html_str);

         }, "json");

     });

 });