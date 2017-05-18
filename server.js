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

var io = require('socket.io').listen(server);

io.on('connection', function(socket) {
    console.log("We are using socket!");
    console.log(socket.id);
});