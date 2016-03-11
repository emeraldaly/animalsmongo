var express = require("express");
var app = express();
var PORT = 8080;
var mongojs = require('mongojs')
var db = mongojs("zoo", ["animals"])
db.on('error', function(err){
  console.log('erroneous action fiend!', err);
})


app.get('/', function(req, res){
  console.log('Hello World');
})

app.get('/animals', function(req,res){
  db.animals.find({}, function(err,documents){
    if(err){
      console.log(err);
    }else {
      res.json(documents);
    }
  })
})

app.get('/weight', function(req,res){
  db.animals.find().sort({avgWeight: 1}, function(err, documents){
    if(err){
      console.log(err);
    }else {
      res.json(documents);
    }
  })
})

app.get('/sort', function(req,res){
  db.animals.find({class:{$ne:  "mammal"}}, function(err,documents){
    if(err){
      console.log(err);
    }else {
      res.json(documents);
    }
  })
})


app.listen(PORT, function() {
  console.log("Listening on:" + PORT)
});