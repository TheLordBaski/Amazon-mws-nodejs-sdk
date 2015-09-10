var mws = require("./lib/index.js");
var config = require("./config.json");

mws.products.GetServiceStatus(config, true, function (err, data) {
    console.log("GetServiceStatus:");
    console.log(data.GetServiceStatusResponse.GetServiceStatusResult);
    console.log("\n");
})


mws.products.ListMatchingProducts(config, {
    MarketplaceId: 'APJ6JRA9NG5V4',
    Query: 'a',
    QueryContextId: 'Music'
}, true, function (err, data) {
    console.log("ListMatchingProducts:");
    console.log(data);
    console.log("\n");
});

mws.products.GetMatchingProduct(config, {
        MarketplaceId: 'APJ6JRA9NG5V4',
        ASINList: {
            'ASINList.ASIN.1': 'B00012SYY6',
            'ASINList.ASIN.2': 'B00004CZ0F'
        }
    }, true, function (err, data) {
        console.log("GetMatchingProduct:");
        console.log(data);
        console.log("\n");
    }
);

mws.products.GetMatchingProductForId(config, {
    MarketplaceId: 'APJ6JRA9NG5V4',
    IdType: 'ASIN',
    IdList: {"IdList.Id.1": 'B00012SYY6'}
}, true, function (err, data) {
    console.log("GetMatchingProductForId:");
    console.log(data);
    console.log("\n");

});

mws.products.GetCompetitivePricingForSKU(config, {
    MarketplaceId: 'APJ6JRA9NG5V4',
    SellerSKUList: []
}, true, function (err, data) {
    console.log("GetCompetitivePricingForSKU:");
    console.log(data);
    console.log("\n");

});