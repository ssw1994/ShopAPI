var express = require('express');
var router = express.Router();
var multer  =   require('multer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var storage =   multer.diskStorage({  
  destination: function (req, file, callback) {  
    callback(null, './uploads');  
  },  
  filename: function (req, file, callback) {  
    callback(null, file.originalname);  
  }  
});

var upload = multer({ storage : storage}).single('myfile');

router.post('/upload',function(req,res){
  upload(req,res,function(err) {  
      if(err) {  
          return res.end("Error uploading file.");  
      }  
      res.end(JSON.stringify({fileName:req.file.originalname,status:"File is uploaded successfully!"}));
  });  
});  


var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'waghmare.sachin1994@gmail.com',
    pass: '@SachiN1994@'
  }
});

var mailOptions = {
    from: 'waghmare.sachin1994@gmail.com',
    to: 'sachinw@iniquus.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
});



module.exports = router;
