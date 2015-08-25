var request = require('request');
var util = require('util');
var xml2js = require('xml2js');
var config = require("./config.json");
request
    .post(
    {
        url: 'https://mws.amazonservices.com/Products/2011-10-01',
        form: {
            'Action' : 'ListMatchingProducts',
            'SellerId' : config.SellerID,
            'SignatureVersion' : '2',
            'Signature' : 'kuQHLVbfvYOXbJ%2F4b3GcvrpaNhugNA9MUpPaLSRnjHE%3D',
            'SignatureMethod' : 'HmacSHA256',
            'Timestamp' : (new Date()).toISOString(),
            'Version' : '2011-10-01',
            'AWSAccessKeyId' : config.AWSAccessKeyID,
            'MarketplaceId' : config.MarketplaceID,
            'Query' : 'a'
        }
    }, function (err, httpResponse, body) {
        /* ... */

        var parser = new xml2js.Parser();
        parser.parseString(body, function(err,result){
            console.log(util.inspect(result, {showHidden: false, depth: null}));
        });

    });