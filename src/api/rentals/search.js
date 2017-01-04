var term = require("../term");
var dayConvert = require("../../client/dayConvert");
var moment = require("moment");
module.exports = async function(c){
	var {property,tenant,startFrom,startTo,endFrom,endTo} = c.query;
	var rules = [];
	if(property){
		rules.push(term(car,["propertyName"]));
	}
	if(tenant){
		rules.push(term(tenant,["tenantName","tenantAddress","tenantPhone","tenantEmail"]));
	}
	if(startFrom) rules.push({start:{$gte:parseFloat(startFrom)}})
	if(startTo) rules.push({start:{$lte:parseFloat(startTo)}})
	if(endFrom) rules.push({end:{$gte:parseFloat(endFrom)}})
	if(endTo) rules.push({end:{$lte:parseFloat(endTo)}})
	if(!endFrom && !endTo){
		rules.push({$or:[{end:null},{end:{$gte:dayConvert.toDay(moment())}}]})
	}

	var rentals = await c.db.Rental.find(rules.length?{$and:rules}:{});
	c.set("Content-Type","application/json");
	c.body = JSON.stringify(rentals);
}
