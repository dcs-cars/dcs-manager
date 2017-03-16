var fs = require("fs");
module.exports = async function(c,name){
	return await c.db.TemplateEntry.findOne({filename:name})?true:false;
}
