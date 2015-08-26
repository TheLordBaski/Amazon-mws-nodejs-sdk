/**
 * Sellers API requests and definitions for Amazon's MWS web services.
 * For information on using, please see examples folder.
 *
 * @author Jakub Gabčo
 */

var mws = require('./mws');
var _ = require('underscore');


/**
 * Contains main method  for Seller MWS endpoint
 *
 * @type {{GetServiceStatus: Function, ListMarketplaceParticipations: Function, ListMarketplaceParticipationsByNextToken: Function}}
 */
module.exports = {

    /**
     * Create
     *
     * @param {Object} config Object of all needed IDs
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
            'type': 'Sellers',
            "xml": xml
        }, function (err, data) {
            cb(err, data);
        });


    },

    /**
     *
     *
     * @param {Object} config
     * @param {Boolean} xml
     * @param {Callback} cb Callback
     */
    ListMarketplaceParticipations: function (config, xml, cb) {

        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }

        mws.createRequest({
            'action': 'ListMarketplaceParticipations',
            'config': config,
            'parameters': {},
            'type': 'Sellers',
            "xml": xml
        }, function (err, data) {
            cb(err, data);
        });
    },


    /**
     *
     *
     * @param {Object} config
     * @param {Boolean} xml
     * @param {Object} params Schemas for all supported parameters
     * @param {Callback} cb Callback
     */
    ListMarketplaceParticipationsByNextToken: function (config, params, xml, cb) {
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
        }, function (err, data) {
            cb(err, data);
        });
    }
}