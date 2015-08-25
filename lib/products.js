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
    GetServiceStatus : function(config, params, xml, cb) {

        a = typeof a !== 'undefined' ? xml : false;

        mws.createRequest({
            'Action': 'GetServiceStatus',
            'Config': config,
            'Parameters' : params,
            'Type' : 'Products',
            "Xml" : xml
        },function(err, data){
            cb(err, data);
        });


    }
}