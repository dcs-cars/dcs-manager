module.exports = async function(c){
	var services = await c.db.Service.find();
	c.set("Content-Type","application/json");
	c.body = JSON.stringify(services);
}
