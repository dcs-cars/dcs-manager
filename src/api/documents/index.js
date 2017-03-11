var router = require("koa-router")();

module.exports = router
	.post("/save",require("./save"))
	.middleware()
