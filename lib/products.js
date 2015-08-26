/**
 * Products API requests and definitions for Amazon's MWS web services.
 * For information on using, please see examples folder.
 *
 * @author Jakub Gabčo
 */

var mws = require('./mws');
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

        if (!_.has(params, 'NextToken')) {
            cb({
                "Error": "You need to pass parameter NextToken"
            }, null);
            return;
        }

        mws.createRequest({
            'action': 'ListMarketplaceParticipationsByNextToken',
            'config': config,
            'parameters': params,
            'type': 'Sellers',
            'xml': xml
        }, function () {
            cb(err, data);
        });
    }
}