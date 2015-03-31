'use strict';

var InvalidRequestError = require('./InvalidRequestError'),
Util = require('util');

function ForbiddenError(message, code, type) {

	if( ! (this instanceof ForbiddenError))
		return new ForbiddenError(message, code, type);

	this._message = message;
	this._code = code;
	this._type = type;
}

Util.inherits(ForbiddenError, InvalidRequestError);

module.exports = ForbiddenError;