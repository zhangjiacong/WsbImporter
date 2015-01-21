/**
 * Created by jzhang on 12/19/14.
 */
var express = require('express');
var app = express();
var multer = require('multer');
var bodyParser = require('body-parser');
var parseHtml = require('./parseHTML');
var fs = require("fs");

    //app.use(express.methodOverride());
app.use(multer());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use("/", express.static(__dirname ));

app.all('*', function(req, res, next) {

    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Origin", "*");
    next();
 });


app.get('/', function(req, res){
    res.send('hello world');
});


app.post('/api/HtmlToJson', function(req, res) {
    parseHtml.parseHtml(req.files.file1.path, function(error, results){
        console.log(results.textNodes);
    });
});

app.post('/api/HtmlToJsonFromUrl', function(req, res){
    var url = req.param("url");
    parseHtml.parseHtml(url, function(error, results){
        console.log(results);
        res.send(results);
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
console.log('html parse service is on');