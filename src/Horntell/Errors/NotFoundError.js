'use strict';

var InvalidRequestError = require('./InvalidRequestError'),
Util = require('util');

function NotFoundError(message, code, type) {

	if( ! (this instanceof NotFoundError))
		return new NotFoundError(message, code, type);

	this._message = message;
	this._code = code;
	this._type = type;
}

Util.inherits(NotFoundError, InvalidRequestError);

module.exports = NotFoundError;