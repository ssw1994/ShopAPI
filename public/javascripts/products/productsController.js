var fs = require("fs");
var controller  = (function(){
    function filter(arr,key,value){
        try{
            let response = arr.filter((iObj)=>iObj[key].toLowerCase().includes(value.toLowerCase()));
            return response;
        }catch(error){
            console.error(error);
        }
    }

    function updateDb(products,msg,iCallBack){
        try{
            fs.writeFile(__dirname + "/products.json",JSON.stringify(products),(err,data)=>{
                if(err){
                    if(iCallBack && typeof iCallBack == 'function'){
                        iCallBack(err);
                    }
                }else{
                    iCallBack({msg:msg})
                }
            });
        }catch(error){
            console.error(error);
        }
    }

    this.search = function(IProductName,iCallBack){
        try{
            this.getList((products)=>{
                console.log(IProductName);
                if(iCallBack && typeof iCallBack == 'function')
                    iCallBack(filter(products,"productName",IProductName));
            });
        }catch(error){
            console.error(error);
        }
    }

    this.add = function(iProduct,iCallBack){
        try{
            this.getList((products)=>{
                if(products && products instanceof Array){
                    products.push(iProduct);
                    updateDb(products,"Product Added Succefully" + iProduct.productId,(result)=>{
                       if(iCallBack && typeof iCallBack == 'function')
                            iCallBack(result);
                    });
                }
            });
        }catch(error){
            console.error(error);
        }
    }

    this.getList = function(iCallBack){
        try{
          fs.readFile(__dirname + "/products.json",(err,data)=>{
              if(err){
                  if(iCallBack && typeof iCallBack == 'function')
                    iCallBack(err);
              }else{
                if(iCallBack && typeof iCallBack == 'function')
                    iCallBack(JSON.parse(data));
              }
          });  
        }catch(error){
            console.error(error);
        }
    }

    this.del = function(IProductID,iCallBack){
        try{
            this.getList((products)=>{
                if(products && products instanceof Array){
                    let index = products.findIndex((prd)=> prd.productId == IProductID);
                    if(index >= 0){
                        products.splice(index,1);
                        updateDb(products,"Product Deleted Successfully  id : " + IProductID , (result)=>{
                            if(iCallBack && typeof iCallBack == 'function')
                                iCallBack(result);
                        });
                    }else{
                        if(iCallBack && typeof iCallBack == 'function')
                            iCallBack({error:"Something went wrong"});
                    }
                }
            });
        }catch(error){
            console.error(error);
        }
    }

    this.update = function(IProduct,iCallBack){
        try{
            this.getList((products)=>{
                if(products && products instanceof Array){
                    let index = products.findIndex((prd)=> prd.productId == IProduct.productId);
                    if(index >= 0){
                        products.splice(index,1);
                        products.push(IProduct);
                        updateDb(products,"updated Successfully",(result)=>{
                            iCallBack(result);
                        });
                    }else{
                        iCallBack({error:"Something Went Wrong....!"})
                    }
                }
            })
        }catch(error){
            console.error(error);
        }
    }
    return this;
})();

module.exports = controller;