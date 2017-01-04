var parse = require("co-body");
module.exports = async function(c){
	var rental = new c.db.Rental(await parse.json(c));
	await rental.save();
	c.set("Content-Type","text/plain");
	c.body = rental._id+"";
}
