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
        var paramObj = {
            'Action': params.Action,
            'SellerId': params.Config.SellerId,
            'SignatureVersion': '2',
            'Signature': this.generateSignature(params.config),
            'Timestamp': (new Date()).toISOString(),
            'Version': endpoint[params.Type].version,
            'AWSAccessKeyId': params.Config.AWSAccessKeyId
            };
        // Combine core parameters with require parameters
        _.extend(paramObj,params.Parameters);

        request
            .post(
            {
                url: url + endpoint[params.Type].type + endpoint[params.Type].version,
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
    generateSignature : function(config){
        return "test";
    }
}