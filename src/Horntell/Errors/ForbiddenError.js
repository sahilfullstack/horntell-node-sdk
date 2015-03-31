'use strict';

var InvalidRequestError = require('./InvalidRequestError'),
Util = require('util');

function ForbiddenError(error) {

	if( ! (this instanceof ForbiddenError))
		return new ForbiddenError(error);

	this._error = error
}

Util.inherits(ForbiddenError, InvalidRequestError);

module.exports = ForbiddenError;