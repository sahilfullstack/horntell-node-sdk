'use strict';

var Error = require('./Error'),
Util = require('util');

function ForbiddenError(error) {

	if( ! (this instanceof ForbiddenError))
		return new ForbiddenError(error);

	this._error = error
}

Util.inherits(ForbiddenError, Error);

module.exports = ForbiddenError;