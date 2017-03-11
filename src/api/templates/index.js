var router = require("koa-router")();

module.exports = router
	.get("/:template",require("./get"))
	.put("/:template",require("./put"))
.middleware()
