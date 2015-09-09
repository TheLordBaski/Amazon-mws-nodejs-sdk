var mws = require("./lib/index.js");
var config = require("./config.json");

//mws.products.ListMatchingProducts(config, {MarketplaceId: 'APJ6JRA9NG5V4', Query: 'ed',QueryContextId: 'Music'}, true, function (err, data) {
//    console.log(data);
//});


mws.products.GetMatchingProduct(config, {
        MarketplaceId: 'APJ6JRA9NG5V4',
        ASINList: {
            'ASINList.ASIN.1': 'B00012SYY6', 'ASINList.ASIN.2': 'B00004CZ0F'
        }
    }, true, function (err, data) {
        console.log(data);
    }
);