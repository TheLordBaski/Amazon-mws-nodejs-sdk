/**
 * MWS request API which takes action, and paramaters for MWS request
 * For information on using, please see examples folder.
 *
 * @author Jakub Gabčo
 */

var request = require('request');
var xml2js = require('xml2js');
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
        console.log(params);
        var paramObj = {
            'Action': params.action,
            'SellerId': params.config.SellerId,
            'SignatureVersion': '2',
            'Signature': this.generateSignature(params),
            'Timestamp': (new Date()).toISOString(),
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
                if (params.Xml === false) {
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
       console.log(params);
        var stringToSign,
            host = "mws.amazonservices.com",
            path = endpoint[params.type].type+endpoint[params.type].version;



        return "test";
    }
}
