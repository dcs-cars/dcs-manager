module.exports = async function(c){
	var service = await c.db.Service.findById(c.params.service);
	if(service == null) c.throw(404);
	c.set("Content-Type","application/json");
	c.body = JSON.stringify(service);
}
