// REQUIRE STATEMENTS
var express = require("express"),
   bodyParser = require("body-parser"),
   mongoose = require("mongoose"),
   app = express(),
   flash = require("connect-flash"),
   passport = require("passport"),
   LocalStrategy = require("passport-local"),
   methodOverride = require("method-override"),
   Campground = require("./models/campgrounds"),
   Comment = require("./models/comment"),
   User = require("./models/user"),
   seedDB = require("./seed"),
   
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");


app.use(flash());
//seedDB();

//PASPORT CONFIGURATION
app.use(require("express-session")({
   secret: "I am the best",
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// CONNECTING DATABASE TO APP WITH MONGOOSE    
mongoose.connect("mongodb://localhost/vNew", { useMongoClient: true });
//process.env.DATABASEURL

//mongoose.connect("mongodb://shubhang:Shab#2307@ds123725.mlab.com:23725/yelpcamp", { useMongoClient: true });
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.Promise = global.Promise;

// OTHER SETTINGS
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(function(req,res,next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});
app.use("/campgrounds/:id/comment",commentRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/",indexRoutes);

//======================================================================
app.listen(process.env.PORT, process.env.IP, function() {
   console.log("YelpCamp Server Started");
});
