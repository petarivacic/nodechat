var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(5000);

// Routing
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

// Usernames which are currently connected to the chat
var usernames = {};

io.sockets.on('connection', function (socket) {
  //when the client emits 'sendmessage'
  socket.on('sendmessage', function(data){
    io.sockets.emit('updatemessage', socket.username, data);
  });

  //Add User
  socket.on('adduser', function(username){
    socket.username = username;
    usernames[username] = username;
    socket.emit('updatechat', 'Petar Ivacic', 'you are connected');
    socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
    io.sockets.emit('updateusers', usernames);
  });

socket.on('disconnect', function(){
  delete usernames[socket.username];
  io.sockets.emit('updateusers', usernames);
  socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
});
});



