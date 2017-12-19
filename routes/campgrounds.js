var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var middleware = require("../middleware");

router.get("/", function(req, res) {

   Campground.find({}, function(err, allcampgrounds) {
      if (err)
         console.log(err);
      else
         res.render("campgrounds/index", { campgrounds: allcampgrounds});
   })

});

router.post("/",middleware.isLoggedIn ,function(req, res) {
   var name = req.body.name;
   var price = req.body.price;
   var image = req.body.image;
   var description = req.body.description;
   console.log(req.user);
   var author = {
      id : req.user._id,
      username : req.user.username
   };
   
   var newCampground = {
      name: name,
      image: image,
      price: price,
      description: description,
      author : author
   };
   
   Campground.create(newCampground , function(err, newlyCreated) {
      if (err) {
         console.log(err);
      }
      else {
         console.log(newlyCreated);
         //console.log("Saved NewCampground to the database");
         req.flash("success","New Campground Added Successfully");
         res.redirect("/campgrounds");
      }
   });

});

router.get("/new",middleware.isLoggedIn,function(req, res) {
   res.render("campgrounds/new");
});



router.get("/:id",middleware.isLoggedIn,function(req, res) {
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
      if (err){
         console.log(err);
      }
      else {
         console.log(foundCampground);
         //render show template with corresponding show file
         res.render("campgrounds/show", { campground: foundCampground });
      }
   });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
  
     Campground.findById(req.params.id,function(err,foundCampground){
         res.render("campgrounds/edit",{campground:foundCampground});
      });  
   
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
   Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
         req.flash("success","Campground details successfully updated!!");
         res.redirect("/campgrounds/"+req.params.id);
   });
      
});

//DELETE CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
   Campground.findByIdAndRemove(req.params.id,function(err,deletedCampground){
      console.log(deletedCampground);
   });
   req.flash("Campground successfully deleted!!");
   res.redirect("/campgrounds");
});

module.exports = router;