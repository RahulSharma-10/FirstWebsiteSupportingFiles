var express    = require("express"),
	app        = express(),
	BodyParser = require("body-parser"),
	mongoose   = require("mongoose");
	passport   = require("passport");
	LocalStrategy = require("passport-local")
	products   = require("./models/products");
	Comment	   = require("./models/comment");
	User	   = require("./models/user");
	seedDB     = require("./seeds");


mongoose.connect("mongodb://localhost/mood_camp", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(BodyParser.urlencoded({extended:true}))
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
seedDB();
//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Nandu",
	resave: false,
	saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser= req.user;
	next();
});

app.get("/", function(req,res){
	res.render("landing");
})

app.get("/index", function(req,res){
	
	
	products.find({}, function(err,prod){
		if(err){
			console.log(err);
		}else{
			res.render("products/index", {product: prod, currentUser: req.user});
		}
	});	
	// res.render("products", {product: product});
});
app.post("/index", function(req,res){
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

app.get("/index/new", function(req,res){
	res.render("products/new");
});
app.get("/index/:id", function(req,res){
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

// =========================
// COMMENT ROUTES
app.get("/index/:id/comments/new", isLoggedIn, function(req,res){
	products.findById(req.params.id, function(err, found){
	if(err){
		console.log(err);
	}else{
		res.render("comments/new", {product: found});	
	}
	});
});
app.post("/index/:id/comments", isLoggedIn, function(req,res){
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
// ==================
//AUTH ROUTES
// =========
app.get("/register",function(req,res){
	res.render("register");
});
//ROUTE FOR SIGNUP LOGIC
app.post("/register",function(req,res){
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
app.get("/login",function(req,res){
	res.render("login");
});
//ROUTE FOR LOGIN LOGIC
app.post("/login",passport.authenticate("local",
	{successRedirect:"/index", 
	 failureRedirect:"/login"}), function(req,res){
	
});
app.get("/logout", function(req,res){
	req.logout();
	res.redirect("/index");
});

function isLoggedIn(req,res,next){
			if(req.isAuthenticated()){
		return next();
} 
	res.redirect("/login");
};

app.listen(3000, function(req,res){
	console.log("Connected");
});