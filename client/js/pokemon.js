

 $(document).ready(function() {

     //add in code to create dropdown for autocomplete

     // this triggers the connection event in our server!
     var socket = io.connect();
     // we'll write all the socket stuff after the above line!

     $('#searchInput').keyup(function () {
         var searchString = $('#searchInput').val();
         if (searchString.length > 1) {
             socket.emit("searchKey", {name: searchString});
         }
     });

     socket.on('searchResults', function (data) {
         console.log('The server says: ' + data.response);

         var listHTML;
         for (let i = 0; i < data.response.length; i++) {
             listHTML += `<option value=${data.response[i].name}>`;
         }

         $('#searchOptions').html(listHTML);


     });

     function fillPokemonInfo() {

         $("#emptyPokedex").html("");

         console.log(id);


         $.get("http://pokeapi.co/api/v1/pokemon/" + id + "/", function (res) {
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
     };
 })