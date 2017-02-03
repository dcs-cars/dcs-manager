var Template = require("docxtemplater");
var fs = require("fs");

module.exports = async function(template,data){
	var template = new Template();
	template.load(await new Promise((s,e)=>fs.readFile("./templates/"+template+".docx",(err,data)=>err?e(err):s(null,data)));
	template.setData(data);
	template.render();
	return template.getZip().generate({type:"nodebuffer"}));
}
