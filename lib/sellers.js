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
    GetServiceStatus : function(config, xml, cb) {

        xml = typeof xml !== 'undefined' ? xml : false;

        mws.createRequest({
            'Action': 'GetServiceStatus',
            'Config': config,
            'Parameters' : {},
            'Type' : 'Sellers',
            "Xml" : xml
        },function(err, data){
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
    ListMarketplaceParticipations : function(config, xml, cb) {

        xml = typeof xml !== 'undefined' ? xml : false;

        mws.createRequest({
            'Action': 'ListMarketplaceParticipations',
            'Config': config,
            'Parameters' : {},
            'Type' : 'Sellers',
            "Xml" : xml
        },function(err, data){
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
    ListMarketplaceParticipationsByNextToken : function (config, xml, params, cb){
        xml = typeof xml !== 'undefined' ? xml : false;

        if(!_.has(params, 'NextToken')){
            cb({
                "Error" : "You need to pass parameter NextToken"
            }, null);
            return;
        }

        mws.createRequest({
            'Action' : 'ListMarketplaceParticipationsByNextToken',
            'Config' : config,
            'Parameters' : params,
            'Type' : 'Sellers',
            'Xml' : xml
        },function(){
           cb(err,data);
        });
    }
}