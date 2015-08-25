/**
 * MWS API wrapper that exports all needed elements of module.
 *
 * @author Jakub Gabčo
 */

var request = require('request');
var util = require('util');
var xml2js = require('xml2js');
var config = require("../config.json");

module.exports = {
    products : require("./products.js"),
    sellers : require("./sellers.js")
}




