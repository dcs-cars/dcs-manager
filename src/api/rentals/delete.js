module.exports = async function(c){
	await c.db.Rental.findByIdAndRemove(c.params.rental);
	c.status = 200;
}
