var fs = require("fs");
var _delete = require("./_delete");
module.exports = async function(c){
	await _delete(c,c.params.document);
	c.status = 200;
}
