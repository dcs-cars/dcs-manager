var Koa = require("koa");
var mount = require("koa-mount");
var mongoose = require("mongoose");
var files = require("koa-static");
var fs = require("fs");

require("babel-polyfill");

var con = mongoose.connect("mongodb://localhost/dcs");
require("./models")(con);

var app = new Koa();
app.use(mount("/public",files("./public")));
app.use(async function(ctx,next){
	ctx.db = con;
	await next();
});
app.use(mount("/api",require("./api")));
app.use(async function(c){
	c.set("Content-Type","text/html");
	c.body = "<html><head><link rel='stylesheet' href='/public/bootstrap/css/bootstrap.min.css'/><link rel='stylesheet' href='/public/react-widgets/css/react-widgets.css'/><script src='/public/main.js'></script></head><body></body></html>";
})
app.listen(80);
