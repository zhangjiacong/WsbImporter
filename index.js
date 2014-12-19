/**
 * Created by jzhang on 12/19/14.
 */
var express = require('express');
var app = express();
var multer = require('multer');
var fs = require("fs");

    //app.use(express.methodOverride());
app.use(multer());


app.get('/', function(req, res){
    res.send('hello world');
});


app.post('/api/HtmlToJson', function(req, res){
    getHtmlContent(req, function(err, data){
        if(err) return res.send('error');
        return res.send(data);
    });
});

function getHtmlContent(req, callback){
    var path = req.files.file1.path;
    fs.readFile(path, 'utf8', function(err, data){
        if(err)
            return callback(err, null);
        return callback(null, data);

    });
}





app.listen(3000);