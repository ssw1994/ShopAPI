var fs = require("fs");

var usercontroller = (function(){
    this.updateDb =(users,msg,iCallBack)=>{
        try{
            fs.writeFile(__dirname + "/users.json",JSON.stringify(users),(err,data)=>{
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
    this.getUsers = function(iCallBack){
        try{
          fs.readFile(__dirname + "/users.json",(err,data)=>{
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


    this.deleteUser = ()=>{
        try{

        }catch(error){
            console.error(error);
        }
    }

    this.searchUser = ()=>{
        try{

        }catch(error){
            console.error(error);
        }
    }

    this.updateUser = (iUser)=>{
        try{

        }catch(error){
            console.error(error);
        }
    }

    this.login = (iUser,iCallBack)=>{
        try{
            console.log(iUser);
            this.getUsers((result)=>{
                if(result && result instanceof Array){
                    let index = result.findIndex((x)=> x.username === iUser.username && x.password === iUser.password);
                    if(index >=0 ){
                        if(iCallBack && typeof iCallBack == 'function')
                            iCallBack(
                                { 
                                    statusCode : 200 ,
                                    msg : "User Authenticated Successfully",
                                    data:result[index]
                                }
                            )
                    }
                    else{
                        let index = result.findIndex((x)=> x.username == iUser.username);
                        let index2 = result.findIndex((x)=> x.password == iUser.password);

                        let msg = "";
                        msg += index >= 0 ? "Your Password is not correct" : "";
                        msg += index2 >= 0 ? "Your Username is not correct":"";
                        if(msg.length == 0)
                           msg += "User Not found";
                        
                        if(iCallBack && typeof iCallBack == 'function'){
                            iCallBack(
                                {
                                    statusCode:404,
                                    msg:msg
                                }
                            )
                        }
                    }
                }
            });
        }catch(error){
            console.error(error);
        }
    }

    this.addUser = (iUser,iCallBack)=>{
        try{
            this.getUsers((result)=>{
                //console.log(result);
                if(result && result instanceof Array){
                    let users = result;
                    iUser.userId = result.length + 1;
                    users.push(iUser);
                    this.updateDb(users,"User Added Successfully ID : " + iUser.userId,(result)=>{
                        if(iCallBack && typeof iCallBack == "function")
                            iCallBack({
                                statusCode:200,
                                msg:result,
                                data:iUser
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

module.exports = usercontroller;