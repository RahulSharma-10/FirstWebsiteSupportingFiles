var express = require("express");
var router  = express.Router();
var products = require("../models/products");

router.get("/", function(req,res){
	
	
	products.find({}, function(err,prod){
		if(err){
			console.log(err);
		}else{
			res.render("products/index", {product: prod, currentUser: req.user});
		}
	});	
	// res.render("products", {product: product});
});
router.post("/", function(req,res){
	var name= req.body.name;
	var image= req.body.image;
	var desc = req.body.description;
	var newObject={name: name, image: image, description: description};
	products.create(newObject,function(err,prod){
		if(err){
			console.log(err);
		}else{
			res.redirect("products/index");
		}
	})
});

router.get("/new", function(req,res){
	res.render("products/new");
});
router.get("/:id", function(req,res){
	//detect the id and get the product
	products.findById(req.params.id).populate("comments").exec(function(err, foundId){
		if(err){
			console.log(err);
		} else {		
			console.log(foundId);
			res.render("products/show",{products: foundId});
		}
	});
	//render show template	
});


module.exports= router;