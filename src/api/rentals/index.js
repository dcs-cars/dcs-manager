var router = require("koa-router");

module.exports = router()
	.get("",require("./search"))
	.post("",require("./create"))
	.get("/:rental",require("./get"))
	.patch("/:rental",require("./update"))
	.delete("/:rental",require("./delete"))
	.middleware()
