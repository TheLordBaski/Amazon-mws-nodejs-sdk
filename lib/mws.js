/**
 * MWS request API which takes action, and paramaters for MWS request
 * For information on using, please see examples folder.
 *
 * @author Jakub Gabčo, Zdeněk Pečínka
 */
var xml = require('pixl-xml');
//var xml2js = require('xml2js');
var crypto = require('crypto');
var qs = require("querystring");
var https = require("https");

var _ = require('underscore');

/* Needed Api String */
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
    },
    'Feeds': {
        'type': '/',
        'version': ''
    },
    'Reports': {
        'type': '/Reports/',
        'version': '2009-01-01'
    },
    'Recommendations': {
        'type': '/Recommendations/',
        'version': '2013-04-01'
    }
};
module.exports = {

    /**
     * @description Create POST request to specific endpoint defined by type in paramaters.
     *
     * @param {Object} params Schema for all paramaters needed by POST request
     * @param {Function} cb If XML is true return raw xml, otherwise it converts to js object
     */

    createRequest: function (params, cb) {
        var tstamp = new Date().toISOString();
        tstamp = tstamp.replace(/\..+/, '') + 'Z';
        params["timestamp"] = tstamp;
        var paramObj = {
            'Action': params.action,
            'Merchant': params.config.SellerId,
            'SignatureVersion': '2',
            'SignatureMethod': 'HmacSHA256',
            'Timestamp': tstamp,
            'Version': endpoint[params.type].version,
            'AWSAccessKeyId': params.config.AWSAccessKeyId
        };

        // Combine core parameters with require parameters
        _.extend(paramObj, params.parameters);

        paramObj['Signature'] = this.generateSignature(params.config, paramObj, params.type);


        var body = qs.stringify(paramObj);

        var headers = {
            'Host': params.config["AmazonServicesURL"],
            'User-Agent': 'mws-jsr/0.1.0 (Language=Javascript)',
            'Content-Type': 'text/xml'
        };
        
        if(params.xml && params.xml.length > 0){
            headers['Content-MD5'] =  this.computeContentMD5HeaderValue(params.xml);   
            headers['Content-Length'] = Buffer.byteLength(params.xml);
        }
        
        var options = {
            host: params.config["AmazonServicesURL"],
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
                var error = null;
                //var parser = new xml2js.Parser();
                if (params.xml === false) {

                    try {
                        var jsonData = xml.parse(data);
                        cb(error, jsonData);
                    } catch (err) {
                        error = err;
                        cb(error, data);
                    }
                    //parser.parseString(data, function (err, result) {
                    //    cb(err, result);
                    //});
                } else {
                    cb(error, data);
                }
            });
        });
        req.write(params.xml);
        req.end();
    },

    /**
     * @abstract Generates signature for request
     * @description Create HMAC sha256 of secret key and combine it with queryString. Then convert it to base64.
     * @param {Object} config
     * @param {Object} params
     * @param {String} ep Endpoint
     * @see http://docs.developer.amazonservices.com/en_CA/dev_guide/DG_ClientLibraries.html#DG_OwnClientLibrary__Signatures
     */
    generateSignature: function (config, params, ep) {
        hmac = crypto.createHmac("sha256", config.SecretKey);

        var keys = [];
        for (var key in params) {
            keys.push(key);
        }
        keys.sort();
        var sorted = {};
        for (var i = 0; i < keys.length; i++) {
            sorted[keys[i]] = params[keys[i]];
        }
        sorted.Timestamp = params.Timestamp.replace(/:/g, "%3A");
        joinedParameters = [];
        for (var key in sorted) {
            if (/.*Date.*/g.test(key)) {
                sorted[key] = sorted[key].replace(/:/g, "%3A");
            }
            joinedParameters.push(key + "=" + sorted[key]);
        }
        var strParams = joinedParameters.join('&');
        var queryRequest = ['POST', config["AmazonServicesURL"], endpoint[ep].type + endpoint[ep].version, strParams].join('\n');

        var stringToSign = queryRequest;
        stringToSign = stringToSign.replace(/'/g, "%27");
        stringToSign = stringToSign.replace(/\*/g, "%2A");
        stringToSign = stringToSign.replace(/\(/g, "%28");
        stringToSign = stringToSign.replace(/\)/g, "%29");
        stringToSign = stringToSign.replace(/ /g, "%20");
        queryRequest = stringToSign;
        var result = hmac.update(queryRequest).digest("base64");

        return result;

    }

};
