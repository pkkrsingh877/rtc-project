const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');

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

app.listen(8000, () => {
    console.log("The app is listening at port 8000.");
});

