'use strict';

var Error = require('./Error'),
Util = require('util');

function AuthenticationError(error) {

	if( ! (this instanceof AuthenticationError))
		return new AuthenticationError(error);

	this._error = error
}

Util.inherits(AuthenticationError, Error);

module.exports = AuthenticationError;