var request = require('request');
var util = require('util');
var xml2js = require('xml2js');
var config = require("./config.json");

module.exports = {
    products : require("./lib/products.js"),
    sellers : require("./lib/sellers.js")
}




