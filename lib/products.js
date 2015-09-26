/**
 * Products API requests and definitions for Amazon's MWS web services.
 * For information on using, please see examples folder.
 *
 * @author Jakub Gabčo
 */

var mws = require('./mws');
var _ = require('underscore');

module.exports = {

    /**
     * @abstract Returns the operational status of the Products API section.
     * @description

     The GetServiceStatus operation returns the operational status of the Products API section of Amazon Marketplace Web Service (Amazon MWS). Status values are GREEN, GREEN_I, YELLOW, and RED.

     The GetServiceStatus operation has a maximum request quota of two and a restore rate of one request every five minutes. For definitions of throttling terminology, see Throttling.

     * @param {Object} config Object of all needed IDs
     * @param {Boolean} xml Return xml if is true, default is false and returns object
     * @param {Function} cb Callback
     */

    ItemCondition : [
       'Any', 'New', 'Used', 'Collectible', 'Refurbished', 'Club'
    ],

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

    /**
     * @abstract Required: MarketplaceId, Query Optional: QueryContextId
     * @description The ListMatchingProducts operation returns a list of products and their attributes, ordered by relevancy, based on a search query that you specify. Your search query can be a phrase that describes the product or it can be a product identifier such as a GCID, UPC, EAN, ISBN, or JAN. If you have the ASIN associated with your product, use the GetMatchingProduct operation. Note that the product identifier cannot be a SellerSKU. If your query does not return any matching products, the query will be broadened using spelling correction or the removal of keywords to find matches. This operation returns a maximum of ten products and does not return non-buyable products.
     * @param {Object} config Configuration file
     * @param {Object} params Required: MarketplaceId, Query Optional: QueryContextId
     * @param {Boolean} xml xml flag. If true, returns raw xml although returns object
     * @param {Function} cb Callback function
     * @see http://docs.developer.amazonservices.com/en_US/products/Products_ListMatchingProducts.html
     */
    ListMatchingProducts: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }

        if (!_.has(params, 'MarketplaceId') || !_.has(params, 'Query')) {
            cb({
                "Error": "You need to pass parameter MarketplaceId and Query"
            }, null);
            return;
        }

        var parameters = {
            'MarketplaceId': params['MarketplaceId'],
            'Query': params['Query']
        };
        // tahle podminka je docasna... TODO
        if (_.has(params, 'QueryContextId') && false) {
            parameters['QueryContextId'] = params['QueryContextId'];
        }
        mws.createRequest({
            'action': 'ListMatchingProducts',
            'config': config,
            'parameters': parameters,
            'type': 'Products',
            'xml': xml
        }, function (err, data) {
            cb(err, data);
        });
    },

    /**
     * @absract Returns a list of products and their attributes, based on a list of ASIN values.
     * @description

     The GetMatchingProduct operation returns a list of products and their attributes, based on a list of ASIN values that you specify. This operation returns a maximum of ten products.

     Important. All of the functionality of the GetMatchingProduct operation can be found in the new GetMatchingProductForId operation. The GetMatchingProduct operation is included in the Products API section for backward compatibility, but you should use the GetMatchingProductForId operation in favor of the GetMatchingProduct operation whenever possible. For more information, see GetMatchingProductForId.

     * @param {Object} config Configuration file
     * @param {Object} params Required: MarketplaceId
     * @param {Boolean} xml flag. If true, returns raw xml although returns object
     * @param {Function} cb Callback function
     * @see http://docs.developer.amazonservices.com/en_US/products/Products_GetMatchingProduct.html
     */
    GetMatchingProduct: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }

        /**
         * ASINList has to be as:
         * {
         *      ASINList : {
         *          ASINList.ASIN.1 : XXXX,
         *          ASINList.ASIN.2 : XXXX,
         *           ...
         *      }
         * }
         */
        if (!_.has(params, 'MarketplaceId') || !_.has(params, 'ASINList')) {
            cb({
                "Error": "You need to pass parameter MarketplaceId and ASINList"
            }, null);
            return;
        }

        var parameters = {
            'MarketplaceId': params['MarketplaceId']
        };

        // Testing
        // if ASINList is correct
        // Add ASINList items to paramaters of Query
        var counter = 1;
        for (var key in params['ASINList']) {
            if (/ASINList.ASIN.[1-5]{1}/.test(key)) {
                parameters[key] = params['ASINList'][key];
            }
            counter++;
        }
        mws.createRequest({
            'action': 'GetMatchingProduct',
            'config': config,
            'parameters': parameters,
            'type': 'Products',
            'xml': xml
        }, function (err, data) {
            cb(err, data);
        });
    },

    /**
     * @absract Returns a list of products and their attributes, based on a list of ASIN, GCID, SellerSKU, UPC, EAN, ISBN, and JAN values.
     * @description The GetMatchingProductForId operation returns a list of products and their attributes, based on a list of product identifier values that you specify. Possible product identifiers are ASIN, GCID, SellerSKU, UPC, EAN, ISBN, and JAN.
     * @param {Object} config Configuration file
     * @param {Object} params Required: MarketplaceId, IdType, IdList
     * @param {Boolean} xml flag. If true, returns raw xml although returns object
     * @param {Function} cb Callback function
     * @see http://docs.developer.amazonservices.com/en_US/products/Products_GetMatchingProductForId.html
     */
    GetMatchingProductForId: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }

        if (!_.has(params, 'MarketplaceId') || !_.has(params, 'IdType') || !_.has(params, 'IdList')) {
            cb({
                "Error": "You need to pass parameter MarketplaceId, IdType and IdList"
            }, null);
            return;
        }

        // Control the IdType - allowed only (ASIN,GCID,SellerSKU,UPC,EAN,ISBN,JAN)
        if (params['IdType'] !== 'ASIN' && params['IdType'] !== 'GCID' && params['IdType'] !== 'SellerSKU' && params['IdType'] !== 'UPC' && params['IdType'] !== 'EAN' && params['IdType'] !== 'JAN') {
            cb({
                'Error': "Usage of unallowed IdType. Allowed are ASIN,GCID,SellerSKU,UPC,EAN,ISBN,JAN"
            }, null);
            return;
        }

        var parameters = {
            'MarketplaceId': params['MarketplaceId'],
            'IdType': params['IdType']
        };

        var counter = 1;
        for (var key in params['IdList']) {
            if (/IdList.Id.[1-5]{1}/g.test(key)) {
                parameters[key] = params['IdList'][key];
            }
            counter++;
        }
        mws.createRequest({
            'action': 'GetMatchingProductForId',
            'config': config,
            'parameters': parameters,
            'type': 'Products',
            'xml': xml
        }, function (err, data) {
            cb(err, data);
        });
    },

    /**
     * @absract Returns the current competitive price of a product, based on SellerSKU.
     * @description

     The GetCompetitivePricingForSKU operation returns the current competitive pricing of a product, based on the SellerSKU and MarketplaceId that you specify. Note that SellerSKU is qualified by your SellerId, which is included with every Amazon Marketplace Web Service (Amazon MWS) operation that you submit. This operation returns pricing for active offer listings based on two pricing models: New Buy Box Price and Used Buy Box Price. These pricing models are equivalent to the main Buy Box Price and the subordinate Buy Box Price, respectively, on a detail page from an Amazon marketplace website. Note that products with active offer listings might not return either of these prices. This could happen, for example, if none of the sellers with offer listings for a product are qualified for the New Buy Box or the Used Buy Box. Also note that your own price for the SellerSKU that you specify is not excluded from the response, so your price will be returned if it is the lowest listed price. The number of offer listings, the trade-in value, and the sales rankings for the SellerSKU that you specify are also returned.
     Note: If you specify a SellerSKU that identifies a variation parent ASIN, this operation returns an error. A variation parent ASIN represents a generic product that cannot be sold. Variation child ASINs represent products that have specific characteristics (such as size and color) and can be sold.

     * @param {Object} config Configuration file
     * @param {Object} params Required: MarketplaceId, SellerSKUList
     * @param {Boolean} xml flag. If true, returns raw xml although returns object
     * @param {Function} cb Callback function
     * @see http://docs.developer.amazonservices.com/en_US/products/Products_GetCompetitivePricingForSKU.html
     */
    GetCompetitivePricingForSKU: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }
        if (!_.has(params, 'MarketplaceId') || !_.has(params, 'SellerSKUList')) {
            cb({
                "Error": "You need to pass parameter MarketplaceId and SellerSKUList"
            }, null);
            return;
        }

        var parameters = {
            'MarketplaceId': params['MarketplaceId']
        };

        // Testing
        // if SellerSKUList is correct
        // Add SellerSKUList items to paramaters of Query
        var counter = 1;
        for (var key in params['SellerSKUList']) {
            if (/SellerSKUList.SellerSKU.[1-9]{1}[1-9]*/.test(key)) {
                parameters[key] = params['SellerSKUList'][key];
            }
            counter++;
            if (counter > 20) {
                break;
            }
        }
        mws.createRequest({
            'action': 'GetCompetitivePricingForSKU',
            'config': config,
            'parameters': parameters,
            'type': 'Products',
            'xml': xml
        }, function (err, data) {
            cb(err, data);
        });
    },

    /**
     * @absract Returns the current competitive price of a product, based on ASIN.
     * @description The GetCompetitivePricingForASIN operation is the same as the GetCompetitivePricingForSKU operation, except that it uses a MarketplaceId and an ASIN to uniquely identify a product, and it does not return the SKUIdentifier element. If you do not have the ASIN for a product, you will first have to submit the ListMatchingProducts operation for disambiguation.
     * @param {Object} config Configuration file
     * @param {Object} params Required: MarketplaceId, ASINList
     * @param {Boolean} xml flag. If true, returns raw xml although returns object
     * @param {Function} cb Callback function
     * @see http://docs.developer.amazonservices.com/en_US/products/Products_GetCompetitivePricingForASIN.html
     */
    GetCompetitivePricingForASIN: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }
        if (!_.has(params, 'MarketplaceId') || !_.has(params, 'ASINList')) {
            cb({
                "Error": "You need to pass parameter MarketplaceId and ASINList"
            }, null);
            return;
        }

        var parameters = {
            'MarketplaceId': params['MarketplaceId']
        };

        // Testing
        // if SellerSKUList is correct
        // Add SellerSKUList items to paramaters of Query
        var counter = 1;
        for (var key in params['ASINList']) {
            if (/ASINList\.ASIN\.[1-9]{1}[1-9]*/.test(key)) {
                parameters[key] = params['ASINList'][key];
            }
            counter++;
            if (counter > 20) {
                break;
            }
        }
        mws.createRequest({
            'action': 'GetCompetitivePricingForASIN',
            'config': config,
            'parameters': parameters,
            'type': 'Products',
            'xml': xml
        }, function (err, data) {
            cb(err, data);
        });
    },

    /**
     * @absract Returns pricing information for the lowest-price active offer listings for a product, based on SellerSKU.
     * @description

     The GetLowestOfferListingsForSKU operation returns the lowest price offer listings for a specific product by item condition. The listings for the specified product and ItemCondition are placed in offer listing groups, each group representing a different combination of the following six qualifiers:

     ItemCondition (New, Used, Collectible, Refurbished, or Club)
     ItemSubcondition (New, Mint, Very Good, Good, Acceptable, Poor, Club, OEM, Warranty, Refurbished Warranty, Refurbished, Open Box, or Other)
     FulfillmentChannel (Amazon or Merchant)
     ShipsDomestically (True, False, or Unknown) – Indicates whether the marketplace specified in the request and the location that the item ships from are in the same country.
     ShippingTime (0-2 days, 3-7 days, 8-13 days, or 14 or more days) – Indicates the maximum time within which the item will likely be shipped once an order has been placed
     SellerPositiveFeedbackRating (98-100%, 95-97%, 90-94%, 80-89%, 70-79%, Less than 70%, or Just launched ) – Indicates the percentage of feedback ratings that were positive over the past 12 months.

     Some (but not necessarily all) of the active offer listings for the specified product and ItemCondition, initially sorted by the lowest landed price, are placed into their corresponding offer listing groups, and the listing with the lowest landed price from each group is returned. If multiple sellers have listings that share the lowest landed price for a group, the listing from the seller with the highest feedback count is returned. Groups without any listings are not returned.

     This operation returns the AllOfferListingsConsidered response element, which indicates whether or not all of the active offer listings for the specified product and ItemCondition were considered when the listings were placed into their corresponding offer listing groups. Note that even if not all the listings were considered, you can still expect the following:

     The lowest landed prices that are returned will be the lowest landed prices from their respective offer listing groups.
     The lowest landed prices that are returned will be lower than the landed prices for any listings that were not considered.

     Note: When you submit the GetLowestOfferListingsForSKU operation, your own offer listings are included in the response unless you use the ExcludeMe request parameter with a value of True.
     Note: Instead of calling the GetLowestOfferListingsForSKU operation to obtain the lowest price offer listings for a specific product by item condition, consider subscribing to the AnyOfferChanged notification by using the Subscriptions API section. When you subscribe to this notification, you will be notified whenever there is a price change or offer listing change for any of the top 20 offers, by condition (new or used), for an item that you sell. For more information, see the Subscriptions API section reference.

     * @param {Object} config Configuration file
     * @param {Object} params Required: MarketplaceId, SellerSKUList Optional: ItemCondition,ExcludeMe
     * @param {Boolean} xml flag. If true, returns raw xml although returns object
     * @param {Function} cb Callback function
     * @see http://docs.developer.amazonservices.com/en_US/products/Products_GetLowestOfferListingsForSKU.html
     */
    GetLowestOfferListingsForSKU: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }

        if (!_.has(params, 'MarketplaceId') || !_.has(params, 'SellerSKUList')) {
            cb({
                "Error": "You need to pass parameter MarketplaceId and SellerSKUList"
            }, null);
            return;
        }
        var parameters = {
            'MarketplaceId': params['MarketplaceId']
        };

        // Testing
        // if SellerSKUList is correct
        // Add SellerSKUList items to paramaters of Query
        var counter = 1;
        for (var key in params['SellerSKUList']) {
            if (/SellerSKUList.SellerSKU.[1-9]{1}[1-9]*/.test(key)) {
                parameters[key] = params['SellerSKUList'][key];
            }
            counter++;
            if (counter > 20) {
                break;
            }
        }
        // Check if is setted ItemCondition parameter
        // default : Any
        // alowed  : Any, New, Used, Collectible, Refurbished, Club

        if (_.has(params, 'ItemCondition') && !_.contains(this.ItemCondition, params['ItemCondition'])) {
            cb({
                "Error" : "ItemCondition is not valid type. Check documentation for valid ItemCondition types"
            }, null);
            return;
        }
        else{
            parameters['ItemCondition'] = params['ItemCondition'];
        }
        if (_.has(params, 'ExcludeMe') && (params['ExludeMe'] === 'True' || params['ExludeMe'] === 'False')) {
            parameters['ExcludeMe'] = params['ExcludeMe'];
        }

        mws.createRequest({
            'action': 'GetLowestOfferListingsForSKU',
            'config': config,
            'parameters': parameters,
            'type': 'Products',
            'xml': xml
        }, function (err, data) {
            cb(err, data);
        });
    },

    /**
     * @absract Returns pricing information for the lowest-price active offer listings for a product, based on ASIN.
     * @description

     The GetLowestOfferListingsForASIN operation is the same as the GetLowestOfferListingsForSKU operation except that it uses a MarketplaceId and an ASIN to uniquely identify a product, and it does not return the SKUIdentifier element.
     Note: Instead of calling the GetLowestOfferListingsForASIN operation to obtain the lowest price offer listings for a specific product by item condition, consider subscribing to the AnyOfferChanged notification by using the Subscriptions API section. When you subscribe to this notification, you will be notified whenever there is a price change or offer listing change for any of the top 20 offers, by condition (new or used), for an item that you sell. For more information, see the Subscriptions API section reference.

     * @param {Object} config Configuration file
     * @param {Object} params Required: MarketplaceId, ASINList Optional: ItemCondition,ExcludeMe
     * @param {Boolean} xml flag. If true, returns raw xml although returns object
     * @param {Function} cb Callback function
     * @see http://docs.developer.amazonservices.com/en_US/products/Products_GetLowestOfferListingsForASIN.html
     */
    GetLowestOfferListingsForASIN: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }

        if (!_.has(params, 'MarketplaceId') || !_.has(params, 'ASINList')) {
            cb({
                "Error": "You need to pass parameter MarketplaceId and ASINList"
            }, null);
            return;
        }
        var parameters = {
            'MarketplaceId': params['MarketplaceId']
        };

        // Testing
        // if SellerSKUList is correct
        // Add SellerSKUList items to paramaters of Query
        var counter = 1;
        for (var key in params['ASINList']) {
            if (/ASINList.ASIN.[1-9]{1}[1-9]*/.test(key)) {
                parameters[key] = params['ASINList'][key];
            }
            counter++;
            if (counter > 20) {
                break;
            }
        }
        // Check if is set ItemCondition parameter
        // default : Any
        // alowed  : Any, New, Used, Collectible, Refurbished, Club

        if (_.has(params, 'ItemCondition') && !_.contains(this.ItemCondition, params['ItemCondition'])) {
            cb({
                "Error" : "ItemCondition is not valid type. Check documentation for valid ItemCondition types"
            }, null);
            return;
        }
        else{
            parameters['ItemCondition'] = params['ItemCondition'];
        }
        if (_.has(params, 'ExcludeMe') && (params['ExludeMe'] === 'True' || params['ExludeMe'] === 'False')) {
            parameters['ExcludeMe'] = params['ExcludeMe'];
        }

        mws.createRequest({
            'action': 'GetLowestOfferListingsForASIN',
            'config': config,
            'parameters': parameters,
            'type': 'Products',
            'xml': xml
        }, function (err, data) {
            cb(err, data);
        });
    },

    /**
     * @absract Returns pricing information for your own offer listings, based on SellerSKU.
     * @description The GetMyPriceForSKU operation returns pricing information for your own offer listings, based on the ASIN mapped to the SellerSKU and MarketplaceId that you specify. Note that if you submit a SellerSKU for a product for which you don’t have an offer listing, the operation returns an empty Offers element. This operation returns pricing information for a maximum of 20 offer listings.
     * @param {Object} config Configuration file
     * @param {Object} params Required: MarketplaceId, SellerSKUList Optional: ItemCondition
     * @param {Boolean} xml flag. If true, returns raw xml although returns object
     * @param {Function} cb Callback function
     * @see http://docs.developer.amazonservices.com/en_US/products/Products_GetMyPriceForSKU.html
     */
    GetMyPriceForSKU: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }

        if (!_.has(params, 'MarketplaceId') || !_.has(params, 'SellerSKUList')) {
            cb({
                "Error": "You need to pass parameter MarketplaceId and SellerSKUList"
            }, null);
            return;
        }
        var parameters = {
            'MarketplaceId': params['MarketplaceId']
        };

        // Testing
        // if SellerSKUList is correct
        // Add SellerSKUList items to paramaters of Query
        var counter = 1;
        for (var key in params['SellerSKUList']) {
            if (/SellerSKUList.SellerSKU.[1-9]{1}[1-9]*/.test(key)) {
                parameters[key] = params['SellerSKUList'][key];
            }
            counter++;
            if (counter > 20) {
                break;
            }
        }
        // Check if is setted ItemCondition parameter
        // default : Any
        // alowed  : Any, New, Used, Collectible, Refurbished, Club

        if (_.has(params, 'ItemCondition') && !_.contains(this.ItemCondition, params['ItemCondition'])) {
            cb({
                "Error" : "ItemCondition is not valid type. Check documentation for valid ItemCondition types"
            }, null);
            return;
        }
        else{
            parameters['ItemCondition'] = params['ItemCondition'];
        }

        mws.createRequest({
            'action': 'GetMyPriceForSKU',
            'config': config,
            'parameters': parameters,
            'type': 'Products',
            'xml': xml
        }, function (err, data) {
            cb(err, data);
        });
    },

    /**
     * @absract Returns pricing information for your own offer listings, based on ASIN.
     * @description The GetMyPriceForASIN operation is the same as the GetMyPriceForSKU operation except that it uses a MarketplaceId and an ASIN to uniquely identify a product, and it does not return the SKUIdentifier element.
     * @param {Object} config Configuration file
     * @param {Object} params Required: MarketplaceId, ASINList Optional: ItemCondition
     * @param {Boolean} xml flag. If true, returns raw xml although returns object
     * @param {Function} cb Callback function
     * @see http://docs.developer.amazonservices.com/en_US/products/Products_GetMyPriceForASIN.html
     */
    GetMyPriceForASIN: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }

        if (!_.has(params, 'MarketplaceId') || !_.has(params, 'ASINList')) {
            cb({
                "Error": "You need to pass parameter MarketplaceId and ASINList"
            }, null);
            return;
        }
        var parameters = {
            'MarketplaceId': params['MarketplaceId']
        };

        // Testing
        // if SellerSKUList is correct
        // Add SellerSKUList items to paramaters of Query
        var counter = 1;
        for (var key in params['ASINList']) {
            if (/ASINList.ASIN.[1-9]{1}[1-9]*/.test(key)) {
                parameters[key] = params['ASINList'][key];
            }
            counter++;
            if (counter > 20) {
                break;
            }
        }
        // Check if is set ItemCondition parameter
        // default : Any
        // alowed  : Any, New, Used, Collectible, Refurbished, Club

        if (_.has(params, 'ItemCondition') && !_.contains(this.ItemCondition, params['ItemCondition'])) {
            cb({
                "Error" : "ItemCondition is not valid type. Check documentation for valid ItemCondition types"
            }, null);
            return;
        }
        else{
            parameters['ItemCondition'] = params['ItemCondition'];
        }

        mws.createRequest({
            'action': 'GetMyPriceForASIN',
            'config': config,
            'parameters': parameters,
            'type': 'Products',
            'xml': xml
        }, function (err, data) {
            cb(err, data);
        });
    },

    /**
     * @absract Returns the parent product categories that a product belongs to, based on SellerSKU.
     * @description The GetProductCategoriesForSKU operation returns the product category name and identifier that a product belongs to, including parent categories back to the root for the marketplace.
     * @param {Object} config Configuration file
     * @param {Object} params Required: MarketplaceId, SellerSKU
     * @param {Boolean} xml flag. If true, returns raw xml although returns object
     * @param {Function} cb Callback function
     * @see http://docs.developer.amazonservices.com/en_US/products/Products_GetProductCategoriesForSKU.html
     */
    GetProductCategoriesForSKU: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }

        if (!_.has(params, 'MarketplaceId') || !_.has(params, 'SellerSKU')) {
            cb({
                "Error": "You need to pass parameter MarketplaceId and SellerSKU"
            }, null);
            return;
        }
        var parameters = {
            'MarketplaceId': params['MarketplaceId'],
            'SellerSKU': params['SellerSKU']
        };

        mws.createRequest({
            'action': 'GetProductCategoriesForSKU',
            'config': config,
            'parameters': parameters,
            'type': 'Products',
            'xml': xml
        }, function (err, data) {
            cb(err, data);
        });

    },
    /**
     * @absract eturns the parent product categories that a product belongs to, based on ASIN.
     * @description The GetProductCategoriesForASIN operation is the same as the GetProductCategoriesForSKU operation except that it uses a MarketplaceId and an ASIN to uniquely identify a product.
     * @param {Object} config Configuration file
     * @param {Object} params Required: MarketplaceId, ASIN
     * @param {Boolean} xml flag. If true, returns raw xml although returns object
     * @param {Function} cb Callback function
     * @see http://docs.developer.amazonservices.com/en_US/products/Products_GetProductCategoriesForASIN.html
     */
    GetProductCategoriesForASIN: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }

        if (!_.has(params, 'MarketplaceId') || !_.has(params, 'ASIN')) {
            cb({
                "Error": "You need to pass parameter MarketplaceId and ASIN"
            }, null);
            return;
        }
        var parameters = {
            'MarketplaceId': params['MarketplaceId'],
            'ASIN': params['ASIN']
        };

        mws.createRequest({
            'action': 'GetProductCategoriesForASIN',
            'config': config,
            'parameters': parameters,
            'type': 'Products',
            'xml': xml
        }, function (err, data) {
            cb(err, data);
        });

    },
    /**
     * @absract Returns lowest priced offers for a single product, based on SellerSKU.
     * @description

     The GetLowestPricedOffersForSKU operation returns the top 20 offers for a given MarketplaceId, SellerSKU, and ItemCondition that you specify. The top 20 offers are determined by the lowest landed price, which is the price plus shipping. If multiple sellers are charging the same landed price, the results will be returned in random order.
     Pricing Models

     This operation returns pricing for active offer listings based on two pricing models: New Buy Box Price and Used Buy Box Price. These pricing models are equivalent to the main Buy Box Price and the subordinate Buy Box Price, respectively, on a detail page from an Amazon marketplace website. Products with active offer listings might not return either of these prices. This could happen, for example, if none of the sellers with offer listings for a product are qualified for the New Buy Box or the Used Buy Box. Your own price for the SellerSKU that you specify is not excluded from the response, so your price will be returned if it is among the lowest listed prices. The number of offer listings, the trade-in value, and the sales rankings for the SellerSKU that you specify are also returned.
     Availability

     This operation is available in all marketplaces except China (CN).
     Throttling

     The GetLowestPricedOffersForSKU operation has a maximum request quota of 10 and a restore rate of five items per second. This quota and restore rate is shared with GetLowestPricedOffersForASIN. For definitions of throttling terminology and for a complete explanation of throttling, see Throttling: Limits to how often you can submit requests in the Amazon MWS Developer Guide.

     * @param {Object} config Configuration file
     * @param {Object} params Required: MarketplaceId,ItemCondition SellerSKU
     * @param {Boolean} xml flag. If true, returns raw xml although returns object
     * @param {Function} cb Callback function
     * @see http://docs.developer.amazonservices.com/en_US/products/Products_GetLowestPricedOffersForSKU.html
     */
    GetLowestPricedOffersForSKU: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }

        if (!_.has(params, 'MarketplaceId') || !_.has(params, 'SellerSKU') || !_.has('ItemCondition')) {
            cb({
                "Error": "You need to pass parameter MarketplaceId,ItemCondition and SellerSKU"
            }, null);
            return;
        }
        var parameters = {
            "MarketplaceId": params['MarketplaceId'],
            "SellerSKU": params['SellerSKU']
        };
        if (_.has(params, 'ItemCondition') && !_.contains(this.ItemCondition, params['ItemCondition'])) {
            cb({
                "Error" : "ItemCondition is not valid type. Check documentation for valid ItemCondition types"
            }, null);
            return;
        }
        else{
            parameters['ItemCondition'] = params['ItemCondition'];
        }
        mws.createRequest({
            'action': 'GetLowestPricedOffersForSKU',
            'config': config,
            'parameters': parameters,
            'type': 'Products',
            'xml': xml
        }, function (err, data) {
            cb(err, data);
        });
    },
    /**
     * @absract Returns lowest priced offers for a single product, based on ASIN.
     * @description The GetLowestPricedOffersForASIN operation is the same as the GetLowestPricedOffersForSKU operation, except that it uses a MarketplaceId and an ASIN to uniquely identify a product, and it does not return the MyOffer element. If you do not have the ASIN for a product, you can use the ListMatchingProducts operation to search for the ASIN.
     * @param {Object} config Configuration file
     * @param {Object} params Required: MarketplaceId,ItemCondition ASIN
     * @param {Boolean} xml flag. If true, returns raw xml although returns object
     * @param {Function} cb Callback function
     * @see http://docs.developer.amazonservices.com/en_US/products/Products_GetProductCategoriesForASIN.html
     */
    GetLowestPricedOffersForASIN: function (config, params, xml, cb) {
        if (typeof xml == 'function') {
            cb = xml;
            xml = false;
        } else if (typeof xml == 'undefined') {
            console.warn("No callback provided. Throwing the request");
            return;
        }

        if (!_.has(params, 'MarketplaceId') || !_.has(params, 'ASIN') || !_.has(params, 'ItemCondition')) {
            cb({
                "Error": "You need to pass parameter MarketplaceId,ItemCondition and ASIN"
            }, null);
            return;
        }
        var parameters = {
            "MarketplaceId": params['MarketplaceId'],
            "ASIN": params['ASIN']
        };
        if (_.has(params, 'ItemCondition') && !_.contains(this.ItemCondition, params['ItemCondition'])) {
            cb({
                "Error" : "ItemCondition is not valid type. Check documentation for valid ItemCondition types"
            }, null);
            return;
        }
        else{
            parameters['ItemCondition'] = params['ItemCondition'];
        }
        console.log(parameters);
        mws.createRequest({
            'action': 'GetLowestPricedOffersForASIN',
            'config': config,
            'parameters': parameters,
            'type': 'Products',
            'xml': xml
        }, function (err, data) {
            cb(err, data);
        });
    }
};
