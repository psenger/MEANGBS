'use strict';

var exports = module.exports = {},
    node = require('util');

exports.addSelfLinks = function( baseEntryUrl, target ){
    if ( node.isArray( target ) ) {
        target.forEach(function(entry) {
            var url = baseEntryUrl;
            if ( entry.hasOwnProperty("_id") ) {
                url += "/" + entry._id
            }
            if ( entry.hasOwnProperty("_links") ) {
                entry._links.push( { "rel" : "self", "href" : url } );
            } else {
                entry._links = [ { "rel" : "self", "href" : url } ];
            }
        });
    } else {
        var url = baseEntryUrl;
        if ( target.hasOwnProperty("_id") ) {
            url += "/" + target._id
        }
        if ( target.hasOwnProperty("_links") ) {
            target._links.push( { "rel" : "self", "href" : url } );
        } else {
            target._links = [ { "rel" : "self", "href" : url } ];
        }
    }
    return target;
};

exports.addPageLinks = function( baseEntryUrl, slr ) {
    var maxNumberOfPageLinks =  5;
    var lowerCap = ((slr.page - maxNumberOfPageLinks) / 2),
        upperCap = ((slr.page + maxNumberOfPageLinks) / 2);
    if ( ! slr.hasOwnProperty("_links") ) {
        slr._links = [];
    }
    if ( lowerCap <= 0 ) {
        upperCap += Math.abs( lowerCap );
        lowerCap = 0;
    }
    if ( upperCap > slr.total ) {
        lowerCap = slr.total - maxNumberOfPageLinks;
        if ( lowerCap <= 0 ) {
            lowerCap = 0;
        }
        upperCap = slr.total;
    }
    for (var i = lowerCap; i < upperCap; i++) {
        var obj = {};
        obj['rel']="page";
        obj['page']=i;
        obj['current'] = ( i == slr.page );
        if ( slr.criteria.page == i ) {
            obj['current'] = true;
        }
        var parameters = "",
            glue = "?",
            criteria = slr.criteria;
        for (var key in criteria) {
            if ( key !== "page") {
                parameters += glue + key + "=" + criteria[key];
                glue = "&";
            }
        }
        obj['href']= baseEntryUrl + "/" + parameters + "&page=" + i;
        slr._links.push( obj );
    }
};
