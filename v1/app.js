var express= require("express");
var app= express();
var BodyParser = require("body-parser")



app.use(BodyParser.urlencoded({extended:true}))
app.set("view engine", "ejs");
var product = [
		{name: "Posters", image: "https://www.extremetech.com/wp-content/uploads/2019/12/SONATA-hero-option1-764A5360-edit.jpg"},
		{name: "T-Shirts", image: "https://www.extremetech.com/wp-content/uploads/2019/12/SONATA-hero-option1-764A5360-edit.jpg"},
	{name: "Posters", image: "https://www.extremetech.com/wp-content/uploads/2019/12/SONATA-hero-option1-764A5360-edit.jpg"},
]
app.get("/", function(req,res){
	res.render("landing");
})

app.get("/products", function(req,res){

		
	res.render("products", {product: product});
});
app.post("/products", function(req,res){
	var name= req.body.name;
	var image= req.body.image;
	var newObject={name: name, image: image};
	product.push(newObject);
	res.redirect("/products");
});

app.get("/products/new", function(req,res){
	res.render("new.ejs");
});

app.listen(3000, function(req,res){
	console.log("Connected");
});