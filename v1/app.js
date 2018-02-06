var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

var books = [
        {name: "Salmon Creek", image: "https://media-cdn.tripadvisor.com/media/photo-s/03/8f/90/23/elkmont-campground.jpg"},
        {name: "Midnight Meadows", image: "https://media-cdn.tripadvisor.com/media/photo-s/03/8f/90/23/elkmont-campground.jpg"},
        {name: "Swedish Salmonella", image: "https://media-cdn.tripadvisor.com/media/photo-s/03/8f/90/23/elkmont-campground.jpg"},
        {name: "Swedish Salmonella", image: "https://media-cdn.tripadvisor.com/media/photo-s/03/8f/90/23/elkmont-campground.jpg"},
        {name: "Swedish Salmonella", image: "https://media-cdn.tripadvisor.com/media/photo-s/03/8f/90/23/elkmont-campground.jpg"},
        {name: "Swedish Salmonella", image: "https://media-cdn.tripadvisor.com/media/photo-s/03/8f/90/23/elkmont-campground.jpg"},
        {name: "Swedish Salmonella", image: "https://media-cdn.tripadvisor.com/media/photo-s/03/8f/90/23/elkmont-campground.jpg"}
    ];

// the main landing page
app.get("/", function(req, res){
    res.render("landing.ejs");
});

// the campsites page -> get the page
app.get("/books", function(req, res){
    res.render("books.ejs", {books: books});
});

app.post("/books", function(req, res){
    // get data from form, add to books array
    var name = req.body.name;
    var image = req.body.image;
    var newBook = {name: name, image: image};
    books.push(newBook);
    // redirect to books page
    res.redirect("/books");
});

// create the form here, this is the RESTful way of writing 
app.get("/books/new", function(req, res){
    res.render("new.ejs");
});

// listen the request
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has been initialised"); 
});