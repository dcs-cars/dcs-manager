var parse = require("co-body");
var request = require("request-promise");
var get = require("../templates/__get");
var toStream = require("string-to-stream");
module.exports = async function(c){
	var body = await parse.json(c);
	if(body.status === 2){
		console.log("saving")
		var res = await request({uri:body.url});
		var template = await get(c.db,"service_invoice")
		await new Promise((s,e)=>{
			template.write(toStream(res),(err)=>{
				console.log("err",err)
				if(err) return e();
				s();
			})
		});
		console.log("done")
	}

	c.set("Content-Type","application/json");
	c.body = JSON.stringify({error:0})

}
