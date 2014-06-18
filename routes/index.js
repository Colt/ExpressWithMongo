var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/helloworld', function(req, res){
	res.render('helloworld', {title: "Hello, World!"});
})

router.get('/userlist', function(req, res){
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{}, function(e, docs){
		res.render('userlist', {
			"userlist":docs
		});
	});
});

router.get('/newuser', function(req, res){
	res.render("newuser", {title: 'Add New User'});
});

router.post('/adduser',function(req, res){
	var db = req.db
	var userName = req.body.username;
	var userEmail = req.body.useremail;

	var collection = db.get('usercollection');

	collection.insert({
		"username": userName,
		"email": userEmail
	}, function(err, doc){
		if(err){
			res.send("There was a problem!");
		}
		else{
			res.location("userlist");
			res.redirect("userlist");
		}
	});
});

module.exports = router;
