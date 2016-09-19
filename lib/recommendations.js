/**
 * Recommendaions API requests and definitions for Amazon's MWS web services.
 * For information on using, please see examples folder.
 *
 * @author MP
 */

var mws = require('./mws');
var _ = require('underscore');

module.exports = {

    /**
     * @absract Returns the operational status of the Recommendations API section.
     * @description he GetServiceStatus operation returns the operational status of the Orders API section of Amazon Marketplace Web Service. Status values are GREEN, GREEN_I, YELLOW, and RED.

     The GetServiceStatus operation has a maximum request quota of two and a restore rate of one request every five minutes. For definitions of throttling terminology, see What you should know about the Orders API section.
     * @param {Object} config Configuration file
     * @param {Boolean} xml flag. If true, returns raw xml although returns object
     * @param {Function} cb Callback function
     * @see http://docs.developer.amazonservices.com/en_US/recommendations/2013-09-01/MWS_GetServiceStatus.html
     */
    GetServiceStatus: function (config, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }
        mws.createRequest({
            'action': 'GetServiceStatus',
            'config': config,
            'parameters': {},
            'type': 'Recommendations',
            "xml": xml
        }, function (err, data) {
            cb(err, data);
        });
    },

    /**
     * @abstract Required: MarketplaceId, Query Optional: RecommendationCategory
     * @description The ListRecommendations operation returns the most recent recommendations for you in a given category or for all categories.
     * @param {Object} config Configuration file
     * @param {Object} params Required: MarketplaceId, Query Optional: RecommendationCategory
     * @param {Boolean} xml xml flag. If true, returns raw xml although returns object
     * @param {Function} cb Callback function
     * @see http://docs.developer.amazonservices.com/en_US/recommendations/Recommendations_ListRecommendations.html
     */
    ListRecommendations: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }

        if (!_.has(params, 'MarketplaceId')) {
            cb({
                "Error": "You need to pass parameter MarketplaceId"
            }, null);
            return;
        }

        var parameters = {
            'MarketplaceId': params['MarketplaceId'],
        };

        if (_.has(params, 'RecommendationCategory')) {
            parameters['RecommendationCategory'] = params['RecommendationCategory'];
        }

        mws.createRequest({
            'action': 'ListRecommendations',
            'config': config,
            'parameters': parameters,
            'type': 'Recommendations',
            'xml': xml
        }, function (err, data) {
            cb(err, data);
        });
    },

};