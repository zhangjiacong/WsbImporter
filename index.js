/**
 * Created by jzhang on 12/19/14.
 */
var express = require('express');
var app = express();
var multer = require('multer');
var parseHtml = require('./parseHTML');
var fs = require("fs");

    //app.use(express.methodOverride());
app.use(multer());


app.get('/', function(req, res){
    res.send('hello world');
});


app.post('/api/HtmlToJson', function(req, res) {
    parseHtml.parseHtml(req.files.file1.path, function(error, results){
        console.log(results.textNodes);
    });
});
/*
function getHtmlContent(req, callback){
    var path = req.files.file1.path;
    fs.readFile(path, 'utf8', function(err, data){
        if(err)
            return callback(err, null);
        return callback(null, data);

    });
}
*/




app.listen(3000);