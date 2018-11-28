let express = require('express');
let router = express.Router();
let cartcontroller = require("../public/javascripts/carts/cartsController");

router.get("/",(req,res,next)=>{
    cartcontroller.getAllCarts((result)=>{
        res.send(result);
    });
});

router.get("/:userId",(req,res,next)=>{
    let userId = req.params.userId;
    cartcontroller.getUserCart(userId,(result)=>{
        res.send(result);
    });
});

router.post("/add",(req,res,next)=>{
    console.log(req.body);
    let cartItem = req.body;
    cartcontroller.addToCart(cartItem,(result)=>{
        res.send(result);
    });
});

router.get("/remove/:cartId",(req,res,next)=>{
    let cartId = req.params.cartId;
    cartcontroller.deleteCartItem(cartId,(result)=>{
        res.send(result);
    });
});

module.exports = router;