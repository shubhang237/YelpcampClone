var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req,res,next){
   if(req.isAuthenticated())
   {
      return next();
   }
   req.flash("error","You Need to Login!!");
   res.redirect("/login");
}

middlewareObj.checkCampgroundOwnership = function(req,res,next)
{
   if(req.isAuthenticated())
   {
     Campground.findById(req.params.id,function(err,foundCampground){
       if(err)
       {
          req.flash("error","Campground not found");
          res.redirect("back");
       }
       else
       {
         if(foundCampground.author.id.equals(req.user._id)){
           return next();
         }
         else
         {
           req.flash("error","Sorry the campground does'nt belong to you!!");
           res.redirect("back");
         }
       }
      });  
   }
   else
   {
      req.flash("error","You are not allowed to do that!!");
      res.redirect("back");
   }
}

middlewareObj.checkCommentOwnership = function(req,res,next)
{
   if(req.isAuthenticated())
   {
     Comment.findById(req.params.comment_id,function(err,foundComment){
       if(err)
       {
          req.flash("error","comment not found");
          res.redirect("back");
       }
       else
       {
          //problem coming here with the id
         if(foundComment.author.username === req.user.username){
           return next();
         }
         else
         {
            req.flash("error","Sorry you did not make the comment!!");
           res.redirect("back");
         }
       }
      });  
   }
   else
   {
      req.flash("error","You are not supposed to do that!!");
      res.redirect("back");
   }
}


module.exports = middlewareObj;