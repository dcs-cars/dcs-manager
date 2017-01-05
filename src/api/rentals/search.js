var term = require("../term");
var convert = require("../../shared/dayConvert");
var fixMonths = require("../../shared/fixMonths");
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

	if(!startFrom && !startTo && !endFrom && !endTo){
		rules.push({$or:[{end:null},{"payments.paymentDate":null}]})
	}

	var rentals = await c.db.Rental.find(rules.length?{$and:rules}:{}).lean();

	if(!startFrom && !startTo && !endFrom && !endTo){
		var today = convert.toDay(moment.utc());
		rentals = rentals.filter(rental=>{
			if(rental.end === null || rental.end >= today) return true;
			fixMonths(rental);
			return rental.payments.filter(payment=>payment.paymentDate === null).length > 0;
		});
	}

	c.set("Content-Type","application/json");
	c.body = JSON.stringify(rentals);
}
