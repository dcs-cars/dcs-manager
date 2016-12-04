module.exports = async function(c){
	var sales = await c.db.Sale.find();
	c.set("Content-Type","application/json");
	c.body = JSON.stringify(sales);
}
