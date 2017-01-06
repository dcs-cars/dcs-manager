var Template = require("docxtemplater");
var fs = require("fs");
var parse = require("co-body");
var router = require("koa-router")();

module.exports = router.post("/:template/render",async function(c){
	var data = await parse.json(c);
	try{
		var docx = await new Promise((s,e)=>fs.readFile("./templates/"+c.params.template+".docx",(err,data)=>err?e(err):s(data)));
	}catch(e){
		c.throw(404);
	}
	var template = new Template();
	template.load(docx);
	template.setData(data);
	template.render();
	c.body = template.getZip().generate({type:"nodebuffer"});
	c.set("Content-Type","application/vnd.openxmlformats-officedocument.wordprocessingml.document");
}).middleware()
