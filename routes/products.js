var controller = require("../public/javascripts/products/productsController");
var express = require("express");
var router = express.Router();

router.get("/",(req,res,next)=>{
    controller.getList((result)=>{
        res.send(result);
    })
});

router.put("/add",(req,res,next)=>{
    controller.add(req.body,(result)=>{
        res.send(result);
    });
});

router.post("/delete",(req,res,next)=>{

});

router.get("/search/:product",(req,res,next)=>{
    controller.search(req.params.product,(result)=>{
        res.send(result);
    });
});

module.exports = router;