/**
 * MWS request API which takes action, and paramaters for MWS request
 * For information on using, please see examples folder.
 *
 * @author Jakub Gabčo
 */

var request = require('request');
var xml2js = require('xml2js');
var crypto = require('crypto');
var qs = require("querystring");
var https = require("https");

var _ = require('underscore');
/* For Developing purpose only */
var util = require("util");

/* Needed Api String */
var url = "mws.amazonservices.co.uk";
var endpoint = {
    'Products': {
        'type': '/Products/',
        'version': '2011-10-01'
    },
    "Sellers": {
        type: "/Sellers/",
        version: "2011-07-01"
    },
    'Orders': {
        'type': /Orders/,
        'version': '2013-09-01'
    }
}
module.exports = {

    /**
     *  Create POST request to specific endpoint defined by type in paramaters.
     *
     * @param {Object} params Schema for all paramaters needed by POST request
     * @param {Callback} cb If XML is true return raw xml, otherwise it converts to js object
     */

    createRequest: function (params, cb) {
        //params["timestamp"] = new Date().toISOString().replace(/\..+/, '').replace(/ /g,"T").replace(/:/g,"%3A")+"Z";
        var tstamp = new Date().toISOString();
        tstamp = tstamp.replace(/\..+/, '') + 'Z';
        params["timestamp"] = tstamp;
        var paramObj = {
            'Action': params.action,
            'SellerId': params.config.SellerId,
            'SignatureVersion': '2',
            'SignatureMethod': 'HmacSHA256',
            'Timestamp': tstamp,
            'Version': endpoint[params.type].version,
            'AWSAccessKeyId': params.config.AWSAccessKeyId
        };

        // Combine core parameters with require parameters
        _.extend(paramObj, params.parameters);

        paramObj['Signature'] = this.generateSignature(params.config, paramObj, params.type);


        // sorting query keys
        //var keys = [];
        //for(var key in paramObj)
        //    keys.push(key);
        //keys.sort();
        //
        //var sorted = {};
        //for(var key in keys)
        //    sorted[keys[key]] = paramObj[keys[key]];

        var body = qs.stringify(paramObj);

        var headers = {
            'Host': url,
            'User-Agent': 'mws-jsr/0.1.0 (Language=Javascript)',
            'Content-Type': 'text/xml'
        };

        var options = {
            host: url,
            port: 443,
            path: endpoint[params.type].type + endpoint[params.type].version + "?" + body,
            method: "POST",
            headers: headers
        };


// Make the initial request and define callbacks
        var req = https.request(options, function (res) {
            var data = '';
            // Append each incoming chunk to data variable
            res.addListener('data', function (chunk) {
                data += chunk.toString();
            });
            // When response is complete, parse the XML and pass it to callback
            res.addListener('end', function () {
                var parser = new xml2js.Parser();
                parser.addListener('end', function (result) {
                    // Throw an error if there was a problem reported
                    if (result.Error != null) {
                        cb(result.Error, null);
                    }
                });
                if (data.slice(0, 5) == '<?xml')
                    parser.parseString(data, function (err, result) {
                        cb(err, result);
                    });
                else {
                    cb(result.Error);
                }
            });
        });
        req.write(body);
        req.end();


        /*
         request
         .post(
         {
         url: url + endpoint[params.type].type + endpoint[params.type].version,
         form: paramObj
         }, function (err, httpResponse, body) {
         if (params.xml === false) {
         var parser = new xml2js.Parser();
         parser.parseString(body, function (err, result) {
         cb(err, result);
         });
         } else {
         cb(err, body);
         }
         })*/
    },

    /**
     * Generates digital signature for given request parameters
     * @param {Object} params Schema for all paramaters needed by POST request
     * @returns {string} signature Digital signature
     */
    generateSignature: function (config, params, ep) {


        hmac = crypto.createHmac("sha256", config.SecretKey);

        var keys = [];
        for (var key in params) {
            keys.push(key);
        }
        keys.sort();
        var sorted = {};
        for (var key in keys) {
            sorted[keys[key]] = params[keys[key]];
        }
        sorted.Timestamp = params.Timestamp.replace(/:/g, "%3A");
        joinedParameters = [];
        for (var key in sorted) {
            joinedParameters.push(key + "=" + sorted[key]);
        }
        var strParams = joinedParameters.join('&');
        var queryRequest = ['POST', url, endpoint[ep].type + endpoint[ep].version, strParams].join('\n');
        var result = hmac.update(queryRequest).digest("base64");
        //console.log(result);
        return result;
        //var host = "mws.amazonservices.co.uk\n",
        //    path = endpoint[params.type].type+endpoint[params.type].version+"\n";
        //
        //// basic query
        //var query = {
        //    "AWSAccessKeyId": params.config.AWSAccessKeyId,
        //    "Action": params.action,
        //    "MWSAuthToken": params.config.MWSAuthorizationToken,
        //    "SellerId": params.config.SellerId,
        //    "SignatureMethod": "HmacSHA256",
        //    "SignatureVersion": "2",
        //    "Timestamp": params.timestamp.replace(/:/g,"%3A"),
        //    "Version": endpoint[params.type].version
        //};
        //
        //// adding parameters to query
        //for(var key in params.parameters) {
        //    query[key] = params.parameters[key];
        //}
        //
        //// sorting query keys
        //var keys = [];
        //for(var key in query)
        //    keys.push(key);
        //keys.sort();
        //
        //// completing last part of string to sign
        //var rest = "";
        //for(var n in keys){
        //    var key = keys[n];
        //    rest += key+"="+query[key]+"&";
        //}
        //rest = rest.slice(0,-1);
        //var stringToSign = "POST\n"+host+path+rest;
        //
        ////var stringToSign = "POST\nmws.amazonservices.com\n/Products/2011-10-01\nAWSAccessKeyId=AKIAI4FX72ZKOC6AMZDA&Action=ListMatchingProducts&MWSAuthToken=amzn.mws.b0a4c29e-4221-d6e9-63cd-7bcad28bc007&MarketplaceId=APJ6JRA9NG5V4&Query=a&SellerId=A2JUH45EK8JPA4&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2015-08-28T11%3A32%3A37Z&Version=2011-10-01";
        //
        //// According to RFC, some characters must be changed
        //stringToSign = stringToSign.replace(/'/g,'%27');
        //stringToSign = stringToSign.replace(/\*/g,'%2A');
        //stringToSign = stringToSign.replace(/\(/g,'%28');
        //stringToSign = stringToSign.replace(/\)/g,'%29');
        //
        //console.log(stringToSign);
        //var hash = crypto.createHmac("sha256", params.config.SecretKey);
        //var result = hash.update(stringToSign).digest("base64");
        //result = result.replace(/\//g,'%2F');
        //result = result.replace(/=/g,'%3D');
        //result = result.replace(/\+/g,'%2B');
        //
        //console.log(result);
        //return result;
    }

}
