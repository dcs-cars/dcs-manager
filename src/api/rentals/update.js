var parse = require("co-body");
module.exports = async function(c){
	await c.db.Rental.findByIdAndUpdate(c.params.rental,await parse.json(c));
	c.status = 200;
}
