var express = require("express");
var router = express.Router({mergeParams : true});
var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");
var middleware = require("../middleware");
//comment routes

router.get("/new", middleware.isLoggedIn,function(req, res) {

   Campground.findById(req.params.id, function(err, foundCampground) {
      if (err)
         console.log(err);
      else {
         //console.log(foundCampground);
         res.render("comments/new", { campground: foundCampground });
      }
   });
});

router.post("/", middleware.isLoggedIn , function(req, res) {
   Campground.findById(req.params.id, function(err, foundCampground) {
      if (err)
         console.log(err);
      else {
         var text = req.body.text;
         var author = req.body.author;
         Comment.create({
            text: text,
            author: author
         }, function(err, comment) {
            if (err) {
               console.log(err);
            }
            else {
               comment.author._id = req.user._id;
               comment.author.username = req.user.username;
               comment.save();
               console.log("Saved NewComment to the database");
              // console.log(comment);
               foundCampground.comments.push(comment);
               foundCampground.save();
               req.flash("success","Comment successfully added!!");
               res.redirect("/campgrounds/" + foundCampground._id);
            }
         });
      }
   });
});

//EDIT ROUTE FOR COMMENT
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
   
   Comment.findById(req.params.comment_id,function(err, foundComment) {
      if(err)
      console.log("-1");
      else
   res.render("comments/edit",{campground_id: req.params.id, comment: foundComment});    
   });
   
});

//UPDATE ROUTE FOR COMMENT
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
   Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
      if(err)
      {
         req.flash("error","Comment could not be updated");
         res.redirect("back");
      }
      else
      {
         req.flash("success","Comment successfully updated!!!");
         res.redirect("/campgrounds/"+req.params.id);
      }
   })
});

//DELETE ROUTE FOR COMMENT
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
   Comment.findByIdAndRemove(req.params.comment_id,function(err,updatedComment){
      if(err)
      {
         res.redirect("back");   
      }
      req.flash("success","Comment successfully deleted");
      res.redirect("/campgrounds/"+req.params.id);
   })
})

module.exports = router;
