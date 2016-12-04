var parse = require("co-body");
module.exports = async function(c){
	await c.db.Service.findByIdAndUpdate(c.params.service,await parse.json(c));
	c.status = 200;
}
