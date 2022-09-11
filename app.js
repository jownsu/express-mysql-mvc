const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const routes = require('./routes')
const profiler = require('./system/Profiler');

const config = require('./config/config');
const sessionConfig = require('./config/session');

const app = express();

app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(session(sessionConfig));
app.use(profiler);
app.use('/', routes);

app.listen(config.port, function(){
    console.log("Listening to port " + config.port);
});

