var https = require("https");
var	crypto = require('crypto');
var	xml2js = require('xml2js');
var config = require("./config.json");

exports.AmazonMwsClient = function(accessKeyId, secretKey, sellerId, options){
	this.host = options.host || 'mws.amazonservices.co.uk';
	this.port = options.port || 443;
	this.conn = options.conn || https;
	//this.creds = crypto.createCredentials(options.creds || {});
	this.appName = options.appName || 'Apricer';
	this.appVersion = options.appVersion || '0.0.0';
	this.appLanguage = options.appLanguage || 'JavaScript';
	this.accessKeyId = accessKeyId || null;
	this.secretKey = secretKey || null;
	this.sellerId = sellerId || null;
	
	console.log(this);
}
