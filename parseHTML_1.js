var phantom = require('phantom');
//var webpage = require('webpage');
var fs = require('fs');

function parseHTML(path, callback){
	/*var page = webpage.create();
	page.content = htmlString;
	page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
        return page.evaluate((function() {
        	var textNodes = [];
            var imageNodes = [];
            traverseDom($('body').html());
                function traverseDom(node) {
                	textNodes.push(node.html());
                }
        }), function(result) {
            console.log(result);
            callback(null, result);
            return ph.exit();
        });
    });
}*/

    phantom.create(function(ph) {
        return ph.createPage(function(page) {
            return page.open(path, function(status) {
            	
                return page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
                	
                    return page.evaluate((function() {

                        var textNodes = [];
                        var imageNodes = [];
                 //        var openNodes = [];
                         var textTags = ["<h2", "<h3", "<h1", "<h4", "<h5", "<p", "<a"];
                         var imgTag = "<img";

                         var htmlString = "the string of html that i needa edit";

                         var goodTags = ["<h2", "<h3", "<h1", "<h4", "<h5", "<p", "<a", "<img"];

                 //        //get page title
                 //        //imageNodes.push(page.content);
                 //        var orString = textTags.join("|");
                 //        //var spaceOrCloseString("\s|>");
                 //        var htmlString = $('body').html();
                 //        htmlString = htmlString.replace(/\n/g, "");
                 //        htmlString = htmlString.replace(/(<\/(?:p|h1|h2|h3|h4|h5|h6)>)(((?!<(p|h1|h2|h3|h4|h5|h6)).)+)((<(p|h1|h2|h3|h4|h5|h6))|$)/g, "$1<p>$2</p>$5");

                 //        //"<html><head><title>wikiHow Sample Webpage</title></head><body bgcolor=\"pink\" text=\"brown\"><h1>How to Create a Simple Webpage Using Notepad</h1></br></body></html>";
                        	
                	// //page.content = htmlString;
                 //        $('body').html(htmlString)
                        //imageNodes.push($('body').html())
                        traverseDom($('body').html());
                        function traverseDom(node) {
                        	//document.open();
                        	//var htmlString = "<html><head><title>wikiHow Sample Webpage</title></head><body bgcolor=\"pink\" text=\"brown\"><h1>How to Create a Simple Webpage Using Notepad</h1></br></body></html>";
                        	//node = document.write(htmlString);
                        	node = node.replace("\n", "");
                        	node = node.replace(/(<(h1|h2|h3|h4|h5|h6|p))[^<]*(>)/, $1$3);
                        	var firstOpen = node.indexOf("<");
                        	
                        	var beforeFirst = node.substring(0, firstOpen);
                        	if (beforeFirst != "") {
                        		var afterFirst = node.substring(firstOpen);
                        		node = "<p>" + beforeFirst + "</p>" + afterFirst;
                        		firstOpen = 0;
                        	}
                        	var firstClose = node.indexOf(">", firstOpen);
                        	var nextOpen = node.indexOf("<", firstOpen);
                        	while (true) {
                        		if (node.charAt(nextOpen + 1) != "/") {
                        			var nextClose = node.indexOf(">", nextOpen);
                        			var nextSpace = node.indexOf(" ", nextOpen);
                        			var cutOff = (nextClose < nextSpace) ? nextClose : nextSpace;
                        			var tag = node.substring(nextOpen, cutOff);
                        			if ()
                        		}
                        		var nextTag = node.substring(nextOpen, nextOpen+3);

                        		var nextOpen = ""
                        	}
                        	/*var firstTag = node.substring(firstOpen, firstOpen+3);
                        	var orRegex = new RegExp(orString, "g");
                        	var re = new RegExp(firstTag, "g");
                        	var spaceOrClose = new RegExp(spaceOrCloseString, "g");

                        	textNodes.push(firstTag)*/
                        	//textNodes.push(node);

                            $(node).contents().each(function (index) {
                                var currNode = $(this);
                                var tag = currNode.prop("tagName");
                                var buildObj = {};
                                if (tag == undefined) {
                                	if (currNode.text().trim()) {
                                        buildObj.tag = null;
                                        buildObj.html = currNode.html();
                                        buildObj.top = currNode.offset().top;
                                        buildObj.left = currNode.offset().left;
                            			buildObj.width = currNode.css("width");
                                        textNodes.push(buildObj);
                                    }
                                }
                                else if ($.inArray(tag.toLowerCase(), textTags) >= 0) {
                                    buildObj.tag = tag;
                                    buildObj.html = currNode.html();
                                    buildObj.top = currNode.offset().top;
                                    buildObj.left = currNode.offset().left;
                                    buildObj.width = currNode.css("width");
                                    textNodes.push(buildObj);
                                }
                                else if (tag.toLowerCase() == "img") {
                                    buildObj.tag = tag;
                                    buildObj.src = currNode.src;
                                    buildObj.top = currNode.offset().top;
                                    buildObj.left = currNode.offset().left;
                                    buildObj.height = currNode.css("height");
                                    buildObj.width = currNode.css("width");
                                    imageNodes.push(buildObj);
                                }
                                else {
                                    traverseDom(currNode);
                                }
                            });
                        }
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