'use strict';

var exports = module.exports = {},
    node = require('util');

exports.addSelfLinks = function( baseEntryUrl, target ){
    if ( node.isArray( target ) ) {
        target.forEach(function(entry) {
            if ( entry.hasOwnProperty("_links") ) {
                entry._links.push( { "rel" : "self", "href" : baseEntryUrl + "/" + entry._id } );
            } else {
                entry._links = [ { "rel" : "self", "href" : baseEntryUrl + "/" + entry._id } ];
            }
        });
    } else {
        target._links = [ { "rel" : "self", "href" : baseEntryUrl  } ];
    }
    return target;
};

exports.calculatePages = function( size, limit ) {
    var trap = [];

    if ( size != 'undefined' && size != null && size != 0 ) {

        var cap = ( Math.ceil( ( size / limit ) ) * limit );

        for ( i = 0; i < cap; i += limit ) {
            trap.push( i );
        }

    }
    return trap;
};
