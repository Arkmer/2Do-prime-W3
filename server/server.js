var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.listen(port, function(){
  console.log('listening on port', port);
});

const R1 = require('./routers/R1.js');
app.use('/R1', R1);