var _put = require("./_put.js");
module.exports = async function(c){
	await _put(c,c.params.document,c.req);
	c.status = 200;
}
