module.exports = function(service){
	service.total = 0;
	for(var s of service.services){
		if(s.count >= 0 && s.rate != 0){
			s.total = s.count*s.rate;
		}else{
			s.total = 0;
		}
		service.total += s.total;
	}
	service.totalBeforeTax = service.total;
	service.taxAmount = service.total*0.08;
	service.total += service.taxAmount;
}
