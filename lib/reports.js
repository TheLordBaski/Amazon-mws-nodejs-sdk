/**
 * Reports API requests and definitions for Amazon's MWS web services.
 * For information on using, please see examples folder.
 *
 * @author Jakub Gabčo
 */

var mws = require('./mws');
var _ = require('underscore');
var csv = require('csv');

module.exports = {
    /**
     * @abstract An enumeration of the units of time that reports can be requested.
     * @description The Schedule enumeration provides the units of time that indicate how often a report request can be requested. For example, the ManageReportSchedule operation uses the Schedule value to indicate how often a report request is submitted.
     * @type {Array}
     */
    Schedules: ['_15_MINUTES_', '_30_MINUTES_', '_1_HOUR_', '_2_HOURS_', '_4_HOURS_', '_8_HOURS_', '_12_HOURS_', '_72_HOURS_', '_1_DAY_', '_2_DAYS_', '_7_DAYS_', '_14_DAYS_', '_15_DAYS_', '_30_DAYS_', '_NEVER_'],
    ReportProcessingStatuses: ['_SUBMITTED_', '_IN_PROGRESS_', '_CANCELLED_', '_DONE_', '_DONE_NO_DATA_'],
    ReportOptions: ['ShowSalesChannel=true'],
    ReportTypeList: ['_GET_FLAT_FILE_OPEN_LISTINGS_DATA_', '_GET_MERCHANT_LISTINGS_DATA_', '_GET_MERCHANT_LISTINGS_DATA_BACK_COMPAT_', '_GET_MERCHANT_LISTINGS_DATA_LITE_', '_GET_MERCHANT_LISTINGS_DATA_LITER_', '_GET_MERCHANT_CANCELLED_LISTINGS_DATA_',
        '_GET_CONVERGED_FLAT_FILE_SOLD_LISTINGS_DATA_', '_GET_ORDERS_DATA_', '_GET_MERCHANT_LISTINGS_DEFECT_DATA_', '_GET_FLAT_FILE_ORDERS_DATA_', '_GET_FLAT_FILE_ACTIONABLE_ORDER_DATA_', '_GET_CONVERGED_FLAT_FILE_ORDER_REPORT_DATA_',
        '_GET_FLAT_FILE_ALL_ORDERS_DATA_BY_LAST_UPDATE_', '_GET_FLAT_FILE_ALL_ORDERS_DATA_BY_ORDER_DATE_', '_GET_XML_ALL_ORDERS_DATA_BY_LAST_UPDATE_', '_GET_XML_ALL_ORDERS_DATA_BY_ORDER_DATE_', '_GET_PENDING_ORDERS_DATA_', '_GET_FLAT_FILE_PENDING_ORDERS_DATA_',
        '_GET_CONVERGED_FLAT_FILE_PENDING_ORDERS_DATA_', '_GET_SELLER_FEEDBACK_DATA_', '_GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE_', '_GET_V2_SETTLEMENT_REPORT_DATA_XML_', '_GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE_V2_', '_GET_AMAZON_FULFILLED_SHIPMENTS_DATA_',
        '_GET_FLAT_FILE_ALL_ORDERS_DATA_BY_LAST_UPDATE_', '	_GET_FLAT_FILE_ALL_ORDERS_DATA_BY_ORDER_DATE_', '_GET_XML_ALL_ORDERS_DATA_BY_LAST_UPDATE_', '_GET_XML_ALL_ORDERS_DATA_BY_ORDER_DATE_', '_GET_FBA_FULFILLMENT_CUSTOMER_SHIPMENT_SALES_DATA_',
        '_GET_FBA_FULFILLMENT_CUSTOMER_SHIPMENT_PROMOTION_DATA_', '_GET_FBA_FULFILLMENT_CUSTOMER_TAXES_DATA_', '_GET_AFN_INVENTORY_DATA_', '_GET_AFN_INVENTORY_DATA_BY_COUNTRY_', '	_GET_FBA_FULFILLMENT_CURRENT_INVENTORY_DATA_', '_GET_FBA_FULFILLMENT_MONTHLY_INVENTORY_DATA_',
        '_GET_FBA_FULFILLMENT_INVENTORY_RECEIPTS_DATA_', '_GET_RESERVED_INVENTORY_DATA_', '_GET_FBA_FULFILLMENT_INVENTORY_SUMMARY_DATA_', '_GET_FBA_FULFILLMENT_INVENTORY_ADJUSTMENTS_DATA_', '_GET_FBA_FULFILLMENT_INVENTORY_HEALTH_DATA_',
        '_GET_FBA_MYI_UNSUPPRESSED_INVENTORY_DATA_', '_GET_FBA_MYI_ALL_INVENTORY_DATA_', '_GET_FBA_FULFILLMENT_CROSS_BORDER_INVENTORY_MOVEMENT_DATA_', '_GET_FBA_FULFILLMENT_INBOUND_NONCOMPLIANCE_DATA_', '_GET_FBA_HAZMAT_STATUS_CHANGE_DATA_',
        '_GET_FBA_ESTIMATED_FBA_FEES_TXT_DATA_', '_GET_FBA_REIMBURSEMENTS_DATA_', '_GET_FBA_FULFILLMENT_CUSTOMER_RETURNS_DATA_', '_GET_FBA_FULFILLMENT_CUSTOMER_SHIPMENT_REPLACEMENT_DATA_', '_GET_FBA_RECOMMENDED_REMOVAL_DATA_', '_GET_FBA_FULFILLMENT_REMOVAL_ORDER_DETAIL_DATA_',
        '_GET_FBA_FULFILLMENT_REMOVAL_SHIPMENT_DETAIL_DATA_', 'GET_NEMO_MERCHANT_LISTINGS_DATA_', '_GET_PADS_PRODUCT_PERFORMANCE_OVER_TIME_DAILY_DATA_TSV_', '_GET_PADS_PRODUCT_PERFORMANCE_OVER_TIME_DAILY_DATA_XML_', '_GET_PADS_PRODUCT_PERFORMANCE_OVER_TIME_WEEKLY_DATA_TSV_',
        '_GET_PADS_PRODUCT_PERFORMANCE_OVER_TIME_WEEKLY_DATA_XML_', '_GET_PADS_PRODUCT_PERFORMANCE_OVER_TIME_MONTHLY_DATA_TSV_', '_GET_PADS_PRODUCT_PERFORMANCE_OVER_TIME_MONTHLY_DATA_XML_', '_GET_FLAT_FILE_SALES_TAX_DATA_', '_GET_WEBSTORE_PRODUCT_CATALOG_',
        '_GET_XML_BROWSE_TREE_DATA_'],

    /**
     * @abstract Returns the contents of a report and the Content-MD5 header for the returned report body.
     * @description The GetReport operation returns the contents of a report and the Content-MD5 header for the returned report body. Reports are retained for 90 days from the time they are generated.

     You should compute the MD5 hash of the HTTP body and compare that with the returned Content- MD5 header value. If they do not match, it means the body was corrupted during transmission. If the report is corrupted, you should discard the result and automatically retry the request up to three more times. Please notify Amazon MWS if you receive a corrupted report body. The client library for the Reports API section, found on the Amazon MWS website, contains code for processing and comparing Content-MD5 headers. For more information on working with the Content-MD5 header, see the Amazon MWS Developer Guide.

     The GetReport operation has a maximum request quota of 15 and a restore rate of one request every minute. For definitions of throttling terminology and for a complete explanation of throttling, see Throttling: Limits to how often you can submit requests in the Amazon MWS Developer Guide.
     * @param {Object} config Configuration file
     * @param {Object} params Needed parameters: ReportId Optional parameters:
     * @param {Boolean} xml Return xml if is true, default is false and returns object
     * @param {Function} cb Callback
     * @see http://docs.developer.amazonservices.com/en_US/reports/Reports_GetReport.html
     */
    GetReport: function (config, params, cb) {
        if (typeof cb !== 'function') {
            console.warn("No callback provided. Throwing the request");
            return;
        }

        if (!_.has(params, 'ReportId')) {
            cb({
                Error: "You must provide ReportId parameter"
            }, null);
            return;
        }

        var parameters = {
            ReportId: params['ReportId']
        };

        mws.createRequest({
            'action': 'GetReport',
            'config': config,
            'parameters': parameters,
            'type': 'Reports',
            'xml': false
        }, function (err, data) {
            if(err !== null) {
                csv.parse(data, {
                    delimiter: "\t",
                    relax_column_count: true,
                    columns: true
                }, function (err, output) {
                    cb(err, output);
                });
            } else {
                cb(err, data);
            }
        });
    },
    /**
     * @abstract Returns the contents of a report and the Content-MD5 header for the returned report body.
     * @descriptionThe GetReport operation returns the contents of a report and the Content-MD5 header for the returned report body. Reports are retained for 90 days from the time they are generated.

     You should compute the MD5 hash of the HTTP body and compare that with the returned Content- MD5 header value. If they do not match, it means the body was corrupted during transmission. If the report is corrupted, you should discard the result and automatically retry the request up to three more times. Please notify Amazon MWS if you receive a corrupted report body. The client library for the Reports API section, found on the Amazon MWS website, contains code for processing and comparing Content-MD5 headers. For more information on working with the Content-MD5 header, see the Amazon MWS Developer Guide.

     The GetReport operation has a maximum request quota of 15 and a restore rate of one request every minute. For definitions of throttling terminology and for a complete explanation of throttling, see Throttling: Limits to how often you can submit requests in the Amazon MWS Developer Guide.
     * @param {Object} config Configuration file
     * @param {Object} params Needed parameters: Optional parameters: ReportTypeList, Acknowledged, AvailableFromDate, AvailableToDate
     * @param {Boolean} xml Return xml if is true, default is false and returns object
     * @param {Function} cb Callback
     * @see http://docs.developer.amazonservices.com/en_US/reports/Reports_GetReportCount.html
     */
    GetReportCount: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }
        var parameters = {};
        if (_.has(params, 'ReportTypeList')) {
            for (var key in params['ReportTypeList']) {
                if (/ReportTypeList\.Type\.[0-9]+/.test(key)) {
                    if (_.contains(this.ReportTypeList, params['ReportTypeList'][key])) {
                        parameters[key] = params['ReportTypeList'][key];
                    }
                }
            }
        }
        if (_.has(params, 'Acknowledged')) {
            parameters['Acknowledged'] = params['Acknowledged'];
        }
        if (_.has(params, 'AvailableFromDate')) {
            parameters['AvailableFromDate'] = params['AvailableFromDate'];
        }
        if (_.has(params, 'AvailableToDate')) {
            parameters['AvailableToDate'] = params['AvailableToDate'];
        }

        mws.createRequest({
            'action': 'GetReportCount',
            'config': config,
            'parameters': parameters,
            'type': 'Reports',
            "xml": xml
        }, function (err, data) {
            cb(err, data);
        });
    },
    /**
     * @abstract Returns a list of reports that were created in the previous 90 days.
     * @description The GetReportList operation returns a list of reports that were created in the previous 90 days that match the query parameters. A maximum of 100 results can be returned in one request. If there are additional results to return, HasNext is returned set to true in the response. To retrieve all the results, you can pass the value of the NextToken parameter to the GetReportListByNextToken operation iteratively until HasNext is returned set to false.

     The GetReportList operation has a maximum request quota of 10 and a restore rate of one request every minute. For definitions of throttling terminology and for a complete explanation of throttling, see Throttling: Limits to how often you can submit requests in the Amazon MWS Developer Guide
     * @param {Object} config Configuration file
     * @param {Object} params Needed parameters: Optional parameters: MaxCount, ReportTypeList, Acknowledged, AvailableFromDate, AvailableToDate, ReportRequestIdList
     * @param {Boolean} xml Return xml if is true, default is false and returns object
     * @param {Function} cb Callback
     * @see http://docs.developer.amazonservices.com/en_US/reports/Reports_GetReportList.html
     */
    GetReportList: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }
        var parameters = {};
        if (_.has(params, 'MaxCount')) {
            parameters['MaxCount'] = params['MaxCount'];
        }
        if (_.has(params, 'ReportTypeList')) {
            for (var key in params['ReportTypeList']) {
                if (/ReportTypeList\.Type\.[0-9]+/.test(key)) {
                    if (_.contains(this.ReportTypeList, params['ReportTypeList'][key])) {
                        parameters[key] = params['ReportTypeList'][key];
                    }
                }
            }
        }
        if (_.has(params, 'Acknowledged')) {
            parameters['Acknowledged'] = params['Acknowledged'];
        }
        if (_.has(params, 'AvailableFromDate')) {
            parameters['AvailableFromDate'] = params['AvailableFromDate'];
        }
        if (_.has(params, 'AvailableToDate')) {
            parameters['AvailableToDate'] = params['AvailableToDate'];
        }

        if (_.has(params, 'ReportRequestIdList')) {
            for (var key in params['ReportRequestIdList']) {
                if (/ReportRequestIdList\.Id\.[0-9]+/.test(key)) {
                    parameters[key] = params['ReportRequestIdList'][key];

                }
            }
        }
        mws.createRequest({
            'action': 'GetReportList',
            'config': config,
            'parameters': parameters,
            'type': 'Reports',
            "xml": xml
        }, function (err, data) {
            cb(err, data);
        });
    },

    /**
     * @abstract  Returns a list of reports using the NextToken, which was supplied by a previous request to either GetReportListByNextToken or GetReportList, where the value of HasNext was true in the previous call.
     * @description The GetReportListByNextToken operation returns a list of reports that match the query parameters, using the NextToken, which was supplied by a previous call to either GetReportListByNextToken or a call to GetReportList, where the value of HasNext was true in the previous call.

     The GetReportListByNextToken operation has a maximum request quota of 30 and a restore rate of one request every two seconds. For definitions of throttling terminology and for a complete explanation of throttling, see Throttling: Limits to how often you can submit requests in the Amazon MWS Developer Guide
     * @param {Object} config Configuration file
     * @param {Object} params Needed parameters: Optional parameters:
     * @param {Boolean} xml Return xml if is true, default is false and returns object
     * @param {Function} cb Callback
     * @see http://docs.developer.amazonservices.com/en_US/reports/Reports_GetReportListByNextToken.html
     */
    GetReportListByNextToken: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }
        if (!_.has(params, 'NextToken')) {
            cb({
                Error: "You need to pass NextToken parameter"
            }, null);
            return
        }
        var parameters = {
            NextToken: params['NextToken']
        };


        mws.createRequest({
            'action': 'GetReportListByNextToken',
            'config': config,
            'parameters': parameters,
            'type': 'Reports',
            "xml": xml
        }, function (err, data) {
            cb(err, data);
        });

    },

    /**
     * @abstract Returns a count of report requests that have been submitted to Amazon MWS for processing.
     * @description The GetReportRequestCount returns the total number of report requests that have been submitted to Amazon MWS for processing.

     The GetReportRequestCount operation has a maximum request quota of 10 and a restore rate of one request every 45 seconds. For definitions of throttling terminology and for a complete explanation of throttling, see Throttling: Limits to how often you can submit requests in the Amazon MWS Developer Guide
     * @param {Object} config Configuration file
     * @param {Object} params Needed parameters: Optional parameters:
     * @param {Boolean} xml Return xml if is true, default is false and returns object
     * @param {Function} cb Callback
     * @see http://docs.developer.amazonservices.com/en_US/reports/Reports_GetReportRequestCount.html
     */
    GetReportRequestCount: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }

        var parameters = {};
        if (_.has(params, 'ReportProcessingStatusList')) {
            for (var key in params['ReportProcessingStatusList']) {
                if (/ReportProcessingStatusList\.Status\.[0-9]+/.test(key)) {
                    if (_.contains(this.ReportProcessingStatuses, params['ReportProcessingStatusList'][key])) {
                        parameters[key] = params['ReportProcessingStatusList'][key];
                    }
                }
            }
        }
        if (_.has(params, 'ReportTypeList')) {
            for (var key in params['ReportTypeList']) {
                if (/ReportTypeList\.Type\.[0-9]+/.test(key)) {
                    if (_.contains(this.ReportTypeList, params['ReportTypeList'][key])) {
                        parameters[key] = params['ReportTypeList'][key];
                    }
                }
            }
        }
        if (_.has(params, 'RequestFromDate')) {
            parameters['RequestFromDate'] = params['RequestFromDate'];
        }
        if (_.has(params, 'RequestToDate')) {
            parameters['RequestToDate'] = params['RequestToDate'];
        }
        mws.createRequest({
            'action': 'GetReportRequestCount',
            'config': config,
            'parameters': parameters,
            'type': 'Reports',
            "xml": xml
        }, function (err, data) {
            cb(err, data);
        });
    },

    /**
     * @abstract Returns a list of report requests that you can use to get the ReportRequestId for a report.
     * @description The GetReportRequestList operation returns a list of report requests that match the query parameters. You can specify query parameters for report status, date range, and report type. The list contains the ReportRequestId for each report request. You can obtain ReportId values by passing the ReportRequestId values to the GetReportList operation.

     In the first request, a maximum of 100 report requests are returned. If there are additional report requests to return, HasNext is returned set to true in the response . To retrieve all the results, you can pass the value of the NextToken parameter to call GetReportRequestListByNextToken operation iteratively until HasNext is returned set to false.

     The GetReportRequestList operation has a maximum request quota of 10 and a restore rate of one request every 45 seconds. For definitions of throttling terminology and for a complete explanation of throttling, see Throttling: Limits to how often you can submit requests in the Amazon MWS Developer Guide
     * @param {Object} config Configuration file
     * @param {Object} params Needed parameters: Optional parameters:
     * @param {Boolean} xml Return xml if is true, default is false and returns object
     * @param {Function} cb Callback
     * @see http://docs.developer.amazonservices.com/en_US/reports/Reports_GetReportRequestList.html
     */
    GetReportRequestList: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }

        var parameters = {};
        if (_.has(params, 'ReportProcessingStatusList')) {
            for (var key in params['ReportProcessingStatusList']) {
                if (/ReportProcessingStatusList\.Status\.[0-9]+/.test(key)) {
                    if (_.contains(this.ReportProcessingStatuses, params['ReportProcessingStatusList'][key])) {
                        parameters[key] = params['ReportProcessingStatusList'][key];
                    }
                }
            }
        }
        if (_.has(params, 'ReportTypeList')) {
            for (var key in params['ReportTypeList']) {
                if (/ReportTypeList\.Type\.[0-9]+/.test(key)) {
                    if (_.contains(this.ReportTypeList, params['ReportTypeList'][key])) {
                        parameters[key] = params['ReportTypeList'][key];
                    }
                }
            }
        }
        if (_.has(params, 'ReportRequestIdList')) {
            for (var key in params['ReportRequestIdList']) {
                if (/ReportRequestIdList\.Id\.[0-9]+/.test(key)) {
                    parameters[key] = params['ReportRequestIdList'][key];

                }
            }
        }
        if (_.has(params, 'RequestFromDate')) {
            parameters['RequestFromDate'] = params['RequestFromDate'];
        }
        if (_.has(params, 'RequestToDate')) {
            parameters['RequestToDate'] = params['RequestToDate'];
        }
        if (_.has(params, 'MaxCount')) {
            parameters['MaxCount'] = params['MaxCount'];
        }
        mws.createRequest({
            'action': 'GetReportRequestList',
            'config': config,
            'parameters': parameters,
            'type': 'Reports',
            "xml": xml
        }, function (err, data) {
            cb(err, data);
        });
    },

    /**
     * @abstract Returns a list of report requests using the NextToken, which was supplied by a previous request to either GetReportRequestListByNextToken or GetReportRequestList, where the value of HasNext was true in that previous request.
     * @description The GetReportRequestListByNextToken operation returns a list of report requests that match the query parameters. This operation uses the NextToken, which was supplied by a previous request to either GetReportRequestListByNextToken or a request to GetReportRequestList, where the value of HasNext was true in that previous request.

     The GetReportRequestListByNextToken operation has a maximum request quota of 30 and a restore rate of one request every two seconds. For definitions of throttling terminology and for a complete explanation of throttling, see Throttling: Limits to how often you can submit requests in the Amazon MWS Developer Guide
     * @param {Object} config Configuration file
     * @param {Object} params Needed parameters: Optional parameters:
     * @param {Boolean} xml Return xml if is true, default is false and returns object
     * @param {Function} cb Callback
     * @see http://docs.developer.amazonservices.com/en_US/reports/Reports_GetReportRequestListByNextToken.html
     */
    GetReportRequestListByNextToken: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }
        if (!_.has(params, 'NextToken')) {
            cb({
                Error: "You need to pass NextToken parameter"
            }, null);
            return
        }
        var parameters = {
            NextToken: params['NextToken']
        };


        mws.createRequest({
            'action': 'GetReportRequestListByNextToken',
            'config': config,
            'parameters': parameters,
            'type': 'Reports',
            "xml": xml
        }, function (err, data) {
            cb(err, data);
        });

    },

    /**
     * @abstract Cancels one or more report requests.
     * @description The CancelReportRequests operation cancels one or more report requests, returning the count of the canceled report requests and the report request information. You can cancel more than 100 report requests, but information is only returned for the first 100 report requests canceled. To return information on a greater number of canceled report requests, use the GetReportRequestList operation.
     Note: If report requests have already begun processing, they cannot be canceled.

     The CancelReportRequests operation has a maximum request quota of 10 and a restore rate of one request every 45 seconds. For definitions of throttling terminology and for a complete explanation of throttling, see Throttling: Limits to how often you can submit requests in the Amazon MWS Developer Guide
     * @param {Object} config Configuration file
     * @param {Object} params Needed parameters: Optional parameters:
     * @param {Boolean} xml Return xml if is true, default is false and returns object
     * @param {Function} cb Callback
     * @see http://docs.developer.amazonservices.com/en_US/reports/Reports_CancelReportRequests.html
     */
    CancelReportRequests: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }
        var parameters = {};
        if (_.has(params, 'RequestFromDate')) {
            parameters['RequestFromDate'] = params['RequestFromDate'];
        }
        if (_.has(params, 'RequestToDate')) {
            parameters['RequestToDate'] = params['RequestToDate'];
        }
        if (_.has(params, 'ReportTypeList')) {
            for (var key in params['ReportTypeList']) {
                if (/ReportTypeList\.Type\.[0-9]+/.test(key)) {
                    if (_.contains(this.ReportTypeList, params['ReportTypeList'][key])) {
                        parameters[key] = params['ReportTypeList'][key];
                    }
                }
            }
        }
        if (_.has(params, 'ReportRequestIdList')) {
            for (var key in params['ReportRequestIdList']) {
                if (/ReportRequestIdList\.Id\.[0-9]+/.test(key)) {
                    parameters[key] = params['ReportRequestIdList'][key];

                }
            }
        }
        if (_.has(params, 'ReportProcessingStatusList')) {
            for (var key in params['ReportProcessingStatusList']) {
                if (/ReportProcessingStatusList\.Status\.[0-9]+/.test(key)) {
                    if (_.contains(this.ReportProcessingStatuses, params['ReportProcessingStatusList'][key])) {
                        parameters[key] = params['ReportProcessingStatusList'][key];
                    }
                }
            }
        }
        mws.createRequest({
            'action': 'CancelReportRequests',
            'config': config,
            'parameters': parameters,
            'type': 'Reports',
            "xml": xml
        }, function (err, data) {
            cb(err, data);
        });
    },

    /**
     * @abstract Creates a report request and submits the request to Amazon MWS.
     * @description The RequestReport operation creates a report request. Amazon MWS processes the report request and when the report is completed, sets the status of the report request to _DONE_. Reports are retained for 90 days.

     You specify what marketplaces you want a report to cover by supplying a list of marketplace IDs to the optional MarketplaceIdList request parameter when you call the RequestReport operation. If you do not specify a marketplace ID, your home marketplace ID is used. Note that the MarketplaceIdList request parameter is not used in JP or CN.

     The RequestReport operation has a maximum request quota of 15 and a restore rate of one request every minute. For definitions of throttling terminology and for a complete explanation of throttling, see Throttling: Limits to how often you can submit requests in the Amazon MWS Developer Guide
     * @param {Object} config Configuration file
     * @param {Object} params Needed parameters: Optional parameters:
     * @param {Boolean} xml Return xml if is true, default is false and returns object
     * @param {Function} cb Callback
     * @see http://docs.developer.amazonservices.com/en_US/reports/Reports_RequestReport.html
     */
    RequestReport: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }
        if (!_.has(params, 'ReportType')) {
            cb({
                Error: "You need to provide ReportType parameter"
            }, null);
            return;
        }
        var parameters = {
            'ReportType': params['ReportType']
        };
        if (_.has(params, 'StartDate')) {
            parameters['StartDate'] = params['StartDate'];
        }
        if (_.has(params, 'EndDate')) {
            parameters['EndDate'] = params['EndDate'];
        }
        if (_.has(params, 'ReportOptions')) {
            parameters['ReportOptions'] = params['ReportOptions'];
        }
        if (_.has(params, 'MarketplaceIdList')) {
            for (var key in params['MarketplaceIdList']) {
                if (/MarketplaceIdList\.Id\.[0-9]+/.test(key)) {
                    parameters[key] = params['MarketplaceIdList'][key];

                }
            }
        }
        mws.createRequest({
            'action': 'RequestReport',
            'config': config,
            'parameters': parameters,
            'type': 'Reports',
            "xml": xml
        }, function (err, data) {
            cb(err, data);
        });
    },
    /**
     * @abstract Creates, updates, or deletes a report request schedule for a specified report type.
     * @description The ManageReportSchedule operation creates, updates, or deletes a report request schedule for a particular report type. Only Order Reports and Amazon Product Ads Reports can be scheduled.

     By using a combination of the ReportType and Schedule values, Amazon MWS determines which action you want to perform. If no combination of ReportType and Schedule exists, then a new report request schedule is created. If the ReportType is already scheduled but with a different Schedule value, then the report request schedule is updated to use the new Schedule value. If you pass in a ReportType and set the Schedule value to _NEVER_ in the request, the report request schedule for that ReportType is deleted.

     The ManageReportSchedule operation has a maximum request quota of 10 and a restore rate of one request every 45 seconds. For definitions of throttling terminology and for a complete explanation of throttling, see Throttling: Limits to how often you can submit requests in the Amazon MWS Developer Guide
     * @param {Object} config Configuration file
     * @param {Object} params Needed parameters: Optional parameters:
     * @param {Boolean} xml Return xml if is true, default is false and returns object
     * @param {Function} cb Callback
     * @see http://docs.developer.amazonservices.com/en_US/reports/Reports_ManageReportSchedule.html
     */
    ManageReportSchedule: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }
        if (!_.has(params, 'ReportType') || !_.has(params, 'Schedule')) {
            cb({
                Error: "You need to provide parameters ReportType and Schedule"
            }, null);
            return;
        }
        if (!_.contains(this.ReportTypeList, params['ReportType'])) {
            cb({
                Error: "ReportType must be valid type."
            }, null);
            return;
        }
        if (!_.contains(this.Schedules, params['Schedule'])) {
            cb({
                Error: "Schedule must be valid Schedule value"
            }, null);
            return;
        }
        var parameters = {
            'ReportType': params['ReportType'],
            'Schedule': params['Schedule']
        };
        if (_.has(params, 'ScheduleDate')) {
            parameters['ScheduleDate'] = params['ScheduleDate']
        }
        mws.createRequest({
            'action': 'ManageReportSchedule',
            'config': config,
            'parameters': parameters,
            'type': 'Reports',
            "xml": xml
        }, function (err, data) {
            cb(err, data);
        });
    },

    /**
     * @abstract Returns a list of order report requests that are scheduled to be submitted to Amazon MWS for processing.
     * @description

     The GetReportScheduleList operation returns a list of scheduled order report requests that match the query parameters. Only Order Reports and Amazon Product Ads Reports can be scheduled. A maximum number of 100 results can be returned in one request.

     The GetReportScheduleList operation has a maximum request quota of 10 and a restore rate of one request every 45 seconds. For definitions of throttling terminology and for a complete explanation of throttling, see Throttling: Limits to how often you can submit requests in the Amazon MWS Developer Guide.
     * @param {Object} config Configuration file
     * @param {Object} params Needed parameters: Optional parameters:
     * @param {Boolean} xml Return xml if is true, default is false and returns object
     * @param {Function} cb Callback
     * @see http://docs.developer.amazonservices.com/en_US/reports/Reports_GetReportScheduleList.html
     */
    GetReportScheduleList: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }
        var parameters = {};
        if (_.has(params, 'ReportTypeList')) {
            for (var key in params['ReportTypeList']) {
                if (/ReportTypeList\.Type\.[0-9]+/.test(key)) {
                    if (_.contains(this.ReportTypeList, params['ReportTypeList'][key])) {
                        parameters[key] = params['ReportTypeList'][key];
                    }
                }
            }
        }
        mws.createRequest({
            'action': 'GetReportScheduleList',
            'config': config,
            'parameters': parameters,
            'type': 'Reports',
            "xml": xml
        }, function (err, data) {
            cb(err, data);
        });
    },

    /**
     * @abstract Currently this operation can never be called because the GetReportScheduleList operation cannot return more than 100 results. It is included for future compatibility.
     * @description
     * @param {Object} config Configuration file
     * @param {Object} params Needed parameters: Optional parameters:
     * @param {Boolean} xml Return xml if is true, default is false and returns object
     * @param {Function} cb Callback
     * @see http://docs.developer.amazonservices.com/en_US/reports/Reports_GetReportScheduleListByNextToken.html
     */
    GetReportScheduleListByNextToken: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }
        if (!_.has(params, 'NextToken')) {
            cb({
                Error: "You need to pass NextToken parameter"
            }, null);
            return
        }
        var parameters = {
            NextToken: params['NextToken']
        };
        mws.createRequest({
            'action': 'GetReportScheduleListByNextToken',
            'config': config,
            'parameters': parameters,
            'type': 'Reports',
            "xml": xml
        }, function (err, data) {
            cb(err, data);
        });
    },

    /**
     * @abstract Returns a count of order report requests that are scheduled to be submitted to Amazon MWS.
     * @description The GetReportScheduleCount operation returns a count of report requests that are scheduled to be submitted to Amazon MWS. Only Order Reports and Amazon Product Ads Reports can be scheduled.

     The GetReportScheduleCount operation has a maximum request quota of 10 and a restore rate of one request every 45 seconds. For definitions of throttling terminology and for a complete explanation of throttling, see Throttling: Limits to how often you can submit requests in the Amazon MWS Developer Guide
     * @param {Object} config Configuration file
     * @param {Object} params Needed parameters: Optional parameters:
     * @param {Boolean} xml Return xml if is true, default is false and returns object
     * @param {Function} cb Callback
     * @see http://docs.developer.amazonservices.com/en_US/reports/Reports_GetReportScheduleCount.html
     */
    GetReportScheduleCount: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }
        var parameters = {};
        if (_.has(params, 'ReportTypeList')) {
            for (var key in params['ReportTypeList']) {
                if (/ReportTypeList\.Type\.[0-9]+/.test(key)) {
                    if (_.contains(this.ReportTypeList, params['ReportTypeList'][key])) {
                        parameters[key] = params['ReportTypeList'][key];
                    }
                }
            }
        }
        mws.createRequest({
            'action': 'GetReportScheduleCount',
            'config': config,
            'parameters': parameters,
            'type': 'Reports',
            "xml": xml
        }, function (err, data) {
            cb(err, data);
        });
    },

    /**
     * @abstract Updates the acknowledged status of one or more reports.
     * @description The UpdateReportAcknowledgements operation is an optional request that updates the acknowledged status of one or more reports. Use this operation if you want Amazon MWS to remember the acknowledged status of your reports. To keep track of which reports you have already received, it is a good practice to acknowledge reports after you have received and stored them successfully. Then, when you submit a GetReportList request, you can specify to receive only reports that have not yet been acknowledged.

     To retrieve reports that have been lost, set the Acknowledged to false and then submit a GetReportList request. This action returns a list of all reports within the previous 90 days that match the query parameters.
     Note: When submitting the GetReportList or GetReportListByNextToken operations, be sure that HasNext returns false before submitting the UpdateReportAcknowledgements operation. This helps to ensure that all of the reports that match your query parameters are returned.

     The UpdateReportAcknowledgements operation has a maximum request quota of 10 and a restore rate of one request every 45 seconds. For definitions of throttling terminology and for a complete explanation of throttling, see Throttling: Limits to how often you can submit requests in the Amazon MWS Developer Guide
     * @param {Object} config Configuration file
     * @param {Object} params Needed parameters: Optional parameters:
     * @param {Boolean} xml Return xml if is true, default is false and returns object
     * @param {Function} cb Callback
     * @see http://docs.developer.amazonservices.com/en_US/reports/Reports_UpdateReportAcknowledgements.html
     */
    UpdateReportAcknowledgements: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }
        var parameters = {};
        if (!_.has(params, 'ReportIdList')) {
            cb({
                Error: "You need to provide ReportIdList parameter"
            }, null);
            return;
        } else {
            for (var key in params['ReportIdList']) {
                if (/ReportIdList\.Id\.[0-9]+/.test(key)) {
                    if (_.contains(this.ReportTypeList, params['ReportIdList'][key])) {
                        parameters[key] = params['ReportIdList'][key];
                    }
                }
            }
        }
        if (_.has(params, 'Acknowledged')) {
            parameters['Acknowledged'] = params['Acknowledged'];
        }
        mws.createRequest({
            'action': 'UpdateReportAcknowledgements',
            'config': config,
            'parameters': parameters,
            'type': 'Reports',
            "xml": xml
        }, function (err, data) {
            cb(err, data);
        });
    }
};