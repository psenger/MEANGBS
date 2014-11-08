'use strict';

/**
 *
 * in order of being overridden
 * Argv <-overridden by- Env <-overridden by- NODE_ENV <-overridden by- Global <-overridden by- User
 *
 * Environment:NODE_ENV will call in a conf/<environment>.json file with the same name.
 * User will call in a conf/.user/<user>.json and will silently move on if not found.
 *
 */

var path  = require('path'),
    nconf = require('nconf');

nconf.argv() // arguments passed on the command line eg '--bar bar'
     .env(); // environment variables eg 'NODE_ENV=production'

var configDir = path.join(__dirname, '..', 'conf');

console.log( 'configDir = ' + configDir );

if ( nconf.get('NODE_ENV') ) {
    console.log("loading config env: " + nconf.get('NODE_ENV'));
    var env = nconf.get('NODE_ENV').toLowerCase();
    nconf.add(env, { type: 'file', file: path.join(configDir, env + '.json') });
}

console.log("loading config for global");
nconf.add('global', { type: 'file', file: path.join(configDir, 'global.json' ) });

if ( nconf.get('USER') ) {
    console.log("loading config for user: " + nconf.get('USER'));
    var user = nconf.get('USER').toLowerCase();
    nconf.add(user, { type: 'file', file: path.join(configDir, '_user', user + '.json') });
}

// console.info( JSON.stringify( conf ,null,"\t" ) );
module.exports = nconf;