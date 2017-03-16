var router = require("koa-router");

module.exports = router()
	.get("",require("./search"))
	.post("",require("./create"))
	.get("/:service",require("./get"))
	.patch("/:service",require("./update"))
	.delete("/:service",require("./delete"))
	.middleware()
