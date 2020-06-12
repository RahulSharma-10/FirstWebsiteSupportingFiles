var products = require("../models/products");
var Comment = require("../models/comment");
var obj = {};

obj.checkProductOwnership = function(req,res,next){
	if(req.isAuthenticated()){
			products.findById(req.params.id, function(err, foundId){
		 	if(err){
			res.redirect("back");
			} else {		
			
	//CHECK IF HE OWNS THE PRODUCT
				if(foundId.author.id.equals(req.user._id)){
				  next();
					
				}else{
					alert("You are not LoggedIn");
				res.render("back");
				}
		}});
	}else{
		res.redirect("back");
	}
};

obj.checkCommentOwnership = function(req,res,next){
	if(req.isAuthenticated()){
			Comment.findById(req.params.comment_id, function(err, foundId){
		 	if(err){
			res.redirect("back");
			} else {		
			
	//CHECK IF HE OWNS THE PRODUCT
				if(foundId.author.id.equals(req.user._id)){
				  next();
					
				}else{
					
				res.render("back");
				}
		}});
	}else{
		res.redirect("back");
	}
};

obj.isLoggedIn = function(req,res,next){
		if(req.isAuthenticated()){
		return next();
} 
	res.redirect("/login");
};

module.exports = obj;

