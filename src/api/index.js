var router = require("koa-router");
var mount = require("koa-mount");
var compose = require("koa-compose");

module.exports = compose([
	mount("/rentals",require("./rentals")),
	mount("/sales",require("./sales")),
	mount("/services",require("./services")),
	mount("/documents",require("./documents")),
	router().get("/password",async function(c){
		c.body = c.config.password;
	}).middleware()
]);
