/**
 * Feeds API requests and definitions for Amazon's MWS web services.
 * For information on using, please see examples folder.
 *
 * @author Jakub Gabčo
 */

var mws = require('./mws');
var _ = require('underscore');

module.exports = {

    /**
     * @abstract Enumerates all the feed types that are available through the Feeds API section.
     * @description The FeedType enumeration includes all the feed types that you can submit using the operations in Amazon MWS Feeds API section.
     * @see http://docs.developer.amazonservices.com/en_US/feeds/Feeds_FeedType.html
     */
    FeedTypes: [
        '_POST_PRODUCT_DATA_', '_POST_PRODUCT_RELATIONSHIP_DATA_', '_POST_ITEM_DATA_', '_POST_PRODUCT_OVERRIDES_DATA_', '_POST_PRODUCT_IMAGE_DATA_',
        '_POST_PRODUCT_PRICING_DATA_', '_POST_INVENTORY_AVAILABILITY_DATA_', '_POST_ORDER_ACKNOWLEDGEMENT_DATA_', '_POST_ORDER_FULFILLMENT_DATA_',
        '_POST_FULFILLMENT_ORDER_REQUEST_DATA_', '_POST_FULFILLMENT_ORDER_CANCELLATION', '_POST_PAYMENT_ADJUSTMENT_DATA_', '_POST_INVOICE_CONFIRMATION_DATA_',
        '_POST_FLAT_FILE_LISTINGS_DATA_', '_POST_FLAT_FILE_ORDER_ACKNOWLEDGEMENT_DATA_', '_POST_FLAT_FILE_FULFILLMENT_DATA_',
        '_POST_FLAT_FILE_FBA_CREATE_INBOUND_SHIPMENT_', '_POST_FLAT_FILE_FBA_UPDATE_INBOUND_SHIPMENT_', '_POST_FLAT_FILE_PAYMENT_ADJUSTMENT_DATA_',
        '_POST_FLAT_FILE_INVOICE_CONFIRMATION_DATA_', '_POST_FLAT_FILE_INVLOADER_DATA_', '_POST_FLAT_FILE_CONVERGENCE_LISTINGS_DATA_',
        '_POST_FLAT_FILE_BOOKLOADER_DATA_', '_POST_FLAT_FILE_LISTINGS_DATA_', '_POST_FLAT_FILE_PRICEANDQUANTITYONLY', '_POST_UIEE_BOOKLOADER_DATA_'
    ],

    /**
     * @abstract Enumerates all the feed processing status values that are available through the Feeds API section.
     * @description The FeedProcessingStatus enumeration describes the processing status of a submitted feed.
     * @see http://docs.developer.amazonservices.com/en_US/feeds/Feeds_FeedProcessingStatus.html
     */
    FeedProcessingStatus: [
        '_AWAITING_ASYNCHRONOUS_REPLY_', '_CANCELLED_', '_DONE_', '_IN_PROGRESS_', '_IN_SAFETY_NET_', '_SUBMITTED_', '_UNCONFIRMED_'
    ],

    /**
     * @abstract
     * @description
     * @param {Object} config Configuration file
     * @param {Object} params Required:  Optional:
     * @param {Boolean} xml If true, result will be send as raw xml, although would be converted to javascript object
     * @param {Function} cb Callback function
     * @see
     */
    CancelFeedSubmissions: function (config, params, xml, cb) {

    },

    /**
     * @abstract Returns a list of all feed submissions submitted in the previous 90 days.
     * @description

     The GetFeedSubmissionList operation returns a list of feed submissions submitted in the previous 90 days that match the query parameters. Use this operation to determine the status of a feed submission by passing in the FeedProcessingId that was returned by the SubmitFeed operation.

     The GetFeedSubmissionList request can return a maximum of 100 results. If there are additional results to return, HasNext is returned in the response with a true value. To retrieve all the results, you can pass the value of the NextToken parameter to the GetFeedSubmissionListByNextToken operation and repeat until HasNext is false.

     The GetFeedSubmissionList operation has a maximum request quota of 10 and a restore rate of one request every 45 seconds. For definitions of throttling terminology and for a complete explanation of throttling, see Throttling: Limits to how often you can submit requests in the Amazon MWS Developer Guide.

     * @param {Object} config Configuration file
     * @param {Object} params Required:  Optional: FeedSubmissionIdList,MaxCount, FeedTypeList, FeedProcessingStatusList, SubmittedFromDate, SubmittedToDate
     * @param {Boolean} xml If true, result will be send as raw xml, although would be converted to javascript object
     * @param {Function} cb Callback function
     * @see http://docs.developer.amazonservices.com/en_US/feeds/Feeds_GetFeedSubmissionList.html
     */
    GetFeedSubmissionList: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }
        var parameters = {};
        if (_.has(params, 'FeedSubmissionIdList')) {
            if (!_.isEmpty(params['FeedSubmissionIdList'])) {
                for (var key in params['FeedSubmissionIdList']) {
                    if (/FeedSubmissionIdLis.Id.[1-9]+/.test(key)) {
                        parameters[key] = params['FeedSubmissionIdList'][key];
                    }
                }
            }
        }

        if (_.has(params, 'MaxCount')) {
            parameters['MaxCount'] = params['MaxCount'];
        }

        if (_.has(params, 'FeedTypeList')) {
            for (var key in params['FeedTypeList']) {
                if (/FeedTypeList.Type.[0-9]+/.test(key) && _.contains(this.FeedTypes, params['FeedTypeList'][key])) {
                    parameters[key] = params['FeedTypeList'][key];
                }
            }
        }

        if (_.has(params, 'FeedProcessingStatusList')) {
            for (var key in params['FeedProcessingStatusList']) {
                if (/FeedProcessingStatusList.Status.[0-9]+/.test(key) && _.has(this.FeedProcessingStatus, params['FeedProcessingStatusList'][key])) {
                    parameters[key] = params['FeedProcessingStatusList'][key];
                }
            }
        }

        if (_.has(params, 'SubmittedFromDate')) {
            parameters['SubmittedFromDate'] = params['SubmittedFromDate'];
        }

        if (_.has(params, 'SubmittedToDate')) {
            parameters['SubmittedToDate'] = params['SubmittedToDate'];
        }

        mws.createRequest({
            'action': 'GetFeedSubmissionList',
            'config': config,
            'parameters': parameters,
            'type': 'Feeds',
            'xml': xml
        }, function (err, data) {
            cb(err, data);
        });
    },

    /**
     * @abstract
     * @description
     * @param {Object} config Configuration file
     * @param {Object} params Required:  Optional:
     * @param {Boolean} xml If true, result will be send as raw xml, although would be converted to javascript object
     * @param {Function} cb Callback function
     * @see
     */
    GetFeedSubmissionListByNextToken: function (config, params, xml, cb) {

    },

    /**
     * @abstract
     * @description
     * @param {Object} config Configuration file
     * @param {Object} params Required:  Optional:
     * @param {Boolean} xml If true, result will be send as raw xml, although would be converted to javascript object
     * @param {Function} cb Callback function
     * @see
     */
    GetFeedSubmissionCount: function (config, params, xml, cb) {

    },

    /**
     * @abstract
     * @description
     * @param {Object} config Configuration file
     * @param {Object} params Required:  Optional:
     * @param {Boolean} xml If true, result will be send as raw xml, although would be converted to javascript object
     * @param {Function} cb Callback function
     * @see
     */
    GetFeedSubmissionResult: function (config, params, xml, cb) {

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
                if (/MarketplaceIdList.Id.[1-9]+/.test(key)) {
                    parameters[key] = params['MarketplaceIdList'][key];
                }
                counter++;
                if (counter > 20) {
                    break;
                }
            }
        }
        if (_.has(params, 'PurgeAndReplace')) {
            if (typeof params['PurgeAndReplace'] === 'boolean') {
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
