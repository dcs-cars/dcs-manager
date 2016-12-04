module.exports = async function(c){
	await c.db.Service.findByIdAndRemove(c.params.service);
	c.status = 200;
}
