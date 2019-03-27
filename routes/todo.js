let express = require('express');
let router = express.Router();
let todocontroller = require("../public/javascripts/todos/todoController");

router.get("/list",(req,res,next)=>{
    todocontroller.getTodoList((result)=>{
        res.send(result);
    });
});

router.post("/addtodo",(req,res,next)=>{
    try{
        todocontroller.insertTodo(req,function(result){
            res.send(result);
        });
    }catch(error){
        console.error(error);
    }
})


module.exports = router;