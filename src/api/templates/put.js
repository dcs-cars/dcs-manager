var get = require("./__get");
module.exports = async function(c){
	var template = await get(c.db,c.params.template);
	await new Promise((s,f)=>{
		template.write(c.req,(err)=>{
			if(err) return f(err);
			s();
		});
	});

	c.status = 200;
}
