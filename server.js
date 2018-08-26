var express    = require('express');
var morgan     = require("morgan");
var app        = express();
var data = require( "./js/data.json");
var bodyParser = require('body-parser');
var MongoClient = require("mongodb").MongoClient;
var mongoose = require("mongoose");

var Customers = mongoose.model('Customers',{
    id: {type:Number , required:true} ,
    name: String ,
    city : String ,
    state : String ,
    gender : String ,
    orderCount : Number ,
    coords : {
        latitude : Number,
		longitude : Number
    } ,
    window : {
		title : String
	}
});

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})


var port = process.env.PORT || 4000;

app.use(morgan("dev"));
// app.use(express.static("./"));
app.use(bodyParser.json())

function getInfo(){
    Customers.find({}).exec(function(err,result){
        
    })
}

mongoose.connect("mongodb://localhost:27017/customers",(err,db) => {
    if(!err){
        console.log("we r connected");

    
    }
});

app.get("/",(req,res) =>{
    
    Customers.find({}).exec(function(err,result){
        if (err) res.status(500).send(error)

        res.json(result);
    })


})

app.get("/customer/:id", (req, res) => {
  
    console.log(req.params.id);
    var user = Number(req.params.id);
    console.log(user)

    Customers.find({id:user}, (err, items) => {
        if (err) res.status(500).send(err)
    
        res.status(200).json(items);
      });
    // console.log(Customers.find({id:user}));
    // res.send(Customers.find({id:user}));

   });


// Start Server
app.listen(port, function () {
    console.log( "Express server listening on port " + port);
});