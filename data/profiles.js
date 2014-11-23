'use strict';

var path      = require('path'),
    mongo     = require('mongoDB'),
    slr       = require('../utils/serviceListResults'),
    format    = require('util').format,
    conf      = require('../utils/conf'),
    decorator = require('../utils/decorator'),
    promise   = require('q');

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
 * @param page
 * @param limit
 * @param callback function ( err, doc )
 */
profiles.findAll = function( criteria, projection, sort, page, limit, callback ) {

    console.log ( "criteria = " + criteria );
    console.log ( "projection = " + projection );
    console.log ( "sort = " + sort );
    console.log ( "page = " + page );
    console.log ( "limit = " + limit );

    collection.count( criteria, function( err, count ) {
        collection.find(
            criteria,
            {
                limit: limit,
                sort: sort,
                fields: projection,
                skip: (page * limit)
            }
        ).toArray(
            function( err2, docs ) {
                console.log ( "count = " + count );
                slr( criteria, projection, sort, page, limit, count, err2, docs, callback );
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