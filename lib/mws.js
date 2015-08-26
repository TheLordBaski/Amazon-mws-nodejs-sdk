/**
 * MWS request API which takes action, and paramaters for MWS request
 * For information on using, please see examples folder.
 *
 * @author Jakub Gabčo
 */

var request = require('request');
var xml2js = require('xml2js');
var crypto = require('crypto');
var _ = require('underscore');
/* For Developing purpose only */
var util = require("util");

/* Needed Api String */
var url = "https://mws.amazonservices.com";
var endpoint = {
    'Products': {
        'type': '/Products/',
        'version': '2011-10-01'
    },
    "Sellers" : {
        type : "/Sellers/",
        version : "2011-07-01"
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
        params["timestamp"] = (new Date()).toISOString();
        var paramObj = {
            'Action': params.action,
            'SellerId': params.config.SellerId,
            'SignatureVersion': '2',
            'SignatureMethod' : 'HmacSHA256',
            'Signature': this.generateSignature(params),
            'Timestamp': params.timestamp,
            'Version': endpoint[params.type].version,
            'AWSAccessKeyId': params.config.AWSAccessKeyId
            };
        // Combine core parameters with require parameters
        _.extend(paramObj,params.carameters);

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
            })
    },

    /**
     *
     * @param config
     * @returns {string}
     */
    generateSignature : function(params){
        var host = "mws.amazonservices.com\n",
            path = endpoint[params.type].type+endpoint[params.type].version+"\n";
            rest = "AWSAccessKeyId="+params.config.AWSAccessKeyId +
                "&Action="+params.action +
                "&MWSAuthToken="+params.config.MWSAuthorizationToken +
                "&SellerId="+params.config.SellerId +
                "&SignatureMethod=HmacSHA256" +
                "&SignatureVersion=2" +
                "&Timestamp="+params.timestamp +
                "&Version=2011-10-01";
        var stringToSign = "POST\n"+host+path+rest;
        var hash = crypto.createHmac("sha256", params.config.SecretKey);

        stringToSign = stringToSign.replace(/'/g,"%27");
        stringToSign = stringToSign.replace(/\*/g,"%2A");
        stringToSign = stringToSign.replace(/\(/g,"%28");
        stringToSign = stringToSign.replace(/\)/g,"%29");
        
        return hash.update(stringToSign).digest("base64");
    }


}
