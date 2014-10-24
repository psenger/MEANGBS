'use strict';

var path = require('path'),
    mongo = require('mongoDB'),
    format = require('util').format;

var db = new mongo.Db( 'MEANGBS', new mongo.Server( '192.168.33.10', 27017, { auto_reconnect: true } ), { safe: false } );

db.open(function(err, db) {
    if( err) console.log("Error");
});

var collection = db.collection( "profiles" );

var profiles = {};

/**
 * Find all documents that match a set of selection criteria
 *
 * @param criteria
 * @param projection
 * @param sort
 * @param skip
 * @param limit
 * @param callback function ( err, doc )
 */
profiles.findAll = function( criteria, projection, sort, skip, limit, callback ) {
    collection.find( criteria, projection ).sort( sort ).limit( limit ).skip( skip * limit ).toArray( callback );

};

/**
 * Find by ID
 *
 * @param id
 * @param callback function ( err, doc )
 */
profiles.findById = function( id, callback ) {
    collection.findOne( { _id: new mongo.ObjectID( id ) } , callback );
};

/**
 * Save the object
 *
 * @param obj
 * @param callback function ( err, doc )
 */
profiles.save = function( obj, callback ) {
    collection.insert( obj, callback );
};

module.exports = profiles;