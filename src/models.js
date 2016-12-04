var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var Mixed = mongoose.Schema.Types.Mixed;

module.exports = function(db){
	db.Rental = db.model("rentals",{
		tenantName:String,
		tenantAddress:String,
		tenantPhone:String,
		tenantEmail:String,

		propertyName:String,

		start:Number,
		end:Number,
		amount: Number,
		payments:[{
			month: Number,
			paymentDate: Number
		}]
	});

	db.Sale = db.model("sale",{
		tenantName:String,
		tenantAddress:String,
		tenantPhone:String,
		tenantEmail:String,

		carBrand:String,
		carType:String,
		carChassisNumber:String,
		carTypeCertificateNumber:String,
		carColor: String,
		carKms: Number,

		notes:String,
		date: Number,
		amount: Number,
		warranty: String
	});

	db.Service = db.model("services",{
		tenantName: String,
		tenantAddress: String,
		tenantPhone: String,
		tenantEmail: String,

		carLicencePlate:String,
		carBrand:String,
		carType:String,
		carChassisNumber:String,
		carTypeCertificateNumber:String,
		carColor: String,

		insuranceCompany:String,
		services:[{
			_id: false,
			description: String,
			count: Number,
			rate: Number,
			total: Number
		}],
		total: String,
		date: Number,
		dueDate: Number,
		paymentDate: Number,
		notes: String
	})
}
