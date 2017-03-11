var fs = require("fs");
var get = require("./__get");
module.exports = async function(db,name){
	var template = await get(db,name);
	return template._id?template.read():fs.createReadStream("./templates/new.docx");
}
