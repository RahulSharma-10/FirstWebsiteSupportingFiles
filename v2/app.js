var express    = require("express"),
	app        = express(),
	BodyParser = require("body-parser"),
	mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/mood_camp", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(BodyParser.urlencoded({extended:true}))
app.set("view engine", "ejs");

// SCHEMA SETUP
var productSchema= new mongoose.Schema({
	name: String,
	image: String,
	description: String 
})
var prod= mongoose.model("prod", productSchema);
// prod.create({
// 	 name: "Posters", 
// 	 image: "https://www.extremetech.com/wp-content/uploads/2019/12/SONATA-hero-option1-764A5360-edit.jpg",
// 	 description: "Pyaare hai aajao"
// }),function(err,products){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(products);
// 	}
// }
// var product = [
// 		{name: "Posters", image: "https://www.extremetech.com/wp-content/uploads/2019/12/SONATA-hero-option1-764A5360-edit.jpg"},
// 		{name: "T-Shirts", image: "https://www.extremetech.com/wp-content/uploads/2019/12/SONATA-hero-option1-764A5360-edit.jpg"},
// 	{name: "Posters", image: "https://www.extremetech.com/wp-content/uploads/2019/12/SONATA-hero-option1-764A5360-edit.jpg"},
// ]
app.get("/", function(req,res){
	res.render("landing");
})

app.get("/index", function(req,res){

	prod.find({}, function(err,prod){
		if(err){
			console.log(err);
		}else{
			res.render("index", {product: prod});
		}
	})	
	// res.render("products", {product: product});
});
app.post("/index", function(req,res){
	var name= req.body.name;
	var image= req.body.image;
	var newObject={name: name, image: image};
	prod.create(newObject,function(err,prod){
		if(err){
			console.log(err);
		}else{
			console.log(newObject);
		}
	})
	res.redirect("/index");
});

app.get("/index/new", function(req,res){
	res.render("new.ejs");
});
app.get("/index/:id", function(req,res){
	//detect the id and get the product
	prod.findById(req.params.id, function(err, foundId){
		if(err){
			console.log(err);
		} else {		
			res.render("show",{prod: foundId});
		}
	})
	//render show template
	
	
});

app.listen(3000, function(req,res){
	console.log("Connected");
});