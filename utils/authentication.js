'use strict';
/**
 * Module dependencies.
 */

/**
 *
 * @param {String} [secret]
 * @param {Object} [options]
 * @return {Function}
 * @api public
 */
exports = module.exports = function authentication( options ){
    // do something with the options
    return function authentication(req, res, next) {
        next();
    };
};

