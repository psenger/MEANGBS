var express  = require('express'),
    profiles = require('../data/profiles');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

    var  criteria ={}, projection={}, sort={}, skip=0, limit=10;

    profiles.findAll( criteria, projection, sort, skip, limit, function(err, doc) {
            // console.log(JSON.stringify( doc ) );
            res.render('index', { activeMenu: 'home' , data: doc  } );
        }
    );
});

module.exports = router;
