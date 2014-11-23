var express   = require('express'),
    router    = express.Router(),
    decorator = require('../utils/decorator'),
    profiles  = require('../data/profiles');

module.exports = router.get('/:id?', function(req, res) {


    var id         = req.params.id || null;
        criteria   = req.body.criteria || null,
        projection = req.body.projection || null,
        sort       = req.body.sort || null,
        page       = req.query.page || 0,
        limit      = req.query.limit || 10;

    console.log( JSON.stringify( req.body, null, "\t"));

    if ( id == null ) {
        profiles.findAll( criteria, projection, sort, page, limit,
            function( slr ) {
                decorator.addSelfLinks( req.baseUrl, slr.results );
                decorator.addPageLinks( req.baseUrl, slr );
                // slr._links = [ { "rel" : "self", "href" : req.originalUrl  } ];
                // console.log( JSON.stringify( slr, null, "\t" ) );
                res.send( slr );
            }
        );
    } else {
        profiles.findById( id, function( doc ) {
                res.send( doc );
            }
        );
    }

});
