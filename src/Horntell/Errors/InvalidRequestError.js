'use strict';

var Error = require('./Error'),
Util = require('util');

function InvalidRequestError(message, code, type) {

	if( ! (this instanceof InvalidRequestError))
		return new InvalidRequestError(message, code, type);

	this._message = message;
	this._code = code;
	this._type = type;
}

Util.inherits(InvalidRequestError, Error);

module.exports = InvalidRequestError;