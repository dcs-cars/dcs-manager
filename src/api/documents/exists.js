var fs = require("fs");
var _exists = require("./_exists");
module.exports = async function(c){
	if(await _exists(c,c.params.document)){
		c.status = 200;
		c.set("Content-Type","application/vnd.openxmlformats-officedocument.wordprocessingml.document");
	}else{
		c.status = 404;
	}
}
