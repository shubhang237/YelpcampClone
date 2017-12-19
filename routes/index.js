var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

var nodemailer = require('nodemailer');

//ROUTES
router.get("/", function(req, res) {
    res.render("landing");
});

//Auth Routes
//register routes
router.get("/register", function(req, res) {
    res.render("register");
});


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shubhang.dtucoe@gmail.com',
        pass: 'Shab#2307'
    }
});



router.post("/register", function(req, res) {
    var newUser = new User({ username: req.body.username, email: req.body.email });
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
            var mailOptions = {
                from: 'shubhang.dtucoe@gmail.com',
                to: user.email,
                subject: 'Thanks for registering with us',
                text: 'Thanks for enrolling to our services. Wish u stay for life with us!!!'
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });

        });
    });
});


//login routes
router.get("/login", function(req, res) {
    res.render("login");
});
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {
    /* var mailOptions = {
                              from: 'shubhang.dtucoe@gmail.com',
                              to: req.user.email,
                              subject: 'Login Alert',
                              text: 'You have recently logged in to your account!!'
                           };
          
         transporter.sendMail(mailOptions, function(error, info){
         if (error) {
             console.log(error);
          } else {
          console.log('Email sent: ' + info.response);
          }
      });
     */

});
//logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You have succesfully logged out!");
    res.redirect("/campgrounds");
});


//======================================================================

module.exports = router;
