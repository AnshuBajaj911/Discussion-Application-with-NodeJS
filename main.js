const bodyParser = require('body-parser');
var express = require('express');
var app = express();
var fs = require('fs');
var url = require('url');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
const port = process.env.PORT || 8080;
// parse application/json
app.use(bodyParser.json())
app.get('/getData',function(req,res){
   var Ddata="";
fs.exists('./logs.txt', function (exists) {
    if(exists)
    {
        console.log('exists');
        fs.readFile('logs.txt', 'utf-8', function (err, data) {
            temp = JSON.parse(data);
            console.log(typeof data);
           Ddata=data;
           res.end(Ddata);
          });
    }else{
        data = "[]";
            fs.writeFile('logs.txt', data , function (err, data) 
            { 
                if(err){}
                else{
                   

                }
              
            });      
    }
});   });


app.post('/add', function (req, res) {
    // fwrite(req.body.task);
    // res.redirect("/");
    console.log(req.body.obj);
    fs.writeFile('./logs.txt', req.body.obj, function (err) {
        if (err) throw err;
        console.log('Saved!');
    
      });
  });




app.listen(port,function () {
    console.log('Server running at http://127.0.0.1:8080/');
  });