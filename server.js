var express = require('express');
var app = express();
var bp = require('body-parser');
//var io = require('socket.io').listen(app);
var path = require('path');
var port = 8000;
const pokenmon = require('pokemon');


app.use(express.static(path.join(__dirname + '/client/')));
app.use(bp.urlencoded({ extended: true }));
app.set('views', path.join(__dirname + '/client/templates/'));
app.set('view engine', 'ejs');
require('./server/config/routes.js')(app);

app.listen(port, function() {
    console.log('server is on');
    console.log(pokenmon.all());
})

// io.sockets.on('connection', function(socket) {
//     console.log("We are using socket!");
//     console.log(socket.id);
// })