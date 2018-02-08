var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// connecting mongoose to the main app
mongoose.connect("mongodb://localhost/bibliophile");

app.use(bodyParser.urlencoded({extended: true}));

// making the schema for the book
var bookSchema = new mongoose.Schema({
    bookName: String,
    bookImage: String,
    description: String
});

// making the model for the book
var Book = mongoose.model("Book", bookSchema);

// Book.create(
//     {
//         bookName: "To Kill A Mockingbird",
//         bookImage: "https://upload.wikimedia.org/wikipedia/en/thumb/7/79/To_Kill_a_Mockingbird.JPG/220px-To_Kill_a_Mockingbird.JPG",
//         description: "An indisputable classic."
//     },
//     function(err, book) {
//         if(err) {
//             console.log("Error creating book");
//         } else {
//             console.log(book);
//         }
//     }
// );

// var books1 = [
//         {name: "Salmon Creek", image: "https://media-cdn.tripadvisor.com/media/photo-s/03/8f/90/23/elkmont-campground.jpg"},
//         {name: "Midnight Meadows", image: "https://media-cdn.tripadvisor.com/media/photo-s/03/8f/90/23/elkmont-campground.jpg"},
//         {name: "Swedish Salmonella", image: "https://media-cdn.tripadvisor.com/media/photo-s/03/8f/90/23/elkmont-campground.jpg"},
//         {name: "Swedish Salmonella", image: "https://media-cdn.tripadvisor.com/media/photo-s/03/8f/90/23/elkmont-campground.jpg"},
//         {name: "Swedish Salmonella", image: "https://media-cdn.tripadvisor.com/media/photo-s/03/8f/90/23/elkmont-campground.jpg"},
//         {name: "Swedish Salmonella", image: "https://media-cdn.tripadvisor.com/media/photo-s/03/8f/90/23/elkmont-campground.jpg"},
//         {name: "Swedish Salmonella", image: "https://media-cdn.tripadvisor.com/media/photo-s/03/8f/90/23/elkmont-campground.jpg"}
//     ];

// the main landing page
app.get("/", function(req, res){
    res.render("landing.ejs");
});

// the campsites page -> get the page
app.get("/books", function(req, res){
    // get all the books
    Book.find({}, function(err, allBooks){
        if(err) {
            console.log("Error finding the books");
        }   else {
            console.log(allBooks);
            res.render("index.ejs", {books: allBooks});
        }
    })
});

app.post("/books", function(req, res){
    // get data from form, add to books array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    Book.create(
        {
            bookName: name,
            bookImage: image,
            description: description
        }, function(err, book) {
            if(err) {
                console.log("error adding book");
            } else {
                console.log("Book added!");
            }
        }
    );
    // redirect to books page
    res.redirect("/books");
});

// create the form here, this is the RESTful way of writing 
app.get("/books/new", function(req, res){
    res.render("new.ejs");
});

// display page for the individual book
app.get("/books/:id", function(req, res){
    Book.findById(req.params.id, function(err, foundBook) {
        if(err) {
            console.log("Couldn't find the book");
        } else {
            res.render("show.ejs", {book: foundBook})
        }
    })
});

// listen the request
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has been initialised"); 
});