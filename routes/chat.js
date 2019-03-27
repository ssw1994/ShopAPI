let express = require('express');
let router = express.Router();
var http = require('http');
var template = require('../public/templates/register');
var nodemailer = require('nodemailer');
const SMTPConnection = require("nodemailer/lib/smtp-connection");
let chatcontroller = require("../public/javascripts/chat/chatController");
const io = require('socket.io')(http);
io.on("connection", (socket) => {
    console.log(socket);
    socket.on("connect", (res) => {
        console.log("user onnected", res);
    })
});
router.get("/get", (req, res, next) => {
    try {

    } catch (error) {
        console.error(error);
    }
});

router.post("/send", (req, res, next) => {
    try {

    } catch (error) {
        console.error(error);
    }
});

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: '587',
    auth: {
        user: 'shopsswstore@gmail.com',
        pass: '@sswstore2019@'
    },
    secureConnection: 'false',
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false

    }
});

// var mailOptions = {
//     from: 'shopsswstore@gmail.com',
//     to: 'waghmare.sachin1994@rediffmail.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
//   };


/**
 * @author SSW
 * @description this function is used for sending mails
 */
router.post("/sendMail", (req, res, next) => {
    try {
        //mailOptions == req.body
        //console.log(req.body)
        let mailOptions = {
            from : "shopsswstore@gmail.com",
            to:req.body.email,
            html:template.createTemplate(req.body),
            text:"Greeting for the day...!",
            subject:"Email Verification - SSWShop"
        }
        console.log(mailOptions);
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              res.send(error);
            } else {
              res.send({statusCode:200,info:info});
            }
        });
    } catch (error) {
        console.error(error);
    }
});


module.exports = router;