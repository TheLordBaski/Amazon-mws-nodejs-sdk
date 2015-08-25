/**
 * MWS request API which takes action, and paramaters for MWS request
 * For information on using, please see examples folder.
 *
 * @author Jakub Gabčo
 */

var request = require('request');
var xml2js = require('xml2js');
var config = require("../config.json");

/* For Developing purpose only */
var util = require("util");