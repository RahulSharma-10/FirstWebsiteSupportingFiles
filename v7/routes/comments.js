var express = require("express");
var router  = express.Router({mergeParams: true});
var products = require("../models/products");
var Comment = require("../models/comment");

// =========================
// COMMENT NEW
router.get("/new", isLoggedIn, function(req,res){
	products.findById(req.params.id, function(err, found){
	if(err){
		console.log(err);
	}else{
		res.render("comments/new", {product: found});	
	}
	});
});
// COMMENT SAVE
router.post("/", isLoggedIn, function(req,res){
	products.findById(req.params.id, function(err, foundc){
	if(err){
		console.log(err);
	}else{
		Comment.create(req.body.comments, function(err, comment){
			if(err){
				console.log(err);
			}else{
				console.log(comment);
				foundc.comments.push(comment);
				foundc.save();
				  
				res.redirect("/index/" + foundc._id );
			}
		})
	
	}
	});
});
function isLoggedIn(req,res,next){
			if(req.isAuthenticated()){
		return next();
} 
	res.redirect("/login");
};

module.exports= router;
