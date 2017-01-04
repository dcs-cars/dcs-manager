var parse = require("co-body");
module.exports = async function(c){
	await c.db.Rental.findByIdAndupdate(c.params.rental,await parse.json(body));
	c.status = 200;
}
