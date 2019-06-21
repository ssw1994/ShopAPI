var config = require("../../config/config.json");
var mysql = require('mysql');
var Connection = require('tedious').Connection
var Request = require('tedious').Request
//let connection = mysql.createConnection(config.local.db);
var connection = new Connection(config.local.db)
// connection.on('connect', function (err) {
//     if (err) {
//         console.log(err)
//     } else {
//         executeStatement()
//     }
// })
// function executeStatement() {
//     request = new Request("select 123, 'hello world'", function (err, rowCount) {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log(rowCount + ' rows')
//         }
//         connection.close()
//     })

//     request.on('row', function (columns) {
//         columns.forEach(function (column) {
//             if (column.value === null) {
//                 console.log('NULL')
//             } else {
//                 console.log(column.value)
//             }
//         })
//     })

//     connection.execSql(request)
// }
// var usercontroller = (function () {

//     const db = function (query, iCallBack) {
//         try {
//             connection.query(query, function (error, rows, fields) {
//                 if (iCallBack && typeof iCallBack == 'function')
//                     iCallBack({ error: error, rows: rows, fields: fields })
//             });
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     const login = function (iObj, iCallBack) {
//         try {
//             db("CALL authenticate('" + iObj.username + "','" + iObj.password + "')", function (res) {
//                 if (res.error) throw res.error;
//                 if (res.rows) iCallBack(res.rows[0]);
//             })
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const addUser = function (iObj, iCallBack) {
//         try {
//             db("CALL registerUser('"
//                 + iObj.user_name + "','"
//                 + iObj.user_email + "','"
//                 + iObj.user_mobile + "','"
//                 + iObj.user_password + "','"
//                 + iObj.mst_isPremium + "','"
//                 + iObj.mst_isAuthenticated + "','"
//                 + iObj.mst_isActive + "')",
//                 function (res) {
//                     if (res.error) throw res.error;
//                     if (res.rows) iCallBack(res.rows[0]);
//                 }
//             );
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     const getUsers = function () {

//     };

//     const removeUser = function (iObj) {

//     }

//     Object.assign(this, {
//         login,
//         removeUser,
//         getUsers,
//         addUser
//     })
//     return this;
// })();








/********************************** WITH FILE SYSTEM ******************************/
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


    this.removeUser = ()=>{
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
/************************************** END WITH FILE SYSTEM *************************************/
module.exports = usercontroller;