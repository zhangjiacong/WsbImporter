var phantom = require('phantom');

function parseHTML(path, callback){
    phantom.create(function(ph) {
        return ph.createPage(function(page) {
            return page.open(path, function(status) {
                return page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
                    return page.evaluate((function() {
                        var title = document.title;
                        var textNodes = [];
                        var imageNodes = [];
                        var textTags = ["h2", "h3", "h1", "h4", "h5", "p", "a"];
                        traverseDom($('body'));
                        function traverseDom(node) {
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
                                        buildObj.width = parseInt(currNode.css("width"));
                                        textNodes.push(buildObj);
                                    }
                                }
                                else if ($.inArray(tag.toLowerCase(), textTags) >= 0) {
                                    buildObj.tag = tag;
                                    buildObj.html = currNode.html();
                                    buildObj.top = currNode.offset().top;
                                    buildObj.left = currNode.offset().left;
                                    buildObj.width = parseInt(currNode.css("width"));
                                    textNodes.push(buildObj);
                                }
                                else if (tag.toLowerCase() == "img") {
                                    buildObj.tag = tag;
                                    buildObj.src = currNode.attr("src");
                                    buildObj.top = currNode.offset().top;
                                    buildObj.left = currNode.offset().left;
                                    buildObj.height = parseInt(currNode.css("height"));
                                    buildObj.width = parseInt(currNode.css("width"));
                                    imageNodes.push(buildObj);
                                }
                                else {
                                    traverseDom(currNode);
                                }
                            });
                        }
                        return {
                            textNodes: textNodes,
                            imageNodes: imageNodes,
                            pageTitle: title
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