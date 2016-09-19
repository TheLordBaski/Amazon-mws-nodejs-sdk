var mws = require("./lib/index.js");

//mws.products.GetServiceStatus(config, true, function (data) {
//    console.log("GetServiceStatus:");
//    console.log(data.GetServiceStatusResponse.GetServiceStatusResult);
//    console.log("\n");
//});


//mws.products.ListMatchingProducts(config, {
//    MarketplaceId: 'APJ6JRA9NG5V4',
//    Query: 'Ed Sheeran',
//    QueryContextId: 'Music'
//}, true, function (err, data) {
//    console.log("ListMatchingProducts:");
//    console.log(data);
//    console.log("\n");
//});
mws.products.GetMyPriceForASIN(config, {
	MarketplaceId: 'APJ6JRA9NG5V4',
	ASINList: {"ASINList.ASIN.1":"B00MHNX4WO"}
}, true, function(err,data){
	if(err)
throw err;
else
console.log(data);
});
//mws.products.GetCompetitivePricingForASIN(config,{
//    MarketplaceId: 'APJ6JRA9NG5V4',
//    ASINList: {"ASINList.ASIN.1": "B006N7COWQ"}
//}, true, function(err, data){
//
//    console.log(data);
//});

//mws.products.GetLowestPricedOffersForASIN(config, {
//    MarketplaceId: 'A1F83G8C2ARO7P',
//    ItemCondition : "New",
//    ASIN: "B00MHNX4WO"
//},true, function (err, data) {
//    if(err){
//        console.log("Error");
//        console.log(err);
//        return;
//    }
//    console.log("ListMatchingProducts:");
//    console.log(data);
//    console.log("\n");
//});


//mws.products.GetMatchingProduct(config, {
//        MarketplaceId: 'APJ6JRA9NG5V4',
//        ASINList: {
//            'ASINList.ASIN.1': 'B00012SYY6',
//            'ASINList.ASIN.2': 'B00004CZ0F'
//        }
//    }, true, function (data) {
//        console.log("GetMatchingProduct:");
//        console.log(data);
//        console.log("\n");
//    }
//);
//
//mws.products.GetMatchingProductForId(config, {
//    MarketplaceId: 'APJ6JRA9NG5V4',
//    IdType: 'ASIN',
//    IdList: {"IdList.Id.1": 'B00012SYY6'}
//}, true, function (data) {
//    console.log("GetMatchingProductForId:");
//    console.log(data);
//    console.log("\n");
//
//});
//
//mws.products.GetCompetitivePricingForSKU(config, {
//    MarketplaceId: 'APJ6JRA9NG5V4',
//    SellerSKUList: []
//}, true, function (data) {
//    console.log("GetCompetitivePricingForSKU:");
//    console.log(data);
//    console.log("\n");
//
//});

mws.recommendations.ListRecommendations(config, {
    MarketplaceId: 'A1F83G8C2ARO7P',
}, false, function (err, data) {
    if(err){
        console.log("Error");
        console.log(err);
        return;
    }
    console.log("ListMatchingProducts:");
    console.log(data);
    console.log("\n");
});