var express    = require('express');
var morgan     = require("morgan");
var app        = express();
// var data = require( "./js/data.json");
var bodyParser = require('body-parser');
var MongoClient = require("mongodb").MongoClient;
var mongoose = require("mongoose");
var assert = require("assert");
var location = require('location-href')
var fs = require('fs')
var path=require('path')
var helmet = require('helmet')
var rateLimit = require('express-rate-limit')



var Customers = mongoose.model('Customers',{
    id: {type:String , required:true ,ref: 'Orders'} ,
    name: String ,
    city : String ,
    state : String ,
    gender : String ,
    orders :[
        {
            
            o_name : String ,
            quantity : Number ,
            price : Number 
        }
    ]
});


app.use(helmet());

const limit = new rateLimit({
    windowMs : 15*60*1000,
    max : 1000,
    delayMs:0
});

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header ('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    next();
});


var port = process.env.PORT || 4000;
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.set('view options', { layout: true });
app.use(morgan("dev"));
// app.use(express.static("./"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + 'public')));


mongoose.connect("mongodb://localhost:27017/customers",(err,db) => {
    if(!err){
        console.log("we r connected");

    
    }
});

//var file = fs.readFile( __dirname + '/public/index.html');

// app.get('*', function(req, res) {
//     res.setHeader('Content-Type', 'text/html');
//     res.sendFile( __dirname + '/public/index.html');
// });

app.put('/customer/:id',(req,res) =>{
    
    var idRemove = String(req.params.id);
    console.log(idRemove);
    var user = new Customers(req.body);
            // console.log(req.body)
            // console.log(user)

            user.remove({id :idRemove},(err, doc) => {
                if (!err){
                    res.status(200).send(doc);
                    
                }
                    
                else {
                    res.status(500).send(err)
                }

            })

});

app.put('/customer/edit_info/:id',(req,res)=>{
    console.log(req.body);


    var user = String(req.params.id);


        Customers.update({id:user},{ $set: {  name : req.body.name ,  gender : req.body.gender , state : req.body.state , city : req.body.city}  }, (err, items) => {
            if (err) res.status(500).send(err)
        
           
            //res.status(200).send(items);
            console.log(items);
             res.redirect('/customer/'+req.body.id);
                    
            
                })
});



app.post('/new_info',(req,res)=>{

    Customers.findOne({
        id : req.body.id
    },function(err,existingUser){

        if(existingUser){
            return res.status(409).send({message : 'Id already exists'});

        }
          
        else{
            var user = new Customers(req.body);
            console.log(user)

            user.save((err, doc) => {
                if (!err)
                    res.status(200).send(doc);
                else {
                    res.status(500).send(err)
                }

            })
        }

        

    })

    

});

app.get("/",(req,res) =>{

    
        Customers.find({}).exec(function(err,result){
            if (err) res.status(500).send(error)
    

    //         res.setHeader('Content-Type', 'text/html');
    // res.sendFile( __dirname + '/public/index.html');
            res.status(200).send(result);
            //
            // res.render('index',{});
            // res.sendFile('index.html',{
            //     root : __dirname + '/partials'
            // })
        })
   
    
    

    
});

app.get("/customer/:id", (req, res) => {
  
    var user = String(req.params.id);
    console.log(user)

    Customers.find({id:user}, (err, items) => {
        if (err) res.status(500).send(err)
    
        res.status(200).send(items);
        console.log(items)
      });
    // console.log(Customers.find({id:user}));
    // res.send(Customers.find({id:user}));

   });

   app.post("/customer/order_list/:id",(req,res) => {

    console.log(req.body.quantity);

    var new_order = new Customers({

   id: String(req.params.id),
    orders :[
            {
                "o_name" : req.body.o_name ,
                "quantity" : req.body.quantity,
                "price" : req.body.price
            }
        
    ]

    });

    var user = String(req.params.id);
    console.log(new_order.orders)

        Customers.findOneAndUpdate({id:user},{ $push: { orders : new_order.orders }  }, (err, items) => {
            if (err) res.status(500).send(err)
        
           
                        res.status(200).send(items);
                    
            
                })
   });

   app.get("/customer/order_list/:id", (req, res) => {
  
    console.log(req.params.id);
    var user = String(req.params.id);
    console.log(user);

    

    Customers.find({id:user}, (err, items) => {
        if (err) res.status(500).send(err)
    
        res.status(200).json(items);
        console.log(items)
      });
    // console.log(Customers.find({id:user}));
    // res.send(Customers.find({id:user}));

   });


// Start Server
app.listen(port, function () {
    console.log( "Express server listening on port " + port);
});