var fs = require("fs");
module.exports = async function(c,name){
	var template = await c.db.TemplateEntry.findOne({filename:name});
	if(template){
		await new Promise((s,e)=>{
			c.db.Template.unlinkById(template._id,function(err){
				if(err) return e(err);
				s();
			});
		});
	}
}
