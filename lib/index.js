/**
 * MWS API wrapper that exports all needed elements of module.
 *
 * @author Jakub Gabčo
 */
    
var util = require('util');
var xml = require('pixl-xml');
var config = require("../config.json");

module.exports = {
    products : require("./products.js"),
    sellers : require("./sellers.js"),
    orders : require("./orders.js")
}




