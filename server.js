require('dotenv').config();
var path         = require('path');
var express      = require('express');
var bodyParser   = require('body-parser');

var app = module.exports = express();

// Config
var ip           = process.env.IP   || '127.0.0.1';
var port         = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// all environments
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Routes
require('./routes/index')(app);
require('./routes/api')(app, bodyParser.json());

// Server Start
app.listen(port, function() {
  console.log('Listening on port', port);
});