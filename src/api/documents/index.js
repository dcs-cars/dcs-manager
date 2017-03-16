var router = require("koa-router")();

module.exports = router
	.head("/:document",require("./exists"))
	.get("/:document",require("./get"))
	.put("/:document",require("./put"))
	.delete("/:document",require("./delete"))
	.middleware()
