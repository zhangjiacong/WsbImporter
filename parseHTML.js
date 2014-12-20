var phantom = require('phantom');

function parseHTML(path, callback){
    phantom.create(function(ph) {
        return ph.createPage(function(page) {
            return page.open(path, function(status) {
                return page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
                    return page.evaluate((function() {
                        var textNodes = [];
                        var tags = ["h2", "h3", "h1", "h4", "h5", "p", "a"];
                        traverseDom($('body'));
                        function traverseDom(node) {
                            $(node).contents().each(function (index) {
                                var currNode = $(this);
                                var tag = currNode.prop("tagName");
                                var textObj = {};
                                if (tag != undefined && $.inArray(tag.toLowerCase(), tags) >= 0) {
                                    textObj.tag = tag;
                                    textObj.text = currNode.html();
                                    textObj.top = currNode.offset().top;
                                    textObj.left = currNode.offset().left;
                                    textNodes.push(textObj);
                                }
                                else if (tag == undefined) {
                                    if (currNode.text().trim()) {
                                        textObj.tag = null;
                                        textObj.text = currNode.text();
                                        textObj.top = currNode.offset().top;
                                        textObj.left = currNode.offset().left;
                                        textNodes.push(textObj);
                                    }
                                }
                                else {
                                    traverseDom(currNode);
                                }
                            });
                        }
                        return {
                            textNodes: textNodes,
                            imageNode: []
                        };
                    }), function(result) {
                        //console.log(result);
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