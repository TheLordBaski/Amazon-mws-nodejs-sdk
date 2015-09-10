/**
 * Feeds API requests and definitions for Amazon's MWS web services.
 * For information on using, please see examples folder.
 *
 * @author Jakub Gabčo
 */

var mws = require('./mws');
var _ = require('underscore');

module.exports = {
    FeedTypes: [
        '_POST_PRODUCT_DATA_', '_POST_PRODUCT_RELATIONSHIP_DATA_', '_POST_ITEM_DATA_', '_POST_PRODUCT_OVERRIDES_DATA_', '_POST_PRODUCT_IMAGE_DATA_',
        '_POST_PRODUCT_PRICING_DATA_', '_POST_INVENTORY_AVAILABILITY_DATA_', '_POST_ORDER_ACKNOWLEDGEMENT_DATA_', '_POST_ORDER_FULFILLMENT_DATA_',
        '_POST_FULFILLMENT_ORDER_REQUEST_DATA_', '_POST_FULFILLMENT_ORDER_CANCELLATION', '_POST_PAYMENT_ADJUSTMENT_DATA_', '_POST_INVOICE_CONFIRMATION_DATA_',
        '_POST_FLAT_FILE_LISTINGS_DATA_', '_POST_FLAT_FILE_ORDER_ACKNOWLEDGEMENT_DATA_', '_POST_FLAT_FILE_FULFILLMENT_DATA_',
        '_POST_FLAT_FILE_FBA_CREATE_INBOUND_SHIPMENT_', '_POST_FLAT_FILE_FBA_UPDATE_INBOUND_SHIPMENT_', '_POST_FLAT_FILE_PAYMENT_ADJUSTMENT_DATA_',
        '_POST_FLAT_FILE_INVOICE_CONFIRMATION_DATA_', '_POST_FLAT_FILE_INVLOADER_DATA_', '_POST_FLAT_FILE_CONVERGENCE_LISTINGS_DATA_',
        '_POST_FLAT_FILE_BOOKLOADER_DATA_', '_POST_FLAT_FILE_LISTINGS_DATA_', '_POST_FLAT_FILE_PRICEANDQUANTITYONLY', '_POST_UIEE_BOOKLOADER_DATA_'
    ],

    CancelFeedSubmissions: function () {

    },

    GetFeedSubmissionListByNextToken: function () {

    },

    GetFeedSubmissionCount: function () {

    },

    GetFeedSubmissionResult: function () {

    },

    /**
     * @abstract Uploads a feed for processing by Amazon MWS.
     * @description  The SubmitFeed operation uploads a file and any necessary metadata for processing. Note that you must calculate a Content-MD5 header for the submitted file. For more information about creating a Content-MD5 header, see What you should know about the Amazon MWS Feeds API section.

     The SubmitFeed operation has a maximum request quota of 15 and a restore rate of one request every two minutes. For definitions of throttling terminology and for a complete explanation of throttling, see Throttling: Limits to how often you can submit requests in the Amazon MWS Developer Guide.

     Feed size is limited to 2 GB (231-1, or 2,147,483,647 bytes) per feed. If you have a large amount of data to submit, you should submit feeds smaller than the feed size limit by breaking up the data, or submit the feeds over a period of time. For optimal performance, a good practice is to submit feeds with a size limit of 30,000 records/items, or submit feeds over a period of time, such as every few hours.
     * @param {Object} config Configuration file
     * @param {Object} params Required: FeedType Optional: MarketplaceIdList, PurgeAndReplace
     * @param {Boolean} xml If true, result will be send as raw xml, although would be converted to javascript object
     * @param {Function} cb Callback function
     * @see http://docs.developer.amazonservices.com/en_US/feeds/Feeds_SubmitFeed.html
     */
    SubmitFeed: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }

        if (!_.has(params, 'FeedType')) {
            cb({
                'Error': 'You need to pass parameter FeedType'
            }, null);
            return;
        }
        if (!_.contains(this.FeedTypes, params['FeedType'])) {
            cb({
                'Error': 'FeedType must be one of the FeedTypes listed in AmazonDocs'
            }, null);
            return;
        }

        parameters = {
            'FeedType': params['FeedType']
        };

        if (_.has(params, 'MarketplaceIdList')) {
            var counter = 1;
            for (var key in params['MarketplaceIdList']) {
                var counter = 1;
                for (var key in params['ASINList']) {
                    if (/MarketplaceIdList.Id.[1-9]+/.test(key)) {
                        parameters[key] = params['MarketplaceIdList'][key];
                    }
                    counter++;
                    if (counter > 20) {
                        break;
                    }
                }
            }
        }
        if(_.has(params,'PurgeAndReplace')){
            if(typeof params['PurgeAndReplace'] === 'boolean'){
                parameters['PurgeAndReplace'] = params['PurgeAndReplace'];
            }
        }

        mws.createRequest({
            'action': 'SubmitFeed',
            'config': config,
            'parameters': parameters,
            'type': 'Feeds',
            'xml': xml
        }, function (err, data) {
            cb(err, data);
        });

    }

};
