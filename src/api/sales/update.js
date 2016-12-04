var parse = require("co-body");
module.exports = async function(c){
	await c.db.Sale.findByIdAndupdate(c.params.sale,await parse.json(body));
	c.status = 200;
}
