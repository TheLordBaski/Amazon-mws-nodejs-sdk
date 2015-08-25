/**
 * Sellers API requests and definitions for Amazon's MWS web services.
 * For information on using, please see examples folder.
 *
 * @author Jakub Gabčo
 */

var mws = require('./mws');
module.exports = {
    test: function(){
        console.log(mws.test);
    }
}