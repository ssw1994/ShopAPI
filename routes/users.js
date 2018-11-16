var express = require('express');
var sql = require("mysql");

var fs = require("fs");
var router = express.Router();


var userlist = [];
var productList = [];

/* GET users listing. */
router.get('/', function(req, res, next) {
  var config = {
    user: 'eSachin',
    password: '123',
    server: 'localhost', 
    database: 'learn' 
  };

  sql.connect(config, function (err) {
    
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();
       
    // query to the database and get the records
    request.query('select * from dbo.users', function (err, recordset) {
        
        if (err) console.log(err)

        // send records as a response
        res.send(recordset);
        
    });
});
});

router.post("/add",function(req,res,next){
  console.log(req.body);
  userlist.push(req.body);
  res.send("User added");
});

router.post("/add/product",function(req,res,next){
  productList.push(req.body);
  fs.writeFile(__dirname + "/products.json",JSON.stringify(productList),function(err,data){
    if(err)
      res.send(err);
    
    res.send("Product Added Successfully");
  });
});

router.get("/products",function(req,res,next){
  fs.readFile(__dirname + "/products.json",function(err,data){
    if(err){
      res.send(err);
    }
    if(data){
      productList = JSON.parse(data);
      console.log(productList instanceof Array);
      res.send(productList);
    }
  });
});

module.exports = router;
