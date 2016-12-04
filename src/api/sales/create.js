var parse = require("co-body");
module.exports = async function(c){
	var sale = new c.db.Sale(await parse.json(c));
	await sale.save();
	c.set("Content-Type","text/plain");
	c.body = sale._id+"";
}
