/**
 * Products API requests and definitions for Amazon's MWS web services.
 * For information on using, please see examples folder.
 *
 * @author Jakub Gabčo
 */

var mws = require('./mws');
var _ = require('underscore');

module.exports = {

    /**
     * Create
     *
     * @param {Object} config Object of all needed IDs
     * @param {Object} params Schemas for all supported parameters
     * @param {Boolean} xml Return xml if is true, default is false and returns js object
     * @param {Callback} cb Callback
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
            'type': 'Products',
            "xml": xml
        }, function (err, data) {
            cb(err, data);
        });


    },

    ListMatchingProducts: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }

        if (!_.has(params, 'MarketplaceId') || !_.has(params, 'Query')) {
            cb({
                "Error": "You need to pass parameter MarketplaceId and Query"
            }, null);
            return;
        }

        var parameters = {
            'MarketplaceId': params['MarketplaceId'],
            'Query': params['Query']
        };
        if (_.has(params, 'QueryContextId')) {
            parameters['QueryContextId'] = params['QueryContextId'];
        }
        mws.createRequest({
            'action': 'ListMatchingProducts',
            'config': config,
            'parameters': parameters,
            'type': 'Products',
            'xml': xml
        }, function (err, data) {
            cb(err, data);
        });
    },

    /**
     *
     * @param config
     * @param params
     * @param xml
     * @param cb
     */
    GetMatchingProduct: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }

        /**
         * ASINList has to be as:
         * {
         *      ASINList : {
         *          ASINList.ASIN.1 : XXXX,
         *          ASINList.ASIN.2 : XXXX,
         *           ...
         *      }
         * }
         */
        if (!_.has(params, 'MarketplaceId') || !_.has(params, 'ASINList')) {
            cb({
                "Error": "You need to pass parameter MarketplaceId and ASINList"
            }, null);
            return;
        }

        var parameters = {
            'MarketplaceId': params['MarketplaceId']
        };
        // Add ASINList items to paramaters of Query
        for (var i = 1; i <= _.allKeys(params['ASINList']).length; i++) {
            parameters['ASINList.ASIN.' + i] = params['ASINList']['ASINList.ASIN.' + i];
        }
        /*
         Testing if ASINList is correct
         var counter = 0;
         for (var key in params) {
         if (/ASINList.ASIN./+counter/.test(key)) {

         }
         }*/

        mws.createRequest({
            'action': 'GetMatchingProduct',
            'config': config,
            'parameters': parameters,
            'type': 'Products',
            'xml': xml
        }, function (err, data) {
            cb(err, data);
        });
    },

    GetMatchingProductForId: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }

        if (!_.has('MarketplaceId') || !_.has('IdType') || !_.has('IdList')) {
            cb({
                "Error": "You need to pass parameter MarketplaceIdt, IdType and IdList"
            }, null);
            return;
        }
    }

}