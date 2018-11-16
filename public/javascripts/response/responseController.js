

var controller = (function(){
    this.response = {
        status:{},
        error:{},
        data:{}
    }

    this.errorCodes = {
        404:{
            msg:"data not found",
            statusCode:404
        },
        200:{
            msg:"success",
            statusCode:200,
        },
        503:{
            msg:"service not available",
            statusCode:503
        },
        401:{
            msg:"bad request",
            statusCode:401
        }
    }

    this.setStatus = ()=> {

    }

    this.setData = ()=> {

    }

    this.setError = ()=> {

    }

    this.getResponse = ()=>{
        
    }

    return this;
})();