/**
 * Fulfillment Inventory API requests and definitions for Amazon's MWS web services.
 * For information on using, please see examples folder.
 *
 * @author Yuji Nishiyama
 */

var mws = require('./mws');
module.exports = {

    /**
     * @absract Returns the operational status of the Fulfillment Inventory API section.
     * @description The GetServiceStatus operation returns the operational status of the Fulfillment Inventory API section of Amazon Marketplace Web Service. Status values are GREEN, YELLOW, and RED.

     The GetServiceStatus operation has a maximum request quota of two and a restore rate of one request every five minutes. For definitions of throttling terminology, see What you should know about the Fulfillment Inventory API section.
     * @param {Object} config Configuration file
     * @param {Boolean} xml flag. If true, returns raw xml although returns object
     * @param {Function} cb Callback function
     * @see http://docs.developer.amazonservices.com/en_US/fba_inventory/MWS_GetServiceStatus.html
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
            'type': 'FulfillmentInventory',
            "xml": xml
        }, function (err, data) {
            cb(err, data);
        });


    },

    /**
     * @absract Returns information about the availability of a seller's inventory.
     * @description The ListInventorySupply operation returns information about the availability of inventory that a seller has in Amazon's fulfillment network and in current inbound shipments. You can check the current availabilty status for your Fulfillment by Amazon inventory as well as discover when availability status changes.

     This operation does not return availability information for inventory that is:
        - Unsellable
        - Bound to a customer orde
     * @param {Object} config Configuration file
     * @param {Object} params Required: QueryStartDateTime
     * @param {Boolean} xml flag. If true, returns raw xml although returns object
     * @param {Function} cb Callback function
     * @see http://docs.developer.amazonservices.com/en_US/fba_inventory/FBAInventory_ListInventorySupply.html
     */
    ListInventorySupply: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }

        var parameters = {
            'QueryStartDateTime': params['QueryStartDateTime']
        };

        mws.createRequest({
            'action': 'ListInventorySupply',
            'config': config,
            'parameters': parameters,
            'type': 'FulfillmentInventory',
            "xml": xml
        }, function (err, data) {
            cb(err, data);
        });


    }


};