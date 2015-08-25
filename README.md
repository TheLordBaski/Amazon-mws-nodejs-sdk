AMAZON MWS NODEJS SDK

=====================

A small SDK library providing utility to use Amazon MWS API.

## Installation

    npm install amazon-mws-nodejs --save

## Usage

    var mws = require("amazon-mws-nodejs");
    var config = require("./config.json");
    mws.product.GetCompetitivePricingForASIN(config, MarketPlaceId, AsinList, function(err, result){
        /* Do everything you want with your result */
    });

## Contributors

    Jakub Gabčo
    Zdeněk Pečínka

## Product Version

    0.0.0
