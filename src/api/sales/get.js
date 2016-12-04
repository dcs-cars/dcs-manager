module.exports = async function(c){
	var sale = await c.db.Sale.findById(c.params.sale);
	if(sale == null) c.throw(404);
	c.set("Content-Type","application/json");
	c.body = JSON.stringify(sale);
}
