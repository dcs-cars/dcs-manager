var fs = require("fs");
var _get = require("./_get");
module.exports = async function(c){
	c.set("Content-Type","application/vnd.openxmlformats-officedocument.wordprocessingml.document");
	c.body = await _get(c,c.params.document);
}
