var express = require("express");
var router  = express.Router();
var passport= require("passport");
var User=    require("../models/user")


router.get("/", function(req,res){
	res.render("landing");
})
// ==================
//AUTH ROUTES
// =========
router.get("/register",function(req,res){
	res.render("register");
});
//ROUTE FOR SIGNUP LOGIC
router.post("/register",function(req,res){
	var newUser= (new User({username: req.body.username}));
	User.register(newUser, req.body.password,function(err,user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req,res, function(){
			res.redirect("/index");
		})
	});
	
});
//show login form
router.get("/login",function(req,res){
	res.render("login");
});
//ROUTE FOR LOGIN LOGIC
router.post("/login",passport.authenticate("local",
	{successRedirect:"/index", 
	 failureRedirect:"/login"}), function(req,res){
	
});
router.get("/logout", function(req,res){
	req.logout();
	res.redirect("/index");
});
//MIDDLEWARE
function isLoggedIn(req,res,next){
			if(req.isAuthenticated()){
		return next();
} 
	res.redirect("/login");
};

module.exports= router;