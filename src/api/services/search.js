var term = require("../term");
module.exports = async function(c){
	var {tenant,car,from,to,paid} = c.query;
	var rules = [];
	if(tenant){
		rules.push(term(tenant,["tenantName","tenantAddress","tenantPhone","tenantEmail"]));
	}
	if(car){
		rules.push(term(car,["carcarLicencePlate","carBrand","carType","carChassisNumber","carTypeCertificateNumber","carColor"]));
	}
	if(from) rules.push({date:{$gte:parseFloat(from)}})
	if(to) rules.push({date:{$lte:parseFloat(to)}})
	if(paid != "true") rules.push({paymentDate:null})

	var services = await c.db.Service.find(rules.length?{$and:rules}:{});
	c.set("Content-Type","application/json");
	c.body = JSON.stringify(services);
}
