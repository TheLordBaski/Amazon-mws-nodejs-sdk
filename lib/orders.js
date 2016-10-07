/**
 * Orders API requests and definitions for Amazon's MWS web services.
 * For information on using, please see examples folder.
 *
 * @author Jakub Gančo, Zdeněk Pečínka
 */

var mws = require('./mws');
module.exports = {

    /**
     * @absract Returns the operational status of the Orders API section.
     * @description he GetServiceStatus operation returns the operational status of the Orders API section of Amazon Marketplace Web Service. Status values are GREEN, GREEN_I, YELLOW, and RED.

     The GetServiceStatus operation has a maximum request quota of two and a restore rate of one request every five minutes. For definitions of throttling terminology, see What you should know about the Orders API section.
     * @param {Object} config Configuration file
     * @param {Boolean} xml flag. If true, returns raw xml although returns object
     * @param {Function} cb Callback function
     * @see http://docs.developer.amazonservices.com/en_US/orders/2013-09-01/MWS_GetServiceStatus.html
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
            'type': 'Orders',
            "xml": xml
        }, function (err, data) {
            cb(err, data);
        });


    },

    /**
     * Returns orders created or updated during a time frame that you specify.
     * @param {Object} config Configuration file
     * @param params @see http://docs.developer.amazonservices.com/en_US/orders-2013-09-01/Orders_ListOrders.html
     * @param {Boolean} xml flag. If true, returns raw xml although returns object
     * @param {Function} cb Callback function
     * @see http://docs.developer.amazonservices.com/en_US/orders-2013-09-01/Orders_ListOrders.html
     */
    GetListOrders: function (config, params, xml, cb) {
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
            'MarketplaceId': params['MarketplaceId']
        };

        if (_.has(params, 'CreatedAfter')) {
            parameters['CreatedAfter'] = params['CreatedAfter'];
        }
        if (_.has(params, 'CreatedBefore')) {
            parameters['CreatedBefore'] = params['CreatedBefore'];
        }
        if (_.has(params, 'LastUpdatedAfter')) {
            parameters['LastUpdatedAfter'] = params['LastUpdatedAfter'];
        }
        if (_.has(params, 'LastUpdatedBefore')) {
            parameters['LastUpdatedBefore'] = params['LastUpdatedBefore'];
        }
        if (_.has(params, 'OrderStatus.Status')) {
            parameters['OrderStatus.Status'] = params['OrderStatus.Status'];
        }
        if (_.has(params, 'FulfillmentChannel.Channel')) {
            parameters['FulfillmentChannel.Channel'] = params['FulfillmentChannel.Channel'];
        }
        if (_.has(params, 'SellerOrderId')) {
            parameters['SellerOrderId'] = params['SellerOrderId'];
        }
        if (_.has(params, 'BuyerEmail')) {
            parameters['BuyerEmail'] = params['BuyerEmail'];
        }
        if (_.has(params, 'PaymentMethod.Method')) {
            parameters['PaymentMethod.Method'] = params['PaymentMethod.Method'];
        }
        if (_.has(params, 'TFMShipmentStatus.Status')) {
            parameters['TFMShipmentStatus.Status'] = params['TFMShipmentStatus.Status'];
        }
        if (_.has(params, 'MaxResultsPerPage')) {
            parameters['MaxResultsPerPage'] = params['MaxResultsPerPage'];
        }

        mws.createRequest({
            'action': 'ListOrders',
            'config': config,
            'parameters': parameters,
            'type': 'Orders',
            "xml": xml
        }, function (err, data) {
            cb(err, data);
        });
    },
};