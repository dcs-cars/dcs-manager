var Koa = require("koa");
var mount = require("koa-mount");
var mongoose = require("mongoose");
var files = require("koa-static");
var auth = require("koa-basic-auth");
var fs = require("fs");

var config = JSON.parse(fs.readFileSync("./config.json")+"");

require("babel-polyfill");

var con = mongoose.connect("mongodb://localhost/dcs");
require("./models")(con);

var auth = auth({ name: 'dcs', pass: config.password });

var app = new Koa();
app.use(async (ctx, next) => {
	try {
		await auth(ctx,async()=>{});
	} catch (err) {
		console.log("failed!")
		if(ctx.query.username  != "dcs" || ctx.query.password != config.password){
			ctx.status = 401;
			ctx.set('WWW-Authenticate', 'Basic');
			return;
		}
	}
	await next(ctx);
});

// require auth
app.use(mount("/public",files("./public")));
app.use(async function(ctx,next){
	ctx.db = con;
	await next();
});
app.use(mount("/api",require("./api")));
app.use(async function(c){
	c.set("Content-Type","text/html");
	c.body = "<html><head><link rel='stylesheet' href='/public/bootstrap/css/bootstrap.min.css'/><link rel='stylesheet' href='/public/react-widgets/css/react-widgets.css'/><script src='/public/main.js'></script><script src='"+config.onlyoffice+"'></script></head><body></body></html>";
})
app.listen(config.port);
