'use strict';

var Error = require('./Error'),
Util = require('util');

function AuthenticationError(message, code, type) {

	if( ! (this instanceof AuthenticationError))
		return new AuthenticationError(message, code, type);

	this._message = message;
	this._code = code;
	this._type = type;
}

Util.inherits(AuthenticationError, Error);

module.exports = AuthenticationError;