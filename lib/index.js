/**
 * MWS API wrapper that exports all needed elements of module.
 *
 * @author Jakub Gabčo
 */


module.exports = {
    products : require("./products.js"),
    sellers : require("./sellers.js"),
    orders : require("./orders.js"),
    feeds: require("./feeds.js"),
    reports: require("./reports.js"),
    recommendations: require("./recommendations.js"),
    FulfillmentInventory: require("./fulfillmentInventory.js")
}




