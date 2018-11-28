var fs = require("fs");

let cartController = (function(){

    function filter(arr,key,value){
        try{
            let response = arr.filter((iObj)=>iObj[key] == value);
            return response;
        }catch(error){
            console.error(error);
        }
    }

    this.updateDb =(carts,msg,iCallBack)=>{
        try{
            fs.writeFile(__dirname + "/carts.json",JSON.stringify(carts),(err,data)=>{
                if(err){
                    if(iCallBack && typeof iCallBack == 'function'){
                        iCallBack(err);
                    }
                }else{
                    iCallBack(msg)
                }
            });
        }catch(error){
            console.error(error);
        }
    }

    this.getAllCarts = function(iCallBack){
        try{
          fs.readFile(__dirname + "/carts.json",(err,data)=>{
              if(err){
                  if(iCallBack && typeof iCallBack == 'function')
                    iCallBack(err);
              }else{
                if(iCallBack && typeof iCallBack == 'function')
                    iCallBack(data ? JSON.parse(data) : []);
              }
          });  
        }catch(error){
            console.error(error);
        }
    }

   this.deleteCartItem = (cartId,iCallBack)=>{
       try{
        this.getAllCarts((result)=>{
            if(result && result instanceof Array){
                let index = result.findIndex((cart)=>cart.cartId == cartId);
                if(index>=0){
                    result.splice(index,1);
                }
                this.updateDb(result,"Removed cart Item Id : "+cartId,(res)=>{
                    if(iCallBack && typeof iCallBack == 'function')
                        iCallBack(res);
                });
            }
        });
       }catch(error){
           console.error(error);
       }
   }

    this.getUserCart = (userId,iCallBack)=>{
        try{
            this.getAllCarts((result)=>{
                if(result && result instanceof Array){
                    if(iCallBack && typeof iCallBack == 'function')
                        iCallBack(filter(result,'userId',userId));
                }
            })
        }catch(error){
            console.error(error);
        }
    }

    this.addToCart = (iCart,iCallBack)=>{
        try{
            this.getAllCarts((result)=>{
                //console.log(result);
                if(result && result instanceof Array){
                    let carts = result;
                    iCart.cartId = result.length + 1;
                    carts.push(iCart);
                    this.updateDb(carts,"Added in cart : " + iCart.cartId,(result)=>{
                        if(iCallBack && typeof iCallBack == "function")
                            iCallBack({
                                statusCode:200,
                                msg:result,
                                data:iCart
                            }
                            );
                    });
                }
            });
        }catch(error){
            console.error(error);
        }
    }

    return this;
})();

module.exports = cartController;