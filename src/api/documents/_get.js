var fs = require("fs");
module.exports = async function(c,name){
	c.set("Content-Type","application/vnd.openxmlformats-officedocument.wordprocessingml.document");

	var template = await c.db.TemplateEntry.findOne({filename:name});
	if(template){
		return c.db.Template.readById(template._id);
	}else{
		return fs.createReadStream("./templates/new.docx");
	}
}
