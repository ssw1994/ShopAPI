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
module.exports = router;
