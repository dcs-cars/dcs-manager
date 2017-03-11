var Template = require("docxtemplater");
var moment = require("moment");
var calculateService = require("../../shared/calculateService");
var money = require("../../shared/money.js");
var _get = require("../templates/_get");
var read = require("stream-to-promise");

module.exports = async function(c){

	var service = await c.db.Service.findById(c.params.service);
	calculateService(service);

	var data = {
		receiver:service.tenantName+"\r\n"+service.tenantAddress,
		date: moment().format("L"),
		totalBeforeTax:money.format(service.totalBeforeTax),
		taxAmount:money.format(service.taxAmount),
		total:money.format(service.total),
		services:service.services.map(s=>({
			name:s.description,
			count:money.format(Math.round(s.count*100)+""),
			rate:money.format(s.rate+""),
			total:money.format(s.total+"")
		}))
	};

	var docx = await read(await _get("service_invoice"));

	var template = new Template();
	template.load(docx);
	template.setData(data);
	template.render();
	c.body = template.getZip().generate({type:"nodebuffer"});
	c.set("Content-Type","application/vnd.openxmlformats-officedocument.wordprocessingml.document");
}
