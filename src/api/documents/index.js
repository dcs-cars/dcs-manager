var router = require("koa-router")();

module.exports = router
	.get("/:document",require("./get"))
	.put("/:document",require("./put"))
	.middleware()
