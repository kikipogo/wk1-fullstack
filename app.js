var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var employeeData = require ('./routes/data.js');

// Handle index file separately
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// APP.USES
app.use(express.static(path.join(__dirname, './public')));

// ADD APP.USES HERE
//middleware
app.use(bodyParser.json());
app.use('/data', employeeData);

// APP.LISTEN
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});
