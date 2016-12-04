module.exports = async function(c){
	await c.db.Sale.findByIdAndRemove(c.params.sale);
	c.status = 200;
}
