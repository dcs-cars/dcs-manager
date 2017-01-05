var parse = require("co-body");
module.exports = async function(c){
	await c.db.Sale.findByIdAndUpdate(c.params.sale,await parse.json(c));
	c.status = 200;
}
