var fs = require("fs");
var mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydb'
});
var todoController = (function () {

    const db = function (query, iCallBack) {
        try {
            connection.query(query, function (error, rows, fields) {
                if (iCallBack && typeof iCallBack == 'function')
                    iCallBack({ error: error, rows: rows, fields: fields })
            });
        } catch (error) {
            console.error(error);
        }
    }

    const connect = function (iCallBack) {
        try {
            connection.connect((error, res) => {
                if (error) throw error;
                if (iCallBack && typeof iCallBack == 'function')
                    iCallBack();
            });
        } catch (error) {
            console.error(error);
        }
    }

    const execute = function () {

    }

    const disconnect = function () {
        try {
            connection.end();
        } catch (error) {
            console.error(error);
        }
    }

    const insertTodo = function (iReq, iCallBack) {
        try {
            if (iReq && iReq.body) {
                let iObj = iReq.body;
                if (iObj.hasOwnProperty("todo_name") && iObj.hasOwnProperty("todo_priority") && iObj.hasOwnProperty("todo_assignee") && iObj.hasOwnProperty("todo_description") && iObj.hasOwnProperty("todo_date")) {
                    connection.query("CALL insertTodo('" + iObj.todo_name + "','" + iObj.todo_priority + "','" + iObj.todo_assignee + "','" + iObj.todo_description + "','" + iObj.todo_date + "')", function (error, rows, fields) {
                        if (error) throw error;

                        if (iCallBack && typeof iCallBack == 'function')
                            iCallBack(rows);
                    });
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTodo = function () {
        try {

        } catch (error) {
            console.error(error);
        }
    };

    const updateTodo = function () {
        try {

        } catch (error) {
            console.error(error);
        }
    };

    const searchTodo = function () {
        try {

        } catch (error) {
            console.error(error);
        }
    };

    const getTodoList = function (iCallBack) {
        try {
            connection.query("CALL get_todo()", function (err, rows, fields) {
                if (err)
                    throw err
                console.log(rows);
                if (iCallBack && typeof iCallBack == 'function')
                    iCallBack(rows[0]);
            });
        } catch (error) {
            console.error(error);
        }
    };

    const getPriority = function () {
        try {

        } catch (error) {
            console.error(error);
        }
    }

    Object.assign(this, {
        insertTodo,
        deleteTodo,
        updateTodo,
        searchTodo,
        getTodoList
    })

    return this;
})();

module.exports = todoController;