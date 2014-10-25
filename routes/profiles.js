var express  = require('express'),
    router   = express.Router(),
    profiles = require('../data/profiles');

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
