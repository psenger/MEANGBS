var express  = require('express'),
    router   = express.Router(),
    profiles = require('../data/profiles');

router.get('/:id?', function(req, res) {

    /*
    private int offset = 0;
    private int limit = 100;
    private long total = 0;
    private String filter = "";
    private ResultType resultType = ResultType.Success;
    private Collection<ServiceListError> errors = new ArrayList<ServiceListError>();
    private Collection<T> results = new ArrayList<T>();
    private String[] sort = new String[]{};
    private List<Map<String, String>> links = new ArrayList<>();
    */

    var id         = req.params.id || null;
        criteria   = req.body.criteria || { },
        projection = req.body.projection || { },
        sort       = req.body.sort || { },
        skip       = req.body.skip || 0,
        limit      = req.body.limit || 10;

    if ( id ==  null ) {
        profiles.findAll( criteria, projection, sort, skip, limit, function(err, doc) {
                // console.log(JSON.stringify( doc ) );
                return res.send( doc );
            }
        );
    } else {
        profiles.findById( id, projection, function(err, doc) {
                // console.log(JSON.stringify( doc ) );
                return res.send( doc );
            }
        );
    }

});

module.exports = router;
