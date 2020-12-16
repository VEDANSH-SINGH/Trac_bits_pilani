const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash')

const mongoose = require('mongoose');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://vedansh_singh:Vedansh2301@cluster0.zeho1.mongodb.net/blogdb?retryWrites=true&w=majority", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get('/', function(req, res) {
  res.render('home');
  
});
app.get('/about', function(req, res) {
  res.render('about');
});
app.get('/projects', function(req, res) {
  res.render('projects');
});

app.get('/blog', function(req, res) {
  Post.find({}, function(err, posts){
    res.render("blog", {
      
      posts: posts
      });
  });
});
app.get('/blog/compose', function(req, res) {
  res.render('compose');
});
app.post("/blog/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/blog");
    }
  })

});

     
app.get("/blog/posts/:postId", function(req, res){
 
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });
});









app.listen(process.env.PORT || 4000, function() {
  console.log("Server started on port 4000");
});
