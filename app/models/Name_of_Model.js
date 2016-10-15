//	------------------------------------------------
//	Modules
//	------------------------------------------------
var mongoose = require('mongoose');


//	------------------------------------------------
//	Schema
//	------------------------------------------------
var Name_of_SchemaSchema = mongoose.Schema({
	firstname: String,
}, {collection: 'name_of_db'});

module.exports = mongoose.model('Model_Name', Name_Of_SchemaSchema);

