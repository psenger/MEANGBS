var express   = require('express'),
    router    = express.Router(),
    decorator = require('../utils/decorator'),
    profiles  = require('../data/profiles');

router.get('/:id?', function(req, res) {

    var id         = req.params.id || null;
        criteria   = req.body.criteria || null,
        projection = req.body.projection || null,
        sort       = req.body.sort || null,
        skip       = req.body.skip || 0,
        limit      = req.body.limit || 10;

    if ( id == null ) {
        profiles.findAll( criteria, projection, sort, skip, limit,
            function( slr ) {

                slr.results.forEach(function(entry) {
                    entry._links = [ { "rel" : "self", "href" : req.baseUrl + "/" + entry._id } ];
                });
                slr._links = [ { "rel" : "self", "href" : req.originalUrl  } ];

                decorator.addSelfLinks( req.baseUrl, slr.results );

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

module.exports = router;
