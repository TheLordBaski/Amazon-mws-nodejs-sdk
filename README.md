#AMAZON MWS NODEJS SDK



A small SDK library providing utility to use Amazon MWS API.

## Installation

    npm install mws-nodejs --save

## Usage

    var mws = require("amazon-mws-nodejs").mws;
    var config = require("./config.json");

    
    mws.products.GetServiceStatus(config, true, function (err, data) {
        console.log("GetServiceStatus:");
        console.log(data.GetServiceStatusResponse.GetServiceStatusResult);
        console.log("\n");
    });
    
    mws.products.GetCompetitivePricingForASIN(config,{
        MarketplaceId: 'APJ6JRA9NG5V4',
        ASINList: {"ASINList.ASIN.1": "B006N7COWQ"}
    }, true, function(err, data){
    
        console.log(data);
    });
    mws.products.ListMatchingProducts(config, {
        MarketplaceId: 'APJ6JRA9NG5V4',
        Query: 'Ed Sheeran',
        QueryContextId: 'Music'
    },false, function (err, data) {
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


## Config look-like

    {
      "SellerId" : "xxx",
      "DeveloperAccountNumber" : "xxx",
      "AWSAccessKeyId" : "xxx",
      "SecretKey" : "xxx",
      "MWSAuthorizationToken" : "xxx"
    }

## Contributors

    Jakub Gabčo
    Zdeněk Pečínka

## Product Version

    0.3.0