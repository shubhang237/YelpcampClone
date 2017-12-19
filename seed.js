    var mongoose = require("mongoose"),
        Campground = require("./models/campgrounds"),
        Comment = require("./models/comment")

    var data = [{
            name: "Clouds'Rest",
            image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            name: "Canyon Board",
            image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            name: "Dankor's Drop",
            image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
    ];

    function seedDB() {
        Campground.remove({}, function(err) {
            if (err)
                console.log(err);
            else {
                console.log("removed all campgrounds!!!");
                data.forEach(function(data) {

                    //add a new campground
                    Campground.create(data, function(err, campground) {
                        if (err)
                            console.log(err);
                        else {
                            console.log(campground);
                            // //add a new comment
                            // Comment.create({
                            //     text: "I wish there was internet here",
                            //     author: "Homer"
                            // }, function(err, comment) {
                            //     if (err) {
                            //         console.log(err);
                            //     }
                            //     else {
                            //         campground.comments.push(comment);
                            //         campground.save();
                            //         console.log("Added a new comment");
                            //     }
                            // });
                        }
                    });
                });
            }
        });
    };
    
    module.exports = seedDB;