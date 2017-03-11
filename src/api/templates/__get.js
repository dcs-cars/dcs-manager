var fs = require("fs");
module.exports = async function(db,name){
	var template = new db.Template({
		filename:name+".docx",
		contentType:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
	});
	template.write = async function(stream){
		var templates = await db.TemplateEntry.find({filename:name+".docx"}).toArray();
		await new Promise((s,f)=>{
			this.__proto__.write.bind(this)(stream,(err)=>{
				if(err) return f(err);
				s();
			});
		});
		await Promise.all(templates.map(t,async()=>{
			await new Promise((s,f)=>{
				db.Template.unlinkById(t._id,(err)=>{
					if(err) return f(err);
					s();
				});
			});
		}));
	}
}
