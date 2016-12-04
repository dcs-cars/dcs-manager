var parse = require("co-body");
module.exports = async function(c){
	var service = new c.db.Service(await parse.json(c));
	await service.save();
	c.set("Content-Type","text/plain");
	c.body = service._id+"";
}
