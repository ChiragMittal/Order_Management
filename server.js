var express    = require('express');
var morgan     = require("morgan");
var app        = express();
// var data = require( "./js/data.json");
var bodyParser = require('body-parser');
var MongoClient = require("mongodb").MongoClient;
var mongoose = require("mongoose");
var assert = require("assert");

// console.log(shortid.generate('1234567890'));

// var Orders = mongoose.model('Orders',{
//     orders:[
//         {
      
//             o_name : String ,
//             quantity : Number ,
//             price : Number 
//         }
//     ]
    
// });

var Customers = mongoose.model('Customers',{
    id: {type:String , required:true ,ref: 'Orders'} ,
    name: String ,
    city : String ,
    state : String ,
    gender : String ,
    // coords : {
    //     latitude : Number,
	// 	longitude : Number
    // } ,
    // window : {
	// 	title : String
    // },
    orders :[
        {
            
            o_name : String ,
            quantity : Number ,
            price : Number 
        }
    ]
});



// function getUserWithPosts(id){
//     return Customers.findOne({ id: id })
//       .populate('Orders').exec((err, orders) => {
//         console.log("Populated User " + orders);
//       })
//   }

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});


var port = process.env.PORT || 4000;

app.use(morgan("dev"));
// app.use(express.static("./"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// function getInfo(){
//     Customers.find({}).exec(function(err,result){
        
//     })
// }

mongoose.connect("mongodb://localhost:27017/customers",(err,db) => {
    if(!err){
        console.log("we r connected");

    
    }
});

mongoose.connect("mongodb://localhost:27017/orders",(err,db) => {
    if(!err){
        console.log("hurray");

    
    }
});

app.post('/new_info',(req,res)=>{
    console.log(req.body.name);
    // res.json(req.body);

    // console.log(res.send(req.body))
var user = new Customers(req.body);
        console.log(user)

        user.save((err, doc) => {
            if (!err)
                res.status(200).send(doc);
            else {
                res.status(500).send(err)
            }

        })

});

app.get("/",(req,res) =>{
    
    Customers.find({}).exec(function(err,result){
        if (err) res.status(500).send(error)

        res.json(result);
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

    var new_order = new Customers({

   id: String(req.params.id),
    orders :[
            {
                "o_name" : "Baseball  Bat",
                "quantity" : 3,
                "price" : 10
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