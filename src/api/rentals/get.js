module.exports = async function(c){
	var rental = await c.db.Rental.findById(c.params.rental);
	if(rental == null) c.throw(404);
	c.set("Content-Type","application/json");
	c.body = JSON.stringify(rental);
}
