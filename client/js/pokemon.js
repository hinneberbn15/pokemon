

 $(document).ready(function() {

     //add in code to create dropdown for autocomplete

     // this triggers the connection event in our server!
     var socket = io.connect();
     // we'll write all the socket stuff after the above line!


     $('#searchInput').bind("input",function () {
         var searchString = $('#searchInput').val();
         if (searchString.length > 1) {
             socket.emit("searchKey", {name: searchString});
             //every time user enters a key, send an event "searchKey" to the server along with what the user has typed so far.
             //the server will use the data to see if there are matches.
         }
     });

     //socket performs the function when it receives the searchResults event back from the server
     socket.on('searchResults', function (data) {
         console.log('The server says: ' + data.response);

         var listHTML;
         //builds the updated option list based on the array of pokemon objects received from the server.
         if(data.response.length!=1) {
             $("#emptyPokedex").html("");
             for (let i = 0; i < data.response.length; i++) {
                 listHTML += `<option value=${data.response[i].name}>`;
             }
             $('#searchOptions').html(listHTML);
         }else{

             //fills the pokemon information via the pokemon api if the result is now down to one, passes in the ID
             fillPokemonInfo(data.response[0].id);
         }
     });


     //function to populate the details of a pokemon given an ID.
     function fillPokemonInfo(id) {

         $("#emptyPokedex").html("");

         console.log(id);

         $.get("http://pokeapi.co/api/v1/pokemon/" + id + "/", function (res) {
             $("#emptyPokedex").append("<h2>" + res.name + "</h2>");

             var html_str = "";
             html_str += `<img src="/img/pokemon/${id}.png" alt="${res.name}">`
             html_str += "<h4>Types</h4>";
             for (var i = 0; i < res.types.length; i++) {
                 html_str += "<p>" + res.types[i].name + "</p>";
             }
             $("#emptyPokedex").append(html_str);

             html_str = "<br>";
             html_str += "<h4>Height</h4>";
             html_str += res.height;
             $("#emptyPokedex").append(html_str);


             html_str = "<br><br>";
             html_str += "<h4>Weight</h4>";
             html_str += res.weight;
             $("#emptyPokedex").append(html_str);

         }, "json");
     };
 })