module.exports = async function(c,name,stream){
	var id = await new Promise((s,e)=>{
		c.db.Template.write({
			filename:name,
			"Content-Type":"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
		},stream,function(err,createdFile){
			if(err) return e(err);
			s(createdFile);
		})
	});
	var templates = await c.db.TemplateEntry.find({filename:name,_id:{$ne:id}});
	for(var template of templates){
		await new Promise((s,e)=>{
			c.db.Template.unlinkById(template._id,function(err){
				if(err) return e(err);
				s();
			})
		});
	}
}
