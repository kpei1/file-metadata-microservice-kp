'use strict';

var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');

// require and use "multer"...
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  //code
  let myFile = req.file;
  //console.log(myFile);
  if (myFile !== undefined) {
    res.json({"name": myFile.originalname,"type": myFile.mimetype, "size": myFile.size});
  } else {
    res.json({"error": "please choose a file"});
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
