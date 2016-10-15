//	------------------------------------------------
//	Modules
//	------------------------------------------------
var express 		= require('express');
var bodyParser 		= require('body-parser');
var mongoose 		= require('mongoose');
var app 			= express();


//	------------------------------------------------
//	Server Configuration
//	------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));



//	------------------------------------------------
//	Database Configuration
//	------------------------------------------------
// var db = require('./config/db');

// mongoose.connect(db.url);



//	------------------------------------------------
//	Routes
//	------------------------------------------------
require('./routes')(app);



//	------------------------------------------------
//	Start app
//	------------------------------------------------
app.listen(3000);
console.log('Server running on port 3000');


//	------------------------------------------------
//	Export app
//	------------------------------------------------
exports = module.exports = app;
