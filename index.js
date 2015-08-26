var mws = require("./lib/index.js");
var config = require("./config.json");

mws.products.ListMatchingProducts(config, {MarketplaceId: 'APJ6JRA9NG5V4', Query: 'a'}, true, function (err, data) {
    console.log(data);
});
