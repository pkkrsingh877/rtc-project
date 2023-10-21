const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const ejsMate = require('ejs-mate');
const socket = require('socket.io');

// static files 
app.use(express.static('public'));

// Setting up socket.io
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// start connection
io.on('connection', (socket) => {
    console.log('a new user connected:', socket.id);

    // listen for incoming messages
    socket.on('chat', (message) => {
        console.log(message);

        // send this to all clients
        io.sockets.emit('chat', message);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

//setting up ejs
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/chatroom', (req, res) => {
    res.render('chatroom/chat');
});

server.listen(8000, () => {
    console.log("The app is listening at port 8000.");
});

