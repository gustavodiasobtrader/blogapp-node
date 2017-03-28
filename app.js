var express = require('express');
var moment = require('moment');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('assets'));
app.use(bodyParser.urlencoded(extended = true));
app.use(methodOverride('_method'));




mongoose.connect('mongodb://localhost/blog_app');


var blogSchema = new mongoose.Schema({
	title: String,
	photo: String,
	body:String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);


app.get('/', function(req, res){
	res.redirect('/blogs');
});



app.get('/blogs', function(req, res){
	Blog.find({}, function(err, result){
		if (err) {
			console.log(err);
		}

		else{
			res.render('index', {blogs: result});
		}
	});
});

app.get('/blogs/new', function(req, res){
	res.render('new');
});


app.get('/blogs/:id', function(req, res){
	Blog.findById(req.params.id, function(err, result){
		if (err) {
			res.render('error');
		}

		else{
			res.render('show', {blog : result});
		}
	});
});


app.get('/blogs/:id/edit', function(req, res){
	Blog.findById(req.params.id, function(err, result){
		if (err) {
			res.render('error');
		}
		else{
			res.render('edit', {blog:result});
		}
	});
});


app.post('/new_post', function(req, res){
	Blog.create(req.body.blog, function(err, result){
		if (err) {
			console.log(err);
		}
		else{
			res.redirect('/blogs');
		}
	})
})

app.put('/blogs/:id', function(req, res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, result){
		if (err) {
			res.render('error');
		}
		else{
			res.redirect('/blogs/' + req.params.id);
		}
	});
});

app.delete('/blogs/:id', function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err, deleted){
		if (err) {
			res.redirect('/blogs/:id');
		}

		else{
			res.redirect('/blogs');
		}
	});
});



app.listen(3000, function(){
	console.log("Server running on port 3000. At: " + moment().format('LT'));
})