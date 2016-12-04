var router = require("koa-router");

module.exports = router()
	.get("",require("./search"))
	.post("",require("./create"))
	.get("/:sale",require("./get"))
	.patch("/:sale",require("./update"))
	.delete("/:sale",require("./delete"))
	.middleware()
