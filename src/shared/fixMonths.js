var moment = require("moment");
var convert = require("./dayConvert");

module.exports = function(rental){
	if(!rental.start) return;
	var start = convert.toDate(rental.start).startOf("month");
	var end = rental.end?convert.toDate(rental.end).startOf("month"):moment.utc().startOf("month");
	var months = [];
	while(start.isSame(end)|| start.isBefore(end)){
		months.push(start.format("YYYY.MM"));
		start.add(1,"month");
	}
	for(var i = 0; i < rental.payments.length; i++){
		if(months.indexOf(rental.payments[i].month) < 0) rental.payments.splice(i--,1);
	}
	for(var i = 0; i < months.length; i++){
		if(!rental.payments[i] || rental.payments[i].month != months[i]) rental.payments.splice(i,0,{month:months[i],paymentDate:null});
	}
}
