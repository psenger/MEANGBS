var vows   = require('vows'),
    assert = require('assert'),
    node = require('util'),
    decorator = require('../utils/decorator');

var baseUrl = "/foo";

vows.describe('Set rel self _links on entities')
    .addBatch({
        'When the target entity is an array': {
            topic: function () {
                return decorator.addSelfLinks( baseUrl, [ { "name": "a", "_id" : 1 },
                                                          { "name": "b", "_id" : 2 } ] );
            },
            'Returning value should be an array': function ( topic ) {
                assert.isDefined( topic );
                assert.typeOf(topic,'array');
                assert.equal( node.isArray(topic), true, "While input value was an array output was not");
            },
            'All entities in the returning value ( an array ) should have property _links of type array': function ( topic ) {
                topic.forEach(function(entry) {
                    assert.equal( node.isArray(entry._links), true, "_links missing or not an array");
                });
            },
            'Entities have member _links of type array with one and only one member of rel of value self': function ( topic ) {
                topic.forEach(function(entry) {
                    var found = 0;
                    entry._links.forEach(function( item ){
                        if ( item.hasOwnProperty("rel") && item.rel === "self" ){
                            found++;
                        }
                    });
                    assert.equal( found, 1, "There should have been one rel pointing to self");
                });
            },
            'Entities with member self of value rel should also have a member href with a value pointing to the entity url with id': function ( topic ) {
                topic.forEach(function(entry) {
                    var found = 0;
                    entry._links.forEach(function( item ){
                        if ( item.hasOwnProperty("rel") && item.rel === "self" ){
                            if ( item.hasOwnProperty("href") ) {
                                assert.equal( item.href, baseUrl + "/" + entry._id, "There should have been one rel pointing to self");
                                found ++;
                            }
                        }
                    });
                    assert.equal( found, 1, "There should have been one rel of self with one href");
                });
            }
        }
    })
    .addBatch({
        'When the target entity is an array with existing _links':{
            topic: function () {
                return decorator.addSelfLinks( baseUrl, [ { "name": "a", "_id" : 1, _links :[ { "rel": "home", "href": "/" } ] },
                                                          { "name": "b", "_id" : 2, _links :[ { "rel": "home", "href": "/" } ] } ] );
            },
            'Returning value of each _link array should retain the former existing entities': function ( topic ) {

                assert.isDefined( topic );
                assert.typeOf( topic, 'array');

                topic.forEach(function( entry ) {

                    var links = entry["_links"];
                    assert.isDefined( links );
                    assert.typeOf( links, 'array');
                    assert.lengthOf( links, 2 );

                    var found = 0;
                    links.forEach( function( item ){
                        if ( item.hasOwnProperty("rel") && item.rel === "home" &&
                             item.hasOwnProperty("href") && item.href === "/"  ){
                            found ++;
                        }
                    });
                    assert.equal( found, 1, "There should have been one rel of self of type home");

                    found = 0;
                    links.forEach( function( item ){
                        if ( item.hasOwnProperty("rel") && item.rel === "self" &&
                             item.hasOwnProperty("href") && item.href === "/foo/" + entry["_id"] ) {
                            found ++;
                        }
                    });
                    assert.equal( found, 1, "There should have been one rel of self of type home");

                });
            }
        }
    })
    .addBatch({
        'When the target entity is an object':{
            topic: function () {
                return decorator.addSelfLinks( baseUrl, { "name": "a", "_id" : 1 } );
            },
            'Returning value should be an object with a _link array with one rel to self': function ( topic ) {
                assert.isDefined( topic._links );
                assert.typeOf( topic._links,'array' );
                var found = 0;
                topic._links.forEach(function(entry) {
                    if ( entry.hasOwnProperty("rel") && entry.rel === "self" &&
                         entry.hasOwnProperty("href") && entry.href === "/foo/" + topic["_id"] ) {
                        found++;
                    }
                });
                assert.equal( found, 1, "There should have been one rel of self of type home");
            }
        }
    })
    .addBatch({
        'When the target entity is an object and has _links':{
            topic: function () {
                return decorator.addSelfLinks( baseUrl, { "name": "a", "_id" : 1 , _links :[ { "rel": "home", "href": "/" } ] } );
            },
            'Returning value should retain the existing _link array with one rel to self': function ( topic ) {
                assert.isDefined( topic._links );
                assert.typeOf( topic._links,'array' );
                var found = 0;
                topic._links.forEach(function(entry) {
                    if ( entry.hasOwnProperty("rel") && entry.rel === "self" &&
                        entry.hasOwnProperty("href") && entry.href === "/foo/" + topic["_id"] ) {
                        found++;
                    }
                });
                assert.equal( found, 1, "There should have been one rel of self");
                found = 0;
                topic._links.forEach(function(entry) {
                    if ( entry.hasOwnProperty("rel") && entry.rel === "home" &&
                        entry.hasOwnProperty("href") && entry.href === "/" ) {
                        found++;
                    }
                });
                assert.equal( found, 1, "There should have been one rel of type home");
            }
        }
    })
    .export(module);