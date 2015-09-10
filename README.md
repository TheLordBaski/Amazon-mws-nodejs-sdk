#AMAZON MWS NODEJS SDK



A small SDK library providing utility to use Amazon MWS API.

## Installation

    npm install mws-nodejs --save

## Usage

    var mws = require("amazon-mws-nodejs");
    var config = require("./config.json");

    mws.products.GetCompetitivePricingForASIN(config, true, AditionalParameters, function(err, result){
        /* Do everything you want with your result */
    });

    mws.products.GetServiceStatus(config, false, function(err, data){
        console.log(data);
    });

    mws.sellers.GetServiceStatus(config, true, function(err, data){
        console.log(data);
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

    0.1.1
