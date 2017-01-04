var term = require("../term");
module.exports = async function(c){
	var {tenant,car,from,to,kmFrom,kmTo} = c.query;
	var rules = [];
	if(tenant){
		rules.push(term(tenant,["tenantName","tenantAddress","tenantPhone","tenantEmail"]));
	}
	if(car){
		rules.push(term(car,["carBrand","carType","carChassisNumber","carTypeCertificateNumber","carColor"]));
	}
	if(from) rules.push({date:{$gte:parseFloat(from)}})
	if(to) rules.push({date:{$lte:parseFloat(to)}})
	if(!from && !to){
		rules.push({date:null})
	}
	if(kmFrom) rules.push({carKms:{$gte:parseFloat(kmFrom)}})
	if(kmTo) rules.push({carKms:{$lte:parseFloat(kmTo)}})

	var sales = await c.db.Sale.find(rules.length?{$and:rules}:{});
	c.set("Content-Type","application/json");
	c.body = JSON.stringify(sales);
}
