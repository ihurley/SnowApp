var express = require("express");
var colors = require("colors");
var mongoose = require("mongoose");
const bodyParser = require('body-parser');
// initialize our express app
//const app = express();



var snowSchema = new mongoose.Schema({
 inches: Number,
 date: Date,
 location: String
});

//write a
var Snow = mongoose.model('Snow', snowSchema);

var promise = mongoose.connect('mongodb://localhost',{
 useMongoClient: true
}, function(err){
	if(err){
		throw err;
	}else{
		console.log("Database connection successful".trap.rainbow);
	}
});


var app = express();
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({exteded:false}));
app.get('/', function(req, res){
	res.sendFile(__dirname + "/form.html");
});

app.get('/deleteSnow',function(req, res){
	res.sendFile(__dirname + "/deleteForm.html");
});

/*
app.get('/mOARSNOW', function(req, res){

	Snow.create({inches : Math.random()*45},
		function(err, data){
			if(err){
				throw err;
			}else{
				res.send(data.inches + " inches of snow");
				console.log(data);
			}

	}); });

*/
app.post('/showSnow', function(req,res){
	console.log(req.body);
	Snow.update({date: req.body.date, location : req.body.location}, {inches : req.body.inches}, {upsert: true},
		function(err,data){
			if (err)
				{throw err;}
			else if(data == undefined){ console.log("Data is null");
			res.send("data is null")}
			else{
					
					res.send(data);
					console.log(data);
				}
		});
});


app.get('/showSnow', function(req, res){
	Snow.find({}, function(err, dataArr){
		if(err){
			throw err;
		}else{
			res.send("<h1>"+dataArr[0].inches+"</h1>"+"<p>"+dataArr+"</p>");
		}
		
	});
});

app.post('/removeSnow', function(req, res){
	Snow.remove({location: req.body.location, date: req.body.date},
function(err){
	if(err){
		throw err;
	}
	res.send("entry deleted")
});
		});

app.get('/removeSnow', function(req, res){
	Snow.find({}, function(err, dataArr){
		if(err){
			throw err;
		}else{
			res.send("<h1>"+dataArr[0].inches+"</h1>"+"<p>"+dataArr+"</p>");
		}
		
	});
});



app.post('/snowSnow', function(req,res){})


app.listen(8000);





