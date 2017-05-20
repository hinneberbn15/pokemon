var express = require('express');
var app = express();
var bp = require('body-parser');
var path = require('path');
var port = 8000;
const pokemon = require('pokemon');

app.use(express.static(path.join(__dirname + '/client/')));
app.use(bp.urlencoded({ extended: true }));
app.set('views', path.join(__dirname + '/client/templates/'));
app.set('view engine', 'ejs');

require('./server/config/routes.js')(app);

var server = app.listen(port, function() {
    console.log('server is listening on port 8000');
});

//setup new socket on server that we setup and have running called "server" and monitor that port
var io = require('socket.io').listen(server);

//capture any connections to our server from clients and do things here based on those client connections.
io.on('connection', function(socket) {
    console.log("We are using socket!");
    console.log(socket.id);

    //if the client has sent the event "searchKey" to our socket then execute the call back function passing in the request information
    //via "data" parameter
    socket.on("searchKey", function (data){
        //create an array with all pokemon names
        var pokemonList = pokemon.all();
        //create an empty object with the pokemon id and name to be filled later.
        var pokemonObjects = [{id: null, name: null}];
        //create a new array that will eventually contain pokemon objects with id and name for sending back to the client to
        //be used to update the search dropdown list options.
        var searchResults = [];

        //goes through the list of pokemon names and checks to see if the name starts with what the user input so far
        //if there is a match, then the id of that pokemon is retrieved and an object for that pokemon pushed to the array
        for(let i=0; i<pokemonList.length;i++){
            if(pokemonList[i].toLowerCase().startsWith(data.name.toLowerCase())){
                searchResults.push({
                    id: pokemon.getId(pokemonList[i]),
                    name: pokemonList[i],
                });
            }
        }
        console.log(searchResults);

        console.log('Someone clicked a button!  Reason: ' + data.name);

        //emits an event back to the client called searchResults that the client will use to know when to update the dropdown list
        socket.emit('searchResults', {response: searchResults});
    })
});

