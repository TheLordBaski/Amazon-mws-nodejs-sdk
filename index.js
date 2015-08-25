var request = require('request');
var config = require("./config.json");
request
    .post(
    {
        url: 'https://mws.amazonservices.com/Orders/2013-09-01',
        form: {
            'Action' : 'GetServiceStatus',
            'SellerId' : config.SellerID,
            'SignatureVersion' : '2',
            'Timestamp' :'2015-08-25T19:56:52.538Z',
            'Version' : '2013-09-01',
            'Signature' : 'j4EGXEQ%2Bm5C99K9E6FG4HjDT8AxgNK77uhbvoZRx%2B8o%3D',
            'SignatureMethod' : 'HmacSHA256',
            'AWSAccessKeyId' : config.AWSAccessKeyID
        }
    }, function (err, httpResponse, body) {
        /* ... */
        console.log(err);
        console.log(httpResponse);
        console.log(body);
    });