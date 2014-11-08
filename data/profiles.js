'use strict';

var path      = require('path'),
    mongo     = require('mongoDB'),
    slr       = require('../utils/serviceListResults'),
    format    = require('util').format,
    conf      = require('../utils/conf'),
    decorator = require('../utils/decorator');

var db = new mongo.Db( 'MEANGBS', new mongo.Server( conf.get("database:host"), conf.get("database:port"), { auto_reconnect: true } ), { safe: false } );

db.open(function(err, db) {
    if( err) console.log("Error while connecting to database:", conf.get("database:host"), conf.get("database:port") );
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
    collection.count( criteria, function( err, count ) {
        collection.find(
            criteria,
            {
                limit: limit,
                sort: sort,
                fields: projection,
                skip: (skip * limit)
            }
        ).toArray(
            function( err2, docs ) {
                docs = decorator.addSelfLinks( "/rest/v1/profiles/", docs); // @TODO this is the wrong place to put this
                slr( criteria, projection, sort, skip, limit, count, err2, docs, callback );
            }
        );
    });

};

/**
 * Find by ID
 *
 * @param id
 * @param callback function ( err, doc )
 */
profiles.findById = function( id, callback ) {
    collection.findOne( { _id: new mongo.ObjectID( id ) }, callback );
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