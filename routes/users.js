var usercontroller = require("../public/javascripts/users/usersController");
var express = require('express');

var fs = require("fs");
var userrouter = express.Router();

userrouter.get("/",(req,res,next)=>{
  console.log(userrouter);
  usercontroller.getUsers((result)=>{
    res.send(result);
  })
});

userrouter.put("/register",function(req,res,next){
  console.log(req.body);
  usercontroller.addUser(req.body,(result)=>{
    res.send(result);
  });
});

userrouter.post("/login",(req,res,next)=>{
  usercontroller.login(req.body,function(result){
    console.log("Herrrr.....",result);
    res.send(result);
  });
});
module.exports = userrouter;
