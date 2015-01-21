/**
 * Created by jzhang on 1/20/15.
 */
var phantom = require('phantom');

function parseHTML(path, callback){
    phantom.create(function(ph) {
        return ph.createPage(function(page) {
            return page.open(path, function(status) {
                return page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
                    return page.evaluate((function() {
                        var textNodes = [];
                        var imageNodes = [];
                        //var textTags = ["h2", "h3", "h1", "h4", "h5", "p", "a"];
                        //traverseDom($('body'));
                        //function traverseDom(node) {
                        //    // 1. check if it contains image node
                        //    if(node.find('img').length==0) {
                        //        textNode.push({
                        //            html: node.html(),
                        //            top: node.offset().top,
                        //            left: node.offset().left,
                        //            width: node.width()
                        //        });
                        //        return;
                        //    }
                        //
                        //    //$(node).contents().each(function (index) {
                        //    //    var currNode = $(this);
                        //    //    var tag = currNode.prop("tagName");
                        //    //    var buildObj = {};
                        //    //    if (tag == undefined) {
                        //    //        if (currNode.text().trim()) {
                        //    //            buildObj.tag = null;
                        //    //            buildObj.html = currNode.html();
                        //    //            buildObj.top = currNode.offset().top;
                        //    //            buildObj.left = currNode.offset().left;
                        //    //            buildObj.width = currNode.width();
                        //    //            textNodes.push(buildObj);
                        //    //        }
                        //    //    }
                        //    //    else if ($.inArray(tag.toLowerCase(), textTags) >= 0) {
                        //    //        buildObj.tag = tag;
                        //    //        buildObj.html = currNode.html();
                        //    //        buildObj.top = currNode.offset().top;
                        //    //        buildObj.left = currNode.offset().left;
                        //    //        buildObj.width = currNode.width();
                        //    //        textNodes.push(buildObj);
                        //    //    }
                        //    //    else if (tag.toLowerCase() == "img") {
                        //    //        buildObj.tag = tag;
                        //    //        buildObj.src = currNode.attr("src");
                        //    //        buildObj.top = currNode.offset().top;
                        //    //        buildObj.left = currNode.offset().left;
                        //    //        buildObj.height = currNode.height();
                        //    //        buildObj.width = currNode.width();
                        //    //        imageNodes.push(buildObj);
                        //    //    }
                        //    //    else {
                        //    //        traverseDom(currNode);
                        //    //    }
                        //    //});
                        //}

                        /// create image nodelist
                        /*
                        $('boby').find('img').forEach(function(img){
                            var jqNode = $(img);
                            imageNodes.push({
                                src: jqNode.attr('src'),
                                top: jqNode.offset().top,
                                left:jqNode.offset().left,
                                width:jqNode.width(),
                                height:jqNode.height()
                            })
                        });
                        */
                        console.log($('body'));
                        //
                        ///// create text node
                        //
                        //var txtNode = $('body').remove('img');
                        //textNodes.push({
                        //    html : txtNode.html(),
                        //    width: txtNode.width(),
                        //    top: txtNode.offset().top,
                        //    left: txtNode.offset().left
                        //});
                        return {
                            textNodes: textNodes,
                            imageNodes: imageNodes
                        };
                    }), function(result) {
                        console.log(result);
                        callback(null, result);
                        return ph.exit();
                    });
                });
            });
        });
    });
}


module.exports = {
    parseHtml: parseHTML
};