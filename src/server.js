const express = require('express');
const route = require('./route');
const path = require('path');
const PORT = 3001;
const server = express();

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));

server.use(express.static('public'));

server.use(express.urlencoded({extended: true}));

server.use(route);

server.listen(PORT, (err) => {
    if(err) {
        console.log(err)
    } else {
        console.log('Server in running at port: ' + PORT);
    }
})