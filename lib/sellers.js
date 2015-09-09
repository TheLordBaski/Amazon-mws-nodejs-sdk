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
     * @absract Returns the operational status of the Sellers API section.
     * @description The GetServiceStatus operation returns the operational status of the Sellers API section of Amazon Marketplace Web Service (Amazon MWS). Status values are GREEN, GREEN_I, YELLOW, and RED.

     The GetServiceStatus operation has a maximum request quota of two and a restore rate of one request every five minutes. For definitions of throttling terminology and for a complete explanation of throttling, see Throttling: Limits to how often you can submit requests in the Amazon MWS Developer Guide.
     * @param {Object} config Configuration file
     * @param {Boolean} xml flag. If true, returns raw xml although returns object
     * @param {Function} cb Callback function
     * @see http://docs.developer.amazonservices.com/en_US/sellers/Sellers_GetServiceStatus.html
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
     * @absract Returns a list of marketplaces that the seller submitting the request can sell in, and a list of participations that include seller-specific information in that marketplace.
     * @description

     The ListMarketplaceParticipations operation gets a list of marketplaces a seller can participate in and a list of participations that include seller-specific information in that marketplace. Note that the operation returns only those marketplaces where the seller's account is in an active state.

     The ListMarketplaceParticipations and ListMarketplaceParticipationsByNextToken operations together share a maximum request quota of 15 and a restore rate of one request per minute. For definitions of throttling terminology and for a complete explanation of throttling, see Throttling: Limits to how often you can submit requests in the Amazon MWS Developer Guide.

     * @param {Object} config Configuration file
     * @param {Boolean} xml flag. If true, returns raw xml although returns object
     * @param {Function} cb Callback function
     * @see http://docs.developer.amazonservices.com/en_US/sellers/Sellers_ListMarketplaceParticipations.html
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
     * @absract Returns the next page of marketplaces and participations using the NextToken.
     * @description

     The ListMarketplaceParticipationsByNextToken operation returns the next page of marketplaces and participations using the NextToken value that was returned by your previous request to either ListMarketplaceParticipations or ListMarketplaceParticipationsByNextToken. If NextToken is not returned, there are no more pages to return.

     The ListMarketplaceParticipations and ListMarketplaceParticipationsByNextToken operations together share a maximum request quota of 15 and a restore rate of one request per minute. For definitions of throttling terminology and for a complete explanation of throttling, see Throttling: Limits to how often you can submit requests in the Amazon MWS Developer Guide.

     * @param {Object} config Configuration file
     * @param {Object} params Required: NextToken
     * @param {Boolean} xml flag. If true, returns raw xml although returns object
     * @param {Function} cb Callback function
     * @see http://docs.developer.amazonservices.com/en_US/sellers/Sellers_ListMarketplaceParticipationsByNextToken.html
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