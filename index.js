var request = require('request');
var config = require("./config.json");
request
    .post(
    {
        url: 'http://mws.amazonservices.co.uk/Orders/2013-09-01',
        form: {
            'Action' : 'GetServiceStatus',
            'SellerId' : 'A2JUH45EK8JPA4',
            'SignatureVersion' : '2',
            'Timestamp' : Date.now(),
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